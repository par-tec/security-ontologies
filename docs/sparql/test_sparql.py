import logging
import time
from pathlib import Path

import pytest
from rdflib import Graph

log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)

Q = """
      PREFIX d3f: <http://d3fend.mitre.org/ontologies/d3fend.owl#>
      PREFIX samm: <https://owaspsamm.org/model/>
      PREFIX iso: <http://par-tec.it/onto/iso/27001/latest/>
      PREFIX dsomm: <https://owasp.org/www-project-devsecops-maturity-model/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT DISTINCT
      ?attackTechniqueLabel
      ?activity
      ?implementationLabel
      ?artifactC
      ?defend
      WHERE {

          # VALUES ?artifactC { d3f:AccessToken}

          # Get the technique that is used to defend the artifact
          ?attack rdfs:subClassOf*/rdfs:subClassOf ?attackTechnique;
                  d3f:attack-id _:b0 .

          # Get the parent technique.
          ?attackTechnique rdfs:subClassOf [ rdfs:subClassOf d3f:OffensiveTechnique] ;
                          rdfs:label ?attackTechniqueLabel .

          ?attack ?attacks ?artifactC .
          ?artifactC rdfs:subClassOf*/rdfs:subClassOf d3f:DigitalArtifact .

          ?defend rdfs:subClassOf+/rdfs:subClassOf d3f:DefensiveTechnique .
          ?defend ?protects ?artifactC .

          OPTIONAL {
              # Get the activity that implements the technique
              ?activity a dsomm:Activity ;
                  dsomm:hasReference ?defend ;
                  dsomm:hasImplementation [ rdfs:label ?implementationLabel ] .
          }
      }
      ORDER BY ?attackTechniqueLabel
      LIMIT 5
      """


def query_store(store=None):
    if store:
        g = Graph(store=store)
    else:
        g = Graph()
    for file_ttl in Path(".").glob("*.ttl"):
        g.parse(str(file_ttl))

    log.warning(f"Starting test {store}")
    start = time.time()
    ret = g.query(Q)
    iter(ret.result)
    log.warning(f"Query {store} took {time.time() - start} seconds")


@pytest.mark.timeout(60)
def test_query_oxygraph():
    query_store(store="Oxigraph")


@pytest.mark.timeout(60)
def test_query_rdflib():
    query_store(store=None)
