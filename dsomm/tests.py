from rdflib import Graph, URIRef

from . import (
    QUERY,
    create_excel,
    format_link,
    get_dsomm,
    parse_activity,
    parse_dsomm,
    query_data,
)


def test_parse_dsomm():
    activities = get_dsomm()
    g = Graph()
    parse_dsomm(activities, g)
    query_data(g)
    g.serialize(format="text/turtle", destination="tests/out/dsomm-t2.ttl")


def test_parse_activity():
    activities = get_dsomm()
    for dimension, dvalue in activities.items():
        for subdimension, activity in dvalue.items():
            for a_n, a in activity.items():
                g = Graph()
                parse_activity(g, a_n, a, URIRef("https://example.org"))
                g.serialize(
                    format="text/turtle", destination="tests/out/dsomm-test.ttl"
                )


def test_format_link():
    ret = format_link(
        """
    http://par-tec.it/onto/iso/27002/2013/controls/12.1.1
- http://par-tec.it/onto/iso/27002/2013/controls/14.2.2
- https://owaspsamm.org/model/implementation/secure-build/stream-a#1
    """
    )
    assert (
        '<a href="http://par-tec.it/onto/iso/27002/2013/controls/12.1.1">iso27001:  12.1.1</a>'
        in ret
    )


def test_query_data():
    activities = get_dsomm()
    g = Graph()
    parse_dsomm(activities, g)
    QUERY_1 = QUERY + """ LIMIT 2 """
    ret = g.query(QUERY_1)
    assert len(ret.result) == 2
    assert len(ret.vars) == 6
    assert len(ret.result[0]) == 6


def test_io_excel():
    activities = get_dsomm()
    g = Graph()
    parse_dsomm(activities, g)
    df = query_data(g)
    create_excel(df, outfile="test.xlsx", infile="tests/dsomm-infile.xlsx")


def test_sparql():
    df = query_data()
    create_excel(df, "tests/out/test_sparql_activity.xlsx")
