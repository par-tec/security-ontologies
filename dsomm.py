import logging
from builtins import NotImplementedError
from pathlib import Path

import requests
import yaml
from rdflib import DCAT, DCTERMS, SKOS, Graph, Literal, Namespace, URIRef
from rdflib.namespace import OWL, RDF, RDFS

# from urllib.parse import quote

log = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


def a_or_b(a, b, k):
    if b and not a[k]:
        a[k] = b[k]
    return a[k]


NS_FOAF = Namespace("http://xmlns.com/foaf/0.1/")
NS_OS = Namespace("https://owaspsamm.org/model/")
NS_DSOMM = Namespace("https://github.com/wurstbrot/DevSecOps-MaturityModel/")
NS_ISO27100 = Namespace("http://par-tec.it/onto/iso/27002/2013/")
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
    ("iso27100", NS_ISO27100),
)


def get_dsomm():
    dsomm_yaml = Path("vocabularies/dsomm.yaml")
    if not dsomm_yaml.exists():
        url = "https://raw.githubusercontent.com/wurstbrot/DevSecOps-MaturityModel/master/src/assets/YAML/generated/generated.yaml"
        r = requests.get(url)
        dsomm_yaml.write_text(r.text)
        return yaml.safe_load(r.text)
    return yaml.safe_load(dsomm_yaml.read_text())


def test_parse_dsomm():
    activities = get_dsomm()
    g = Graph()
    parse_dsomm(activities, g)
    g.serialize(format="text/turtle", destination="vocabularies/dsomm.ttl")
    raise NotImplementedError


def test_parse_activity():
    activities = get_dsomm()
    for dimension, dvalue in activities.items():
        for subdimension, activity in dvalue.items():
            for a_n, a in activity.items():
                g = Graph()
                parse_activity(g, a_n, a, URIRef("https://example.org"))
                g.serialize(format="text/turtle", destination="vocabularies/dsomm.ttl")
                raise NotImplementedError


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
            g.add((subdimension_uri, NS_DSOMM.Dimension, dimension_uri))
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
    g.add((activity_uri, NS_DSOMM.SubDimension, subdimension_uri))

    g.add((activity_uri, RDFS.comment, Literal(activity.get("description", ""))))
    g.add((activity_uri, NS_DSOMM.Measure, Literal(activity.get("measure", ""))))
    for i in activity.get("implementation", []):
        if "url" not in i:
            continue
        implementation_url = URIRef(i["url"])
        g.add((activity_uri, NS_DSOMM.hasImplementation, implementation_url))
        g.add((implementation_url, RDF.type, NS_DSOMM.Implementation))
        g.add((implementation_url, RDFS.label, Literal(i["name"])))
        g.add((implementation_url, RDFS.comment, Literal(i.get("description", ""))))
        for t in i.get("tags", []):
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
                if str(iso27001).isnumeric():
                    yield URIRef(NS_ISO27100 + "controls/" + str(iso27001))
                else:
                    yield Literal(iso27001)
        else:
            raise ValueError("Unknown reference: {}".format(k))


if __name__ == "__main__":
    activities = get_dsomm()
    g = Graph()
    parse_dsomm(activities, g)
    g.serialize(format="text/turtle", destination="vocabularies/dsomm.ttl")
