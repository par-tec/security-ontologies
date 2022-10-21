import pandas
from rdflib import Graph
from rdflib.term import URIRef

INITNS = {
    "skos": "http://www.w3.org/2004/02/skos/core#",
    "dct": "http://purl.org/dc/terms/",
    "dc": "http://purl.org/dc/elements/1.1/",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "dm": "https://owasp.org/www-project-devsecops-maturity-model/",
    "iso": "https://par-tec.github.io/security-ontologies/onto/iso#",
    "samm": "https://owaspsamm.org/model/",
    "owl": "http://www.w3.org/2002/07/owl#",
}

QUERIES = {
    "query1": {
        "label": "DSOMM Activities and related ISO Controls",
        "query": """
                SELECT
                ?activity
                ?iso_control_id
                ?iso_control

                WHERE {
                ?a a dm:Activity;
                rdfs:label ?activity;
                dm:hasReference ?r
                .
                ?r a iso:Control;
                dct:description ?iso_control;
                dct:identifier ?iso_control_id
                .
                } LIMIT 5"}
                """,
    },
    "query2": {
        "label": "List concepts",
        "query": """SELECT DISTINCT * WHERE { [] a ?Concept} LIMIT 5""",
    },
    "query3": {
        "label": "DSOMM Activities and related SAMM Controls",
        "query": """
                SELECT
                    ?DSOMM_Activity
                    ?SAMM_Activity

                WHERE {
                    ?a a dm:Activity;
                        rdfs:label  ?DSOMM_Activity;
                        dm:hasReference ?r
                    .
                    ?r a samm:Activity;
                        owl:sameAs ?samm_activity_uri
                    .
                    ?samm_activity_uri rdfs:label ?SAMM_Activity
                    .
                    }
                ORDER BY (?DSOMM_Activity)
                """,
    },
    "query4": {
        "label": "DSOMM Activities most SAMM effective",
        "query": """
                SELECT
                    ?DSOMM_Activity
                    (count(?samm_activity_uri) as ?SAMM_Activities)

                WHERE {
                    ?a a dm:Activity;
                        rdfs:label  ?DSOMM_Activity;
                        dm:hasReference ?r
                    .
                    ?r a samm:Activity;
                        owl:sameAs ?samm_activity_uri
                    .
                    }
                GROUP BY ?DSOMM_Activity
                ORDER BY DESC(?SAMM_Activities)
                """,
    },
    "query5": {
        "label": "DSOMM Activities most ISO effective",
        "query": """
                SELECT
                    ?DSOMM_Activity
                    (count(?r) as ?ISO_Controls)

                WHERE {
                    ?a a dm:Activity;
                        rdfs:label  ?DSOMM_Activity;
                        dm:hasReference ?r
                    .
                    ?r a iso:Control
                    .
                    }
                GROUP BY ?DSOMM_Activity
                ORDER BY DESC(?ISO_Controls)
                """,
    },
    "query6": {
        "label": "DSOMM Implementations most ISO effective",
        "query": """

                SELECT
                    ?implementation
                    (count(?r) as ?ISO_Controls)

                WHERE {
                    ?a a dm:Activity;
                        dm:hasReference ?r;
                        dm:hasImplementation ?implementation
                    .
                    ?r a iso:Control
                    .
                    }
                GROUP BY ?implementation
                ORDER BY DESC(?ISO_Controls)
        """,
    },
}


def format_cell(cell, prefixes):
    if not isinstance(cell, URIRef):
        return str(cell)

    for ns, nsurl in prefixes.items():
        if cell.startswith(nsurl):
            return cell.replace(nsurl, ns + ":")
    return str(cell)


def query(graph, text, prefixes):
    ret = graph.query(text, initNs=prefixes)
    headers = [str(x) for x in ret.vars]
    rows = [[format_cell(c, prefixes) for c in x] for x in ret]

    df = pandas.DataFrame(data=rows, columns=headers)
    return df.to_html(index=False, justify="left", border=1, classes="col")


def test_query():
    initns = {
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "dct": "http://purl.org/dc/terms/",
        "dc": "http://purl.org/dc/elements/1.1/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "dm": "https://owasp.org/www-project-devsecops-maturity-model/",
        "iso": "https://par-tec.github.io/security-ontologies/onto/iso#",
        "samm": "https://owaspsamm.org/model/",
        "owl": "http://www.w3.org/2002/07/owl#",
    }

    g = Graph()
    g.parse("dsomm.ttl")
    ret = query(
        g,
        """
    SELECT * WHERE { ?s ?p ?q} LIMIT 5
    """,
        initns,
    )
    assert len(ret)
