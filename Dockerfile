FROM tenforce/virtuoso


COPY ./sparql/virtuoso.ini /conf/virtuoso.ini
COPY ./sparql/virtuoso.sh /virtuoso.sh

COPY vocabularies /usr/local/virtuoso-opensource/share/virtuoso/vad/vocabularies
COPY ontologies /usr/local/virtuoso-opensource/share/virtuoso/vad/ontologies
COPY schemas /usr/local/virtuoso-opensource/share/virtuoso/vad/schemas

RUN chmod +x /clean-logs.sh
RUN useradd virtuoso
RUN mkdir /settings

USER root

RUN chown -R virtuoso: /usr/local/virtuoso-opensource \
    /conf \
    /settings \
    /data \
    /virtuoso.sh
RUN chown -R virtuoso: /usr/local/virtuoso-opensource/var/lib/virtuoso/db/virtuoso.ini

USER virtuoso

ENV HTTPSERVER_SERVERPORT=27015
