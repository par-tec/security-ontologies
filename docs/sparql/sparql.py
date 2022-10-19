import pandas
from rdflib import Graph
from rdflib.term import URIRef


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
