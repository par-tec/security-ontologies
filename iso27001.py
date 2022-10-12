import math

import pandas as pd
from rdflib import DCTERMS, RDF, RDFS, Graph, Literal, Namespace, URIRef

NS_ISO = Namespace("http://par-tec.it/onto/iso/27001/latest/")
NS_ISO27100 = Namespace("http://par-tec.it/onto/iso/27100/latest/")
NS_ISO27002_2013 = Namespace("http://par-tec.it/onto/iso/27002/2013/")
NS_NIST = Namespace("http://par-tec.it/onto/nist/csf/latest/")

nan = None


def variabilize(s):
    return "".join(map(str.capitalize, s.split()))


def is_nan(v):
    if str(v) == "nan":
        return True

    return v in (nan, None, math.nan)


OPERATIONAL_CAPABILITIES = {
    "Governance": "Governance",
    "Asset\nmanagement": "AssetManagement",
    "Information\nprotection": "InformationProtection",
    "Human\nresource\nsecurity": "HRSecurity",
    "Physical\nsecurity": "PhysicalSecurity",
    "System\nand\nnetwork\nsecurity": "SystemNetworkSecurity",
    "Application\nsecurity": "ApplicationSecurity",
    "Secure\nconfiguration": "SecureConfiguration",
    "Identity\nand\naccess\nmanagement": "IAM",
    "Threat and\nvulnerability\nmanagement": "ThreatManagement",
    "Continuity": "Continuity",
    "Supplier\nrelationships\nsecurity": "SupplierSecurity",
    "Legal and\ncompliance": "Compliance",
    "Information security\nevent management and \nInformation security assurance": "EventManangement",
}

SECURITY_DOMAINS = {
    "Governance\nand\nEcosystem": "GovernanceEcosystem",
    "Protection": "Protection",
    "Defence": "Defence",
    "Resilience": "Resilience",
}
sample = {
    "#": 1.0,
    "Control category": "5. Organizational",
    "Control number": 5.1,
    "Control Title": "Policies for information security",
    "Control Description": "Information security policy and topic-specific policies should be defined, \
        approved by management, \npublished, communicated to and acknowledged by relevant personnel and \
            relevant interested parties, \nand reviewed at planned intervals and if significant changes occur.",
    "Control Purpose": "To ensure continuing suitability, adequacy, effectiveness of management direction \
        and support for \ninformation security in accordance with business requirements, legal, statutory, \
            regulatory and \ncontractual requirements.",
    "Justification for inclusion/exclusion": nan,
    "Implemented\n(Y/N)": nan,
    "risk owner": nan,
    "KPI": nan,
    "controlli ptreesistenti non dipendenti dalla valutazione dei rischi": nan,
    "Correspondence with  ISO/IEC 27002:2013": "05.1.1, 05.1.2",
    "Document required": "Information security policy\nTopic specific policy",
    "Roles involved": "Top Management\nAppropriate managers",
    "Linked OPERATIONAL_CAPABILITIES": nan,
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


def parse_control_category(s):
    _id, label = s.split(". ")
    return URIRef(NS_ISO + f"category-{_id}"), Literal(str(label))


def test_control():
    g = Graph()
    parse_control(g, sample)
    g.serialize(format="text/turtle", destination="vocabularies/test-iso27001.ttl")


def test_all():
    g = Graph()
    g.parse("vocabularies/iso27001-onto.ttl", format="turtle")
    df = pd.read_excel(
        "external/iso/Esempio SOA 27002 2022 doc finale - rpolli.xlsx",
        sheet_name="SoA",
        skiprows=2,
        dtype=str,
        engine="openpyxl",
    )
    for k, control in df.transpose().to_dict(orient="dict").items():
        if not control.get("#") or str(control.get("#")) == "nan":
            continue
        parse_control(g, control)
    g.serialize(format="text/turtle", destination="vocabularies/iso27001-data.ttl")


def parse_control(g, control):
    for k, v in control.items():
        if k == "#":
            continue
        if k == "Control category":
            control_category, label = parse_control_category(v)
            g.add((control_category, RDF.type, NS_ISO.ControlCategory))
            g.add((control_category, RDFS.label, label))
            continue
        if k == "Control number":
            control_id = "control-{}".format(v)
            uri = URIRef(NS_ISO + control_id)
            g.add((uri, RDF.type, NS_ISO.Control))
            g.add((uri, DCTERMS.identifier, Literal(control_id)))
            g.add(
                (
                    uri,
                    NS_ISO.controlCategory,
                    control_category,
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
            g.add((uri, NS_ISO.purpose, Literal(v)))
            continue
        if k == "Justification for inclusion/exclusion" and not is_nan(v):
            g.add((uri, DCTERMS.description, Literal(v)))
            continue
        if k == "Correspondence with  ISO/IEC 27002:2013":
            for controls in v.split(", "):
                g.add(
                    (
                        uri,
                        NS_ISO.correspondsTo,
                        URIRef(NS_ISO27002_2013 + "control-{}".format(controls)),
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
        if k in (
            "Identify",
            "Protect",
            "Detect",
            "Respond",
            "Recover",
        ):
            if v == "x":
                g.add((uri, NS_ISO.hasCybersecurityConcept, URIRef(NS_ISO + k)))
            continue
        if capability_id := OPERATIONAL_CAPABILITIES.get(k):
            if v == "x":
                g.add(
                    (
                        uri,
                        NS_ISO.hasOperationalCapability,
                        URIRef(NS_ISO + capability_id),
                    )
                )

        if security_domain_id := SECURITY_DOMAINS.get(k):
            if v == "x":
                g.add(
                    (uri, NS_ISO.hasSecurityDomain, URIRef(NS_ISO + security_domain_id))
                )
        if v and str(v) != "nan" and "Linked controls" == k:
            for controls in str(v).split():
                g.add(
                    (
                        uri,
                        NS_ISO.hasRelatedControls,
                        URIRef(NS_ISO + f"control-{controls}"),
                    )
                )
            continue
