nan = None
sample = {
    "#": 1.0,
    "Control category": "5. Organizational",
    "Control number": 5.1,
    "Control Title": "Policies for information security",
    "Control Description": "Information security policy and topic-specific policies should be defined, approved by management, \npublished, communicated to and acknowledged by relevant personnel and relevant interested parties, \nand reviewed at planned intervals and if significant changes occur.",
    "Control Purpose": "To ensure continuing suitability, adequacy, effectiveness of management direction and support for \ninformation security in accordance with business requirements, legal, statutory, regulatory and \ncontractual requirements.",
    "Justification for inclusion/exclusion": nan,
    "Implemented\n(Y/N)": nan,
    "risk owner": nan,
    "KPI": nan,
    "controlli ptreesistenti non dipendenti dalla valutazione dei rischi": nan,
    "Correspondence with  ISO/IEC 27002:2013": "05.1.1, 05.1.2",
    "Document required": "Information security policy\nTopic specific policy",
    "Roles involved": "Top Management\nAppropriate managers",
    "Linked controls": nan,
    "Preventive": "x",
    "Detective": nan,
    "Corrective": nan,
    "Confidentiality": "x",
    "Integrity": "x",
    "Availability": "x",
    "Identify": "x",
    "Protect": nan,
    "Detect": nan,
    "Respond": nan,
    "Recover": nan,
    "Governance": "x",
    "Asset\nmanagement": nan,
    "Information\nprotection": nan,
    "Human\nresource\nsecurity": nan,
    "Physical\nsecurity": nan,
    "System\nand\nnetwork\nsecurity": nan,
    "Application\nsecurity": nan,
    "Secure\nconfiguration": nan,
    "Identity\nand\naccess\nmanagement": nan,
    "Threat and\nvulnerability\nmanagement": nan,
    "Continuity": nan,
    "Supplier\nrelationships\nsecurity": nan,
    "Legal and\ncompliance": nan,
    "Information security\nevent management and \nInformation security assurance": nan,
    "Governance\nand\nEcosystem": "x",
    "Protection": nan,
    "Defence": nan,
    "Resilience": "x",
    "Funzione 1": nan,
    "Funzione 2": nan,
    "Funzione 3": nan,
    "Funzione 4": nan,
    "funzioni coinvolte per controllo": 0.0,
}
from rdflib import DCTERMS, RDF, RDFS, Graph, Literal, Namespace, URIRef

NS_ISO = Namespace("http://par-tec.it/onto/iso/27001/latest/")


def control_category(s):
    _id, label = s.split(". ")
    return URIRef(NS_ISO + _id), Literal(label)


def test_control():
    g = Graph()
    parse_control(g, sample)
    ret = g.serialize(format="text/turtle", destination="vocabularies/iso27001.ttl")
    raise NotImplementedError


def parse_control(g, control):
    for k, v in control.items():
        if k == "#":
            continue
        if k == "Control category":
            uri, label = control_category(v)
            g.add((uri, RDF.type, NS_ISO.ControlCategory))
            g.add((uri, RDFS.label, label))
            continue
        if k == "Control number":
            uri = URIRef(NS_ISO + "control-{}".format(v))
            g.add((uri, RDF.type, NS_ISO.Control))
            g.add((uri, RDFS.label, Literal(v)))
            g.add(
                (
                    uri,
                    NS_ISO.controlCategory,
                    control_category(control["Control category"])[0],
                )
            )
            continue
        if k == "Control Title":
            g.add((uri, DCTERMS.title, Literal(v)))
            continue
        if k == "Control Description":
            g.add((uri, DCTERMS.description, Literal(v)))
            continue
        if k == "Control Purpose":
            g.add((uri, DCTERMS.description, Literal(v)))
            continue
        if k == "Justification for inclusion/exclusion":
            g.add((uri, DCTERMS.description, Literal(v)))
            continue
        if k == "Correspondence with  ISO/IEC 27002:2013":
            for controls in v.split(", "):
                g.add(
                    (
                        uri,
                        NS_ISO.correspondsTo,
                        URIRef(NS_ISO + "control-{}".format(controls)),
                    )
                )
            continue
        if k in ("Preventive", "Detective", "Corrective"):
            if v == "x":
                g.add((uri, NS_ISO.hasControlType, URIRef(NS_ISO + k)))
            continue
        if k in ("Confidentiality", "Integrity", "Availability"):
            if v == "x":
                g.add((uri, NS_ISO.hasInformationSecurityProperty, URIRef(NS_ISO + k)))
            continue


RDF_MAP = {
    "#": 1.0,
    "Control category": "5. Organizational",
    "Control number": 5.1,
    "Control Title": "Policies for information security",
    "Control Description": "Information security policy and topic-specific policies should be defined, approved by management, \npublished, communicated to and acknowledged by relevant personnel and relevant interested parties, \nand reviewed at planned intervals and if significant changes occur.",
    "Control Purpose": "To ensure continuing suitability, adequacy, effectiveness of management direction and support for \ninformation security in accordance with business requirements, legal, statutory, regulatory and \ncontractual requirements.",
    "Justification for inclusion/exclusion": nan,
    "Implemented\n(Y/N)": nan,
    "risk owner": nan,
    "KPI": nan,
    "controlli ptreesistenti non dipendenti dalla valutazione dei rischi": nan,
    "Correspondence with  ISO/IEC 27002:2013": "05.1.1, 05.1.2",
    "Document required": "Information security policy\nTopic specific policy",
    "Roles involved": "Top Management\nAppropriate managers",
    "Linked controls": nan,
    "Preventive": "x",
    "Detective": nan,
    "Corrective": nan,
    "Confidentiality": "x",
    "Integrity": "x",
    "Availability": "x",
    "Identify": "x",
    "Protect": nan,
    "Detect": nan,
    "Respond": nan,
    "Recover": nan,
    "Governance": "x",
    "Asset\nmanagement": nan,
    "Information\nprotection": nan,
    "Human\nresource\nsecurity": nan,
    "Physical\nsecurity": nan,
    "System\nand\nnetwork\nsecurity": nan,
    "Application\nsecurity": nan,
    "Secure\nconfiguration": nan,
    "Identity\nand\naccess\nmanagement": nan,
    "Threat and\nvulnerability\nmanagement": nan,
    "Continuity": nan,
    "Supplier\nrelationships\nsecurity": nan,
    "Legal and\ncompliance": nan,
    "Information security\nevent management and \nInformation security assurance": nan,
    "Governance\nand\nEcosystem": "x",
    "Protection": nan,
    "Defence": nan,
    "Resilience": "x",
    "Funzione 1": nan,
    "Funzione 2": nan,
    "Funzione 3": nan,
    "Funzione 4": nan,
    "funzioni coinvolte per controllo": 0.0,
}
