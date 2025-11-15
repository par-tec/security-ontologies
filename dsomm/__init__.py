import logging
import re
from pathlib import Path

import html2text
import pandas as pd
import requests
import sparql_dataframe
import yaml
from pandas import DataFrame, ExcelWriter
from rdflib import DCAT, DCTERMS, SKOS, Graph, Literal, Namespace, URIRef
from rdflib.namespace import OWL, RDF, RDFS
from styleframe import StyleFrame, Styler, utils

log = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


def a_or_b(a, b, k):
    if b and not a[k]:
        a[k] = b[k]
    return a[k]


NS_FOAF = Namespace("http://xmlns.com/foaf/0.1/")
NS_OS = Namespace("https://owaspsamm.org/model/")
NS_DSOMM = Namespace("https://owasp.org/www-project-devsecops-maturity-model/")
NS_ISO = Namespace("https://par-tec.github.io/security-ontologies/onto/iso#")
NS_D3F = Namespace("http://d3fend.mitre.org/ontologies/d3fend.owl#")
NS = (
    ("dct", DCTERMS),
    ("owl", OWL),
    ("rdfs", RDFS),
    ("rdf", RDF),
    ("dcat", DCAT),
    ("skos", SKOS),
    ("foaf", NS_FOAF),
    ("os", NS_OS),
    ("dsomm", NS_DSOMM),
    ("iso", NS_ISO),
    ("d3f", NS_D3F),
)


def get_dsomm():
    dsomm_yaml = Path("vocabularies/dsomm.yaml")
    if not dsomm_yaml.exists():
        url = "https://raw.githubusercontent.com/wurstbrot/DevSecOps-MaturityModel/master/src/assets/YAML/generated/generated.yaml"
        r = requests.get(url, timeout=3)
        dsomm_yaml.write_text(r.text)
        return yaml.safe_load(r.text)
    return yaml.safe_load(dsomm_yaml.read_text())


def parse_dsomm(activities, g):
    for dimension, dvalue in activities.items():
        dimension_uri = URIRef(
            NS_DSOMM + dimension.replace(" and ", "").replace(" ", "")
        )
        g.add((dimension_uri, RDF.type, NS_DSOMM.Dimension))
        g.add((dimension_uri, RDFS.label, Literal(dimension)))
        for subdimension, activity in dvalue.items():
            subdimension_uri = URIRef(
                NS_DSOMM + subdimension.replace(" and ", "").replace(" ", "")
            )
            g.add((subdimension_uri, RDF.type, NS_DSOMM.SubDimension))
            g.add((subdimension_uri, RDFS.label, Literal(subdimension)))
            g.add((subdimension_uri, NS_DSOMM.hasDimension, dimension_uri))
            for activity_name, activity in activity.items():
                parse_activity(g, activity_name, activity, subdimension_uri)


def parse_activity(g, activity_name, activity, subdimension_uri):
    """
    description: |-
      While building and testing artifacts, third party systems, application frameworks
      and 3rd party libraries are used. These might be malicious as a result of
      vulnerable libraries or because they are altered during the delivery phase.
    risk: |-
      While building and testing artifacts, third party systems, application frameworks
      and 3rd party libraries are used. These might be malicious as a result of
      vulnerable libraries or because they are altered during the delivery phase.
    measure: Each step during within the build and testing phase is performed in
      a separate virtual environments, which is destroyed afterward.
    meta:
      implementationGuide: Depending on your environment, usage of virtual machines
        or container technology is a good way. After the build, the filesystem should
        not be used again in other builds.
    difficultyOfImplementation:
      knowledge: 2
      time: 2
      resources: 2
    usefulness: 2
    level: 2
    implementation:
    - name: CI/CD tools
      tags:
      - ci-cd
      url: https://martinfowler.com/articles/continuousIntegration.html
      description: CI/CD tools such as jenkins, gitlab-ci or github-actions
    - name: Container technologies and orchestration like Docker, Kubernetes
      tags: []
    references:
      samm2:
      - I-SB-2-A
      iso27001-2017:
      - 14.2.6
    isImplemented: true
    evidence: ""
    comments: ""
    assessment: ""

    """
    activity_uri = URIRef(NS_DSOMM + activity_name.title().replace(" ", ""))
    g.add((activity_uri, RDF.type, NS_DSOMM.Activity))
    g.add((activity_uri, RDFS.label, Literal(activity_name)))
    g.add((activity_uri, NS_DSOMM.hasSubdimension, subdimension_uri))

    g.add((activity_uri, RDFS.comment, Literal(activity.get("description", ""))))
    g.add((activity_uri, NS_DSOMM.Measure, Literal(activity.get("measure", ""))))
    g.add((activity_uri, NS_DSOMM.assessment, Literal(activity.get("assessment", ""))))
    for i in activity.get("implementation", []):
        if "url" not in i:
            continue
        implementation_url = URIRef(i["url"].strip("/"))
        g.add((activity_uri, NS_DSOMM.hasImplementation, implementation_url))
        g.add((implementation_url, RDF.type, NS_DSOMM.Implementation))
        g.add((implementation_url, RDFS.label, Literal(i["name"])))
        g.add((implementation_url, RDFS.comment, Literal(i.get("description", ""))))
        for t in i.get("tags", []):
            if t.startswith("d3f:"):
                g.add((implementation_url, NS_DSOMM.hasTag, URIRef(NS_D3F + t[4:])))
                continue
            g.add((implementation_url, NS_DSOMM.hasTag, Literal(t)))

    for reference in parse_references(activity.get("references", {})):
        g.add((activity_uri, NS_DSOMM.hasReference, reference))


def parse_samm(s):
    """Associate the SAMM short identifier to the URL on the samm website."""
    SAMM_MAP = {
        "G": {
            "name": "Governance",
            "practices": {
                "SM": "Strategy and Metrics",
                "PC": "Policy and Compliance",
                "EG": "Education and Guidance",
            },
        },
        "D": {
            "name": "Design",
            "practices": {
                "TA": "Threat Assessment",
                "SR": "Security Requirements",
                "SA": "Security Architecture",
            },
        },
        "I": {
            "name": "Implementation",
            "practices": {
                "SB": "Secure Build",
                "SD": "Secure Deployment",
                "DM": "Defect Management",
            },
        },
        "V": {
            "name": "Verification",
            "practices": {
                "AA": "Archietcture Assessment",
                "RT": "Requirements-driven Testing",
                "ST": "Security Testing",
            },
        },
        "O": {
            "name": "Operations",
            "practices": {
                "IM": "Incident Management",
                "EM": "Environment Management",
                "OM": "Operational Management",
            },
        },
    }
    function_, practice, level, stream = s.split("-")
    return URIRef(
        "https://owaspsamm.org/model/{}/{}/stream-{}#{}".format(
            SAMM_MAP[function_]["name"].lower(),
            SAMM_MAP[function_]["practices"][practice].lower().replace(" ", "-"),
            stream.lower(),
            level,
        )
    )


def parse_references(references):
    """Parse the references from the yaml file."""
    if not isinstance(references, dict):
        raise ValueError("Reference must be a dict")
    for k, v in references.items():
        if k == "samm2":
            for samm2 in v:
                if samm2.count("-") < 3:
                    log.warning("TODO in SAMM2 reference")
                    continue
                yield parse_samm(samm2)
        elif k == "iso27001-2017":
            for iso27001 in v:
                if " " not in str(iso27001):
                    yield URIRef(NS_ISO + "27001/2013/control-" + str(iso27001))
                else:
                    yield Literal(iso27001)
        elif k == "d3f":
            for d3f in v:
                yield URIRef(NS_D3F + d3f.strip("/"))
        else:
            raise ValueError(f"Unknown reference: {k}")


def format_link(link):
    if "http" not in str(link):
        return link
    re_findurl = re.compile(r"(?P<url>https?://[^\s]+)")
    ret = ""
    for url in re_findurl.findall(link):
        if "owaspsamm" in url:
            specref = "samm2 "
            specref += url.split("/")[-2]
            specref += " " + url.split("/")[-1]

        elif "2700" in url:
            specref = "iso27001:  "
            specref += url.split("/")[-1]
        else:
            specref = "Comment: "
            specref += url.split("/")[-1]

        ret += f""" <a href="{url}">{specref}</a>&nbsp;;"""
    return f"<p>{ret}</p>"


def make_hyperlink_xls(url):
    if "http" not in str(url):
        return url
    if "owaspsamm" in url:
        specref = "samm2 "
        specref += url.split("/")[-2]
        specref += " " + url.split("/")[-1]

    elif "2700" in url:
        specref = "iso27001:  "
        specref += url.split("/")[-1]

    else:
        specref = "Comment: "
        specref += url.split("/")[-1]

    return f'=HYPERLINK("{url}", "{specref}")'


def make_hyperlink_dsomm_activity(activity, url):
    return f'=HYPERLINK("https://par-tec.github.io/security-ontologies/onto/dsomm/#{url}", "{activity}")'


QUERY = """
    prefix dm: <https://owasp.org/www-project-devsecops-maturity-model/>
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    select distinct
    ?Dimension ?Subdimension ?Activity
    ?Measure
    (?ref as ?Reference)
    (?activity as ?activity_uri)

    where {

    ?activity a dm:Activity;
        dm:hasSubdimension ?sub;
        rdfs:label ?Activity;
        dm:Measure ?Measure
    .
    OPTIONAL { ?activity dm:hasReference ?ref}
    .
    ?sub
        rdfs:label ?Subdimension;
        dm:hasDimension ?dim
    .
    ?dim a dm:Dimension;
        rdfs:label ?Dimension

    }
"""


def query_data(graph=None):
    # GROUP BY ?Dimension ?Subdimension ?Activity ?Measure
    if not graph:
        endpoint = "http://localhost:18890/sparql"
        return sparql_dataframe.get(endpoint, QUERY, post=True)
    rows = graph.query(
        QUERY,
        initNs={
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "dm": "https://owasp.org/www-project-devsecops-maturity-model/",
            "iso": "https://par-tec.github.io/security-ontologies/onto/iso#",
        },
    )
    return DataFrame(data=list(map(str, x) for x in rows), columns=map(str, rows.vars))


def replace_prefix(url, prefix_dict):
    """given a dict of namespaces with associated urls,
    replace the url string with the namespace"""
    for ns, nsurl in prefix_dict.items():
        if url.startswith(nsurl):
            return url.replace(nsurl, ns + ":")


def create_excel(df, outfile, infile=None):
    """Create an excel file from the dataframe"""

    initframe = DataFrame(
        data={
            0: {
                0: (
                    "\n    This is a DevSecOps Maturity Model Questionnaire that can be used to assess the current maturity level of a single project.\n\n"
                    "Differently from other strategies, DSOMM is based on activities, not on threats. It thus verifies which activities are implemented,\n"
                    "    and associates activities to various kind of references and threats.\n\n"
                    "    Since DSOMM is oriented to devops folks, risks’ descriptions and measures tend to be concrete.\n\n"
                    "    On each row you can see the online references to ISO and SAMM2 controls that you can use to get further information.\n\n"
                    "    On each row you can provide some information about how your project/organization is addressing the specific activity.\n    "
                ),
                1: "",
                2: "",
                3: "Dimension",
                4: "Subdimension",
                5: "Activity",
                6: "Measure",
                7: "Implemented",
                8: "Comments",
            },
            "Unnamed: 1": {
                0: "",
                1: "",
                2: "",
                3: "The DSOMM Dimension: this is related to the DevOps Pillars",
                4: "The specific subdimension.",
                5: "The Activity to implement",
                6: "The description of the specific measures relevant to the activity",
                7: "Yes/No",
                8: "Describe how the measure is implemented, which tools you are using, ...",
            },
        }
    )
    default_style = Styler(
        font=utils.fonts.calibri,
        font_size=8,
        font_color=utils.colors.black,
        bg_color=utils.colors.white,
        horizontal_alignment=utils.horizontal_alignments.left,
        shrink_to_fit=True,
    )
    header_style = Styler(bold=True, font_size=10)
    with ExcelWriter(outfile, engine="openpyxl") as writer:
        if infile:
            answers = pd.read_excel(infile, sheet_name=None, engine="openpyxl")
        initframe.to_excel(writer, sheet_name="Uno", index=False)
        df = df.sort_values(by=["Dimension", "Subdimension", "Activity"])

        # Format specific columns, e.g. providing hyperlinks.
        df.Measure = df.Measure.apply(html2text.html2text)
        df.Reference = df.Reference.apply(make_hyperlink_xls)
        df.Activity = df.apply(
            lambda x: make_hyperlink_dsomm_activity(x.Activity, x.activity_uri), axis=1
        )

        # Create a sheet for each dimension.
        for dimension in df["Dimension"].unique():
            dfw = df[df["Dimension"] == dimension]

            # Transpose only reference values for ease of reading.
            gdfw = (
                dfw.groupby(["Dimension", "Subdimension", "Activity", "Measure"])[
                    "Reference"
                ]
                .apply(lambda x: x.reset_index(drop=True))
                .unstack()
                .reset_index()
            )

            df_answers = answers.get(dimension, None)
            if df_answers is not None:
                # Merge the answers with the reference values.
                # This is done by matching the activity name, and
                # including unanswered questions using `how="left"`.
                df_answers = df_answers[
                    ["Dimension", "Subdimension", "Activity", "Implemented", "Comments"]
                ]
                gdfw = gdfw.merge(
                    df_answers, on=["Dimension", "Subdimension", "Activity"], how="left"
                )
            else:
                gdfw.insert(4, "Implemented", "")
                gdfw.insert(5, "Comments", "")
            # Format cells and other boring stuff that
            #  you should otherwise do manually.
            log.warning("Dimension: %s", dimension)
            sf = StyleFrame(gdfw, styler_obj=default_style)
            sf.apply_headers_style(styler_obj=header_style)

            # Compute optimal cell height.
            all_rows = sf.row_indexes
            sf.set_row_height_dict(
                row_height_dict={
                    row: max(
                        1, max(str(x).count("\n") for x in dfw.to_records()[row - 2])
                    )
                    * 12
                    for row in all_rows[1:]
                }
            )
            sf.set_column_width(columns=["Dimension", "Subdimension"], width=16)
            sf.set_column_width(columns=["Activity"], width=32)
            sf.set_column_width(columns=["Measure"], width=48)
            sf.set_column_width(columns=["Implemented"], width=12)
            sf.set_column_width(columns=["Comments"], width=48)

            # Write to excel.
            sf.to_excel(writer, sheet_name=dimension, row_to_add_filters=0, index=True)


def generate_excel(outfile="tests/out/dsomm-questionnaire.xlsx", infile=None):
    activities = get_dsomm()
    g = Graph()
    parse_dsomm(activities, g)
    g.serialize(format="text/turtle", destination="vocabularies/dsomm.ttl")

    df = query_data(g)
    create_excel(df, outfile=outfile, infile=infile)
