from pathlib import Path

import yaml
from rdflib import DCAT, DCTERMS, SKOS, Graph, Literal, Namespace, URIRef
from rdflib.namespace import OWL, RDF, RDFS


def a_or_b(a, b, k):
    if b and not a[k]:
        a[k] = b[k]
    return a[k]


NS_FOAF = Namespace("http://xmlns.com/foaf/0.1/")
NS_OS = Namespace("https://owaspsamm.org/model/")
NS = (
    ("dct", DCTERMS),
    ("owl", OWL),
    ("rdfs", RDFS),
    ("rdf", RDF),
    ("dcat", DCAT),
    ("skos", SKOS),
    ("foaf", NS_FOAF),
    ("pt", NS_OS),
    ("os", NS_OS),
)
BASEDIR = Path("external/samm-model")


def test_parse_function():
    g = Graph()
    parse_function(g)
    g.serialize(format="text/turtle", destination="vocabularies/functions.ttl")


def parse_function(g):
    for f in (BASEDIR/"business_functions").glob("*.yml"):
        data = yaml.safe_load(f.read_text())
        id_ = data["id"]
        uri = URIRef(f"{NS_OS}{id_}")
        g.add((uri, RDFS.label, Literal(data["name"])))
        g.add((uri, SKOS.altLabel, Literal(data["name"].lower())))
        g.add((uri, NS_OS.model, Literal(data["model"])))
        g.add((uri, RDF.type, NS_OS.BusinessFunction))
        g.add((uri, DCTERMS.identifier, Literal(id_)))
        g.add((uri, DCTERMS.description, Literal(data["description"])))
        g.add((uri, NS_OS.hasOrder, Literal(data["order"])))
        g.add((uri, DCAT.downloadURL, Literal(f"{NS_OS}{data['name'].lower()}")))


def test_parse_maturity():
    g = Graph()
    parse_maturity(g)
    g.serialize(format="text/turtle", destination="vocabularies/maturity-levels.ttl")


def parse_maturity(g):
    for f in (BASEDIR / "maturity_levels").glob("*.yml"):
        data = yaml.safe_load(f.read_text())
        id_ = data["id"]
        uri = URIRef(f"{NS_OS}{id_}")
        g.add((uri, RDF.type, NS_OS.MaturityLevel))
        g.add((uri, RDFS.label, Literal(data["number"])))
        g.add((uri, DCTERMS.identifier, Literal(id_)))
        g.add((uri, SKOS.altLabel, Literal(data["number"])))
        g.add((uri, DCTERMS.description, Literal(data["description"])))

        # Relation
        hr_uri = URIRef(f"{NS_OS}maturity/{data['number']}")
        g.add((hr_uri, RDF.type, NS_OS.MaturityLevel))
        g.add((hr_uri, DCTERMS.identifier, Literal(id_)))
        g.add((hr_uri, DCAT.seeAlso, uri))


def test_parse_stream():
    g = Graph()
    parse_stream(g)
    g.serialize(format="text/turtle", destination="vocabularies/streams.ttl")


def parse_stream(g):
    for f in (BASEDIR/"streams").glob("*.yml"):
        data = yaml.safe_load(f.read_text())
        id_ = data["id"]
        altLabel = f.name.replace(".yml", "")
        uri = URIRef(f"{NS_OS}{id_}")
        practice_uri = URIRef(NS_OS + data["practice"])
        g.add((uri, RDF.type, NS_OS.Stream))
        g.add((uri, RDFS.label, Literal(data["name"])))
        g.add((uri, SKOS.altLabel, Literal(altLabel)))
        g.add((uri, DCTERMS.identifier, Literal(id_)))
        g.add((uri, DCTERMS.description, Literal(data["description"])))
        g.add((uri, NS_OS.hasOrder, Literal(data["order"])))
        g.add((uri, NS_OS.hasLetter, Literal(data["letter"])))
        g.add((uri, NS_OS.hasPractice, practice_uri))

        # Relation to practice
        if practice := g.value(practice_uri, SKOS.altLabel):
            g.add((uri, NS_OS.practice, practice))


def test_parse_practice_level():
    g = Graph()
    parse_practice_level(g)
    g.serialize(format="text/turtle", destination="vocabularies/practices-level.ttl")


def parse_practice_level(g):
    # links to practice, maturitylevel
    #
    for f in (BASEDIR/"practice_levels").glob("*.yml"):
        data = yaml.safe_load(f.read_text())
        id_ = data["id"]
        name = f.name.replace(".yml", "")
        uri = URIRef(f"{NS_OS}{id_}")
        g.add((uri, RDF.type, NS_OS.PracticeLevel))
        g.add((uri, RDFS.label, Literal(name)))
        g.add((uri, SKOS.altLabel, Literal(name)))
        g.add((uri, DCTERMS.identifier, Literal(id_)))
        g.add((uri, DCTERMS.description, Literal(data["objective"])))

        maturitylevel_uri = URIRef(NS_OS + data["maturitylevel"])
        practice_uri = URIRef(NS_OS + data["practice"])
        g.add((uri, NS_OS.hasMaturityLevel, maturitylevel_uri))
        g.add((uri, NS_OS.hasPractice, practice_uri))

        if maturitylevel := g.value(maturitylevel_uri, SKOS.altLabel):
            g.add((uri, NS_OS.maturitylevel, maturitylevel))

        if practice := g.value(practice_uri, SKOS.altLabel):
            g.add((uri, NS_OS.practice, practice))


def test_parse_practice():
    g = Graph()
    parse_practice(g)
    g.serialize(format="text/turtle", destination="vocabularies/practices.ttl")


def parse_practice(g):
    # links to Maturity Level
    #
    for f in (BASEDIR/"security_practices").glob("*.yml"):
        data = yaml.safe_load(f.read_text())
        id_ = data["id"]

        uri = URIRef(f"{NS_OS}{id_}")
        function_uri = URIRef(NS_OS + data["function"])
        practice_uri = data["name"].lower().replace("&", "and").replace(" ", "-")
        g.add((uri, RDF.type, NS_OS.Practice))
        g.add((uri, RDFS.label, Literal(data["name"])))
        g.add((uri, SKOS.altLabel, Literal(data["shortName"])))
        g.add((uri, DCTERMS.identifier, Literal(id_)))
        g.add((uri, DCTERMS.description, Literal(data["longDescription"])))
        g.add((uri, RDFS.comment, Literal(data["shortDescription"])))
        g.add((uri, NS_OS.hasOrder, Literal(data["order"])))
        g.add((uri, NS_OS.hasFunction, function_uri))

        # Relation solver.
        if function_name := g.value(function_uri, SKOS.altLabel):
            g.add((uri, RDFS.seeAlso, URIRef(f"{NS_OS}{function_name}/{practice_uri}")))
def test_parse_activity():
    g = Graph()
    parse_activity(g)
    g.serialize(format="text/turtle", destination="vocabularies/activity.ttl")


def parse_activity(g):
    # links to Maturity Level
    #
    """
    ---
# ===========================================================
# OWASP SAMM Activity Description
# ===========================================================
stream: 253b012094cf4e0988e08fd22609227d
level: a11b78917dec4cfdad983cf6d1d17b61
id: 27bb61f3c6344359b021caeaef5ab07e
title: Adhere to basic security principles
benefit: Sets of security basic principles available to product teams
shortDescription: Teams are trained on the use of basic security principles during
  design
longDescription: |
  During design, technical staff on the product team use a short checklist of security principles. Typically, security principles include defense in depth, securing the weakest link, use of secure defaults, simplicity in design of security functionality, secure failure, balance of security and usability, running with least privilege, avoidance of security by obscurity, etc.

  For perimeter interfaces, the team considers each principle in the context of the overall system and identify features that can be added to bolster security at each such interface. Limit these such that they only take a small amount of extra effort beyond the normal implementation cost of functional requirements. Note anything larger, and schedule it for future releases.

  Train each product team with security awareness before this process, and incorporate more security-savvy staff to aid in making design decisions.

#The output of this particular activity
results:

#The different metrics that can be used to measure the success of the activity
metrics:

#A description of the costs required to implement the activity
costs:
#The (standard) roles involved in the implementation of this activity
personnel:

#Internal notes that might help the author
notes:

#References to other activities that are prerequesites to implement this one.
relatedActivities:
#Type Classification of the Document
type: Activity
"""
    for f in (BASEDIR/"activities").glob("*.yml"):
        data = yaml.safe_load(f.read_text())
        id_ = data["id"]

        uri = URIRef(f"{NS_OS}{id_}")
        practicelevel_uri = URIRef(NS_OS + data["level"])
        stream_uri = URIRef(NS_OS + data["stream"])
        g.add((uri, RDF.type, NS_OS.Activity))
        g.add((uri, RDFS.label, Literal(data["title"])))
        g.add((uri, SKOS.altLabel, Literal(f.name.replace(".yml", ""))))
        g.add((uri, DCTERMS.identifier, Literal(id_)))
        g.add((uri, DCTERMS.description, Literal(data["longDescription"])))
        g.add((uri, RDFS.comment, Literal(data["shortDescription"])))
        g.add((uri, NS_OS.hasStream, stream_uri))
        g.add((uri, NS_OS.hasPracticeLevel, practicelevel_uri))
        g.add((uri, NS_OS.benefit, Literal(data["benefit"])))

        # Relation solver.
        if stream_name := g.value(stream_uri, NS_OS.hasLetter):
            stream_suffix = f"stream-{stream_name}".lower()
            if practice_uri := g.value(stream_uri, NS_OS.hasPractice):
                practice_url = g.value(practice_uri, RDFS.seeAlso)
                g.add((uri, RDFS.seeAlso, URIRef(practice_url + f"/{stream_suffix}")))


def test_parse_all():
    g = Graph()
    g.parse(data="""
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix ns1: <https://owaspsamm.org/model/> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

<https://owaspsamm.org/model/> a owl:Ontology ;
    dcterms:description "OWASP SAMM Ontology" ;
    dcterms:creator <mailto:robipolli@gmail.com> ;
    dcterms:license <https://creativecommons.org/licenses/by-sa/4.0/>
.

ns1:BusinessFunction a owl:Class
.
ns1:Practice a owl:Class;
    # hasFunction
.
ns1:MaturityLevel a owl:Class
.
ns1:PracticeLevel a owl:Class;
    # hasPractice
    # hasMaturityLevel
.
ns1:Stream a owl:Class
    # hasPractice
.
ns1:Activity a owl:Class;
    # hasPracticeLevel
    # hasStream
.

ns1:hasFunction a owl:ObjectProperty;
    rdfs:range ns1:BusinessFunction;
    rdfs:domain ns1:Practice
.
ns1:hasPractice a owl:ObjectProperty;
    rdfs:range ns1:Practice;
    rdfs:domain ns1:PracticeLevel;
.
ns1:hasMaturityLevel a owl:ObjectProperty;
    rdfs:range ns1:MaturityLevel;
    rdfs:domain ns1:PracticeLevel;
.
ns1:hasStream a owl:ObjectProperty;
    rdfs:range ns1:Stream;
    rdfs:domain ns1:Activity;
.
ns1:hasPracticeLevel a owl:ObjectProperty;
    rdfs:range ns1:PracticeLevel;
    rdfs:domain ns1:Activity;
.


    """, format="text/turtle")
    parse_function(g)
    parse_maturity(g)
    parse_practice(g)
    parse_practice_level(g)
    parse_stream(g)
    parse_activity(g)

    g.serialize(format="text/turtle", destination="vocabularies/all.ttl")
