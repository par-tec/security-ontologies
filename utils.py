# pandas.set_option('display.max_rows', None)

import io

import networkx as nx
import pydotplus
from IPython.display import SVG, Image, display
from rdflib.extras.external_graph_libs import rdflib_to_networkx_graph
from rdflib.tools.rdf2dot import rdf2dot
from SPARQLWrapper import SPARQLWrapper

sparql = SPARQLWrapper("http://virtuoso:8890/sparql")


def from_sparql(query):
    sparql.setQuery(query)
    return sparql.queryAndConvert()


def xvisualize(g, **kwargs):

    nx_g = rdflib_to_networkx_graph(g)
    nx.draw(nx_g, **kwargs)


def visualize(g):
    stream = io.StringIO()
    rdf2dot(g, stream, opts={display})
    dg = pydotplus.graph_from_dot_data(stream.getvalue())
    png = dg.create_svg()
    display(Image(png))

def show_svg(g):
    stream = io.StringIO()
    rdf2dot(g, stream, opts={display})
    dg = pydotplus.graph_from_dot_data(stream.getvalue())
    img = dg.create_svg()
    return SVG(img)


prefixes = """

prefix dct:	<http://purl.org/dc/terms/>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix samm: <https://owaspsamm.org/model/>
prefix enisa: <https://par-tec.it/onto/enisa/>
prefix ethreat: <https://par-tec.it/onto/enisa/threat/>
prefix pt: <https://par-tec.it/security/>
prefix dct: <http://purl.org/dc/terms/>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix d3f: <http://d3fend.mitre.org/ontologies/d3fend.owl#>

"""

CONSTRUCT_ER = """
CONSTRUCT {
    ?object ?rel ?subject
}
WHERE {
?rel rdfs:domain ?object;
     rdfs:range ?subject
.
}
"""
CONSTRUCT_RL = """
CONSTRUCT {
?Concept ?rel ?parent
}

where {
?Concept a owl:ObjectProperty;
  rdfs:subPropertyOf ?parent;
  ?rel ?parent
}
"""
