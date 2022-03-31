import pandas as pd
from rdflib import DCAT, DCTERMS, Graph, Literal, Namespace, URIRef
from rdflib.namespace import OWL, RDF, RDFS

NS_FOAF = Namespace("http://xmlns.com/foaf/0.1/")
NS_PT = Namespace("https://par-tec.it/onto/enisa/threat/2016/model/")
NS_ENISA = Namespace("https://par-tec.it/onto/enisa/threat/2016/data/")
NS = (
    ("dct", DCTERMS),
    ("owl", OWL),
    ("rdfs", RDFS),
    ("rdf", RDF),
    ("dcat", DCAT),
    ("foaf", NS_FOAF),
    ("pt", NS_PT),
    ("enisa", NS_ENISA),
)


df = pd.read_excel("Threat taxonomy v 2016.xlsx")
cols = [
    "Threat number",
    "High Level Threats",
    "Threats",
    "Threat details",
    "Exploit",
    "Trends",
    "Affected Asset",
    "Comments",
    "References",
    "Work Week",
    "ENISA 2012",
    "Unnamed: 11",
    "ENISA 2013",
    "Unnamed: 13",
    "ENISA 2014",
    "Unnamed: 15",
    "Threat Landscape and Good Practice Guide for Internet Infrastructure\nYes/No/Additional/Difference",
    "Unnamed: 17",
    "Threat Landscape and Good Practice Guide for Smart Home and Converged Me…\nYes/No/Additional/Difference",
    "Unnamed: 19",
    "Threat description",
]

df = df.fillna("")
entries = df.to_dict(orient="index")


def a_or_b(a, b, k):
    if b and not a[k]:
        a[k] = b[k]
    return a[k]


def add_hl_threat(entry, g):
    identifier = str(int(entry["Threat number"]))
    threat_id = URIRef(f"{NS_ENISA}{identifier}")
    g.add((threat_id, RDF.type, NS_PT.ThreatCategory))
    g.add((threat_id, RDFS.label, Literal(entry["High Level Threats"])))
    g.add((threat_id, DCTERMS.identifier, Literal(identifier)))
    g.add((threat_id, DCTERMS.description, Literal(entry["Threat description"])))


def add_threat(entry, hlt, g, threat_class=NS_PT.Threat):
    identifier = str(int(entry["Threat number"]))
    parent_identifier = str(int(hlt["Threat number"]))
    threat_id = URIRef(f"{NS_ENISA}{identifier}")
    threat_class_id = URIRef(f"{NS_ENISA}{parent_identifier}")

    if threat_class == NS_PT.Threat:
        label = entry["Threats"]
        rel = NS_PT.hasCategory
    elif threat_class == NS_PT.ThreatDetail:
        label = entry["Threat details"]
        rel = NS_PT.hasTreat
    else:
        raise ValueError(f"Unknown threat class {threat_class}")
    g.add((threat_id, RDFS.label, Literal(label)))
    g.add((threat_id, RDF.type, threat_class))
    g.add((threat_id, DCTERMS.identifier, Literal(identifier)))
    g.add((threat_id, DCTERMS.description, Literal(entry["Threat description"])))
    g.add((threat_id, rel, threat_class_id))


def parse_taxonomy():
    o = None
    for idx, e in entries.items():
        tn = e["Threat number"]
        if not tn:
            continue
        a_or_b(e, o, "High Level Threats")
        a_or_b(e, o, "Threats")
        a_or_b(e, o, "Threat details")
        a_or_b(e, o, "Threat description")
        o = e
        yield e


def test_parse_xls():
    g = parse_taxonomy_xls()
    g.serialize(
        format="turtle", destination="vocabularies/enisa-threat-modeling-2016-data.ttl"
    )


def parse_taxonomy_xls():
    g = Graph()
    g.parse("vocabularies/enisa-threat-modeling-2016-onto.ttl")
    for n in NS:
        g.bind(*n)

    hlt = None
    for idx, e in entries.items():
        tn = e["Threat number"]
        if not tn:
            continue
        if e["High Level Threats"]:
            add_hl_threat(e, g)
            hlt = e
            continue
        if e["Threats"]:
            add_threat(e, hlt, g, NS_PT.Threat)
            t = e
            continue
        if e["Threat details"]:
            add_threat(e, t, g, NS_PT.ThreatDetail)
            continue
    return g
