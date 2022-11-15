import logging

from openapi_parser import parse
from rdflib import RDF, RDFS, Graph, Literal, Namespace, URIRef

D3F = Namespace("https://d3fend.org/ontology#")
LOCAL = Namespace("https://localhost#")
log = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def test_parse_servers():
    api = parse("openapi.yaml")
    g = Graph()
    parse_servers(g, api)
    assert len(g) == 2
    log.info(g.serialize(format="turtle"))


def parse_servers(graph, api):
    for server in api.servers:
        server_uri = URIRef(server.url)
        graph.add((server_uri, RDF.type, D3F.WebServer))
        if server.description:
            graph.add((server_uri, RDFS.comment, Literal(server.description)))


def test_parse_securitySchemes():
    api = parse("openapi.yaml")
    g = Graph()
    parse_securitySchemes(g, api)
    assert len(g) == 10
    log.info(g.serialize(format="turtle"))


def parse_securitySchemes(graph, api):
    for name, scheme in api.security_schemas.items():
        scheme_uri = LOCAL[f"securitySchemes/{name}"]
        graph.add((scheme_uri, RDF.type, D3F.WebAuthentication))
        if scheme.description:
            graph.add((scheme_uri, RDFS.comment, Literal(scheme.description)))
        try:
            if scheme.scheme.name == "bearer":
                graph.add((scheme_uri, RDF.type, D3F.AccessToken))
        except Exception:
            pass

        if scheme.type.name.lower() == "oauth2":
            for flow_id, flow in scheme.flows.items():
                flow_uri = scheme_uri + "/" + flow_id.name
                graph.add((flow_uri, RDF.type, D3F.Authorization))
                graph.add((scheme_uri, D3F.accesses, flow_uri))
                if flow.authorization_url:
                    graph.add((flow_uri, D3F.accesses, URIRef(flow.authorization_url)))
                    graph.add(
                        (
                            URIRef(flow.authorization_url),
                            RDF.type,
                            D3F.AuthorizationService,
                        )
                    )
                if flow.token_url:
                    graph.add((flow_uri, D3F.accesses, URIRef(flow.token_url)))
                    graph.add(
                        (URIRef(flow.token_url), RDF.type, D3F.AuthorizationService)
                    )
                if flow.refresh_url:
                    graph.add((flow_uri, D3F.accesses, URIRef(flow.refresh_url)))
                    graph.add(
                        (URIRef(flow.refresh_url), RDF.type, D3F.AuthorizationService)
                    )

                for scope in flow.scopes:
                    graph.add(
                        (flow_uri, D3F.implements, D3F.CredentialTransmissionScoping)
                    )


def test_parse_paths():
    api = parse("openapi.yaml")
    g = Graph()
    parse_paths(g, api)
    assert len(g) == 6
    log.info(g.serialize(format="turtle"))


def parse_paths(graph, api):
    for path in api.paths:
        path.url
        for operation in path.operations:
            operation_uri = LOCAL[operation.operation_id]
            graph.add((operation_uri, RDF.type, D3F.WebResourceAccess))
            for server in api.servers:
                graph.add((operation_uri, RDFS.member, URIRef(server.url)))

            for securityScheme in operation.security:
                for securitySchemeName, securitySchemeScopes in securityScheme.items():
                    graph.add(
                        (
                            operation_uri,
                            D3F.accesses,
                            LOCAL[f"securitySchemes/{securitySchemeName}"],
                        )
                    )


def test_parse_all():
    api = parse("openapi.yaml")
    g = Graph()
    parse_all(g, api)

    assert (
        URIRef("https://localhost#getOauthEndpoint"),
        URIRef("https://example.com/oauth/token"),
    ) in list(
        g.query(
            """
    prefix ns1: <https://d3fend.org/ontology#>
    SELECT DISTINCT * WHERE {
            ?a ns1:accesses+ ?b
            . ?b a ns1:AuthorizationService
            . ?a a ns1:WebResourceAccess}
    """
        )
    )
    assert len(g) == 14
    log.info(g.serialize(format="turtle"))


def parse_all(graph, api):
    parse_servers(graph, api)
    parse_securitySchemes(graph, api)
    parse_paths(graph, api)
