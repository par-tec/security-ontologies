from builtins import NotImplementedError
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
NS_DSOMM = Namespace("https://github.com/wurstbrot/DevSecOps-MaturityModel/")
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
)

from urllib.parse import quote


def test_parse_dsomm():
    g = Graph()
    parse_dsomm(g)
    g.serialize(format="text/turtle", destination="vocabularies/dsomm.ttl")
    raise NotImplementedError

def parse_dsomm(g):
    d = Path("dimensions-subdimensions-activities")
    for f in d.glob("**/*.yaml"):
        data = yaml.safe_load(f.read_text())

        for dimension, dvalue in data.items():
            dimension_uri = URIRef(NS_DSOMM + dimension.replace(" and ", "").replace(" ", ""))
            g.add((dimension_uri, RDF.type, NS_DSOMM.Dimension))
            g.add((dimension_uri, RDFS.label, Literal(dimension)))
            for subdimension, activity in dvalue.items():
                subdimension_uri = URIRef(NS_DSOMM + subdimension.replace(" and ", "").replace(" ", ""))
                g.add((subdimension_uri, RDF.type, NS_DSOMM.SubDimension))
                g.add((subdimension_uri, RDFS.label, Literal(subdimension)))
                g.add((subdimension_uri, NS_DSOMM.dimension, dimension_uri))
                for a in activity:
                    parse_activity(g, a, subdimension_uri)

def parse_activity(g, a, subdimension_uri):




"""
      risk: Quality is not visible to everyone, quality checks are distributed or manually and not deterministic.
      measure: Use continuous automated building and testing of the software.
      md-description: |
        ## Benefits:
        Quality is visible to everyone
        There is a single instance deciding whether the code meets its quality (single ground of truth).
        Deterministic and reproducible builds
      assessment: |
        - Show your build pipeline and an exemplary job (build + test).
        - Show that every team member has access.
        - Show that failed jobs are fixed.
      difficultyOfImplementation:
        knowledge: 2
        time: 2
        resources: 2
      usefulness: 2
      level: 1
      implementation:
        - $ref: data/dimensions-subdimensions-activities/implementations.yaml#/implementations/ci-cd-tools
      references:
        samm2:
          - I-SB-1-A
        iso27001-2017:
          - iso27001-2017:14.2.6
      credits: |
        AppSecure-nrw [Security Belts](https://github.com/AppSecure-nrw/security-belts/)

"""
