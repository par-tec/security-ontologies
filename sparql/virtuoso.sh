#!/bin/bash
SETTINGS_DIR=/settings
DATA_PATH=/data

echo "user: $USER"

# Data is a docker volume.
#  all stuff is moved there...
cd /data
mkdir -p "${SETTINGS_DIR}"
mkdir -p /data/dumps


mv /clean-logs.sh . 2>/dev/null

original_port=`crudini --get /conf/virtuoso.ini HTTPServer ServerPort`
# NOTE: prevents virtuoso to expose on port 8890 before we actually run
#               the server
original_port="${VIRT_HTTPServer_ServerPort:-${original_port}}"
export VIRT_HTTPServer_ServerPort=27015


dba_pwd_lock=$SETTINGS_DIR/.db_pwd_set
sql_query_sql=$SETTINGS_DIR/sql-query.sql
if [ ! -f "$dba_pwd_lock" ];
then
  touch $sql_query_sql
  if [ "$DBA_PASSWORD" ]; then echo "user_set_password('dba', '$DBA_PASSWORD');" >> $sql_query_sql ; fi
  if [ "$SPARQL_UPDATE" = "true" ]; then echo "GRANT SPARQL_UPDATE to \"SPARQL\";" >> $sql_query_sql ; fi
  virtuoso-t +wait && isql-v -U dba -P dba < /data/dump_nquads_procedure.sql &&
    isql-v -U dba -P dba < $sql_query_sql

  kill "$(ps aux | grep '[v]irtuoso-t' | awk '{print $2}')"
  echo "`date +%Y-%m-%dT%H:%M:%S%:z`" >  $dba_pwd_lock
fi

load_data_lock=$SETTINGS_DIR/.data_loaded
load_data_sql=$SETTINGS_DIR/load_data.sql
if [ ! -f "$load_data_lock" -a -d "toLoad" ] ;
then
    echo "Start data loading from toLoad folder"
    pwd="dba"
    graph="http://localhost:8890/DAV"

    echo "Loaded" > $load_data_lock

    if [ "$DBA_PASSWORD" ]; then pwd="$DBA_PASSWORD" ; fi
    if [ "$DEFAULT_GRAPH" ]; then graph="$DEFAULT_GRAPH" ; fi

    echo "ld_dir('toLoad', '*', '$graph');" >> $load_data_sql
    echo "rdf_loader_run();" >> $load_data_sql
    echo "exec('checkpoint');" >> $load_data_sql
    echo "WAIT_FOR_CHILDREN; " >> $load_data_sql
    echo "$(cat $load_data_sql)"

    virtuoso-t +wait && isql-v -U dba -P "$pwd" < $load_data_sql

    kill $(ps aux | grep '[v]irtuoso-t' | awk '{print $2}')
fi

load_on_virtuoso(){
  local graph=$1
  local label=$2

  local path="/usr/local/virtuoso-opensource/share/virtuoso/vad/${label}"
  local sql_file="$SETTINGS_DIR/load_${label}.sql"
  local lock_file="$SETTINGS_DIR/.${label}_loaded"

  if [ ! -f ".${label}_loaded" -a -d  "${path}" ];
  then
    pwd="dba" ;
    echo "Loading OntoPiA ${label}"

    cat > "/${sql_file}" << EOF
    ld_dir_all('${path}', '*.ttl', '${graph}');
    rdf_loader_run();
    exec('checkpoint');
    WAIT_FOR_CHILDREN;
EOF

    cat "/${sql_file}"

    virtuoso-t +wait && isql-v -U dba -P "$pwd" < "/${sql_file}"

    kill $(ps aux | grep '[v]irtuoso-t' | awk '{print $2}')
    echo "`date +%Y-%m-%dT%H:%M:%S%:z`" > "${lock_file}"

  fi

}

load_on_virtuoso https://w3id.org/italia/onto ontologies
load_on_virtuoso https://w3id.org/italia/controlled-vocabulary vocabularies
load_on_virtuoso https://w3id.org/italia/schemas schemas


export VIRT_HTTPServer_ServerPort=$original_port
# exec virtuoso-t +wait +foreground

exec virtuoso-t +wait +foreground +configfile /conf/virtuoso.ini
