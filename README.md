# Security Ontologies

This repo hosts an experiment on security ontologies.

Here I collect information from different sources and try to describe them
in RDF.

Original data sources are referenced in the ontology description,
eg. for SAMM, see [the SAMM GitHub repository](https://github.com/owaspsamm/core/tree/develop/model)
and the associate [license](https://github.com/owaspsamm/core/blob/develop/license.txt).


## pre-commit

Pre-commit checks your files before committing. It can lint, format or do
other checks on them.

Once you install it via

        pip3 install pre-commit --user

You can run it directly via

        pre-commit run --all-files


Or install it as a pre-commit hook

        pre-commit install

## .github/workflows

# Querying

List threats, categories and details.

```sparql

prefix pt: <https://par-tec.it/onto/enisa/>

select distinct * where {
?t a pt:Threat;
  rdfs:label ?l ;
  rdfs:subClassOf ?th .

?th rdfs:label ?thl .

?td rdfs:subClassOf ?t ;
    rdfs:label ?tdl .

} LIMIT 1000

```

List SAMM types and details.

```sparql

prefix dct: <http://purl.org/dc/terms/>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>

select distinct * where {

_:b a <https://owaspsamm.org/model/BusinessFunction>;
        rdfs:label ?name ;
        dct:description ?description
.

}

```

List Practices and related Functions

```sparql

PREFIX dct:	<http://purl.org/dc/terms/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX samm: <https://owaspsamm.org/model/>

SELECT DISTINCT ?function, ?practice, ?practice_description
WHERE {

_:b1 a samm:Practice;
 rdfs:label ?practice ;
 dct:description ?practice_description ;
 samm:hasFunction [
        rdfs:label ?function
]

} ORDER BY (?function) LIMIT 1000

```

Practices containing the word `metric`

```sparql
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX samm: <https://owaspsamm.org/model/>

SELECT *
WHERE {

?s a samm:Practice ;
  rdfs:label ?practice ;
  rdfs:comment ?comment
 . ?comment  bif:contains " 'metric*' "
}
```

Identify transitive relationship between Streams and Functions

PREFIX dct: <http://purl.org/dc/terms/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX samm: <https://owaspsamm.org/model/>

SELECT DISTINCT ?stype, ?ftype
where {

?s a samm:BusinessFunction;
   a ?stype
.
?f (<>|!<>)*  ?s;
   a ?ftype
.
FILTER(STRSTARTS(STR(?ftype), "https://owaspsamm.org"))
}
```
