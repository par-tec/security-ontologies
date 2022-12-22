# DSOMM e D3FEND

## Pipeline

```mermaid
flowchart LR
    classDef default stroke:white,color:#fff,clusterBkg:none,fill:#ff652c
    classDef cluster font-weight: bold,fill:none,color:darkgray,stroke:#ff652c,stroke-width:2px
    classDef pad fill:none, stroke:none, opacity:0
    classDef bounded_context stroke-dasharray:5 5


```

## OpenAPI + D3FEND 2

```mermaid
flowchart LR
    classDef default stroke:white,color:#fff,clusterBkg:none,fill:#ff652c
    classDef cluster font-weight: bold,fill:none,color:darkgray,stroke:#ff652c,stroke-width:2px
    classDef pad fill:none, stroke:none, opacity:0
    classDef bounded_context stroke-dasharray:5 5


subgraph WebServerApplication
o[[WebResourceAccess\n...]]
s[[DocumentFile\n...]]
auth[AccessControl\nConfiguration]
end

o -->|returns|s
o -->|uses| auth
WebServer --->|exposes| WebServerApplication

```

## OpenAPI + D3FEND 1

```mermaid
flowchart LR
    classDef default stroke:white,color:#fff,clusterBkg:none,fill:#ff652c
    classDef cluster font-weight: bold,fill:none,color:darkgray,stroke:#ff652c,stroke-width:2px
    classDef pad fill:none, stroke:none, opacity:0
    classDef bounded_context stroke-dasharray:5 5

subgraph OAS3 to D3FEND[ ]
API
OAS
D3FEND
end

subgraph D3FEND
AuthenticationService((Authentication\nService))
WebServer((WebServer))
WebServerApplication((WebServer\nApplication))
WebResourceAccess((Web\nResource\nAccess))
DocumentFile((Document\nFile))
AccessControlConfiguration((Access\nControl\nConfiguration))
end

subgraph OAS
OpenAPI
Server
Operation
SecurityRequirement
Schema
SecurityScheme
end

subgraph API
api
server[api.example.com]
o1[list_contacts]
o2[show_contact]
%% components
oauth2
s1[AddressBook]
s2[Contact]
end

api     ---> o1 & o2 & server
o1      ---> s1
o2      ---> s1 & s2
o1 & o2 ---> oauth2

api -.-> OpenAPI
server  -.-> Server
o1 & o2 -.-> Operation
oauth2  -.-> SecurityScheme & SecurityRequirement
s1 & s2 -.-> Schema

OpenAPI --> WebServerApplication
Operation --> WebResourceAccess
Server --> WebServer
Schema --> DocumentFile
SecurityScheme --> AuthenticationService
SecurityScheme --> AccessControlConfiguration
SecurityRequirement --> AccessControlConfiguration

```

## DSOMM Activities

```mermaid
flowchart LR
    classDef default stroke:white,color:#fff,clusterBkg:none,fill:#ff652c
    classDef cluster font-weight: bold,fill:none,color:darkgray,stroke:#ff652c,stroke-width:2px
    classDef pad fill:none, stroke:none, opacity:0
    classDef bounded_context stroke-dasharray:5 5


ATM[AccessToken\nManipulation]

subgraph D3FEND_PAD
AM
CTS
DST[Decoy Session\nToken]
end

subgraph Artifacts [D3FEND]
direction LR
AT
C
ACC
D3FEND_PAD
end

AT((AccessToken))
C((Credential))
ACC((Access Control\nConfiguration))

ATM --->|parentOf| Artifacts

AT --> |kindOf| C
AT -.->|neighbour| ACC
ACC --->|protected by| AM[[AccessModeling]]
C --->|protected by| CTS[[Credential Transmission\nScoping]]
AT --->|protected by| DST

subgraph DSOMM
Activity1
Activity2
Activity3{{Uncovered}}
end

AM -->|references| Activity1
CTS -->|references| Activity1 & Activity2
DST -->|references| Activity3

class D3FEND_PAD pad
```


## D3FEND Neighbors

```mermaid
flowchart LR
    classDef default stroke:white,color:#fff,clusterBkg:none,fill:#ff652c
    classDef cluster font-weight: bold,fill:none,color:darkgray,stroke:#ff652c,stroke-width:2px
    classDef pad fill:none, stroke:none, opacity:0
    classDef bounded_context stroke-dasharray:5 5


subgraph D3FEND
AM
CTS
DST[Decoy Session\nToken]
end

subgraph Artifacts
AT
C
ACC
end
ATM[AccessToken\nManipulation]

subgraph ATT&CK
ATM
TI
SII
end


TI[TokenImpersonation]
SII[SID History Injection]
AT((AccessToken))
C((Credential))
ACC((Access Control\nConfiguration))

ATM --->|parentOf| TI & SII

TI --> |attacks| AT
SII --> |attacks| ACC
AT --> |kindOf| C

ACC --->|protected by| AM[[AccessModeling]]
C --->|protected by| CTS[[Credential Transmission\nScoping]]
AT --->|protected by| DST


```

## DSOMM Data Model

```mermaid

flowchart

    classDef default stroke:white,color:#fff,clusterBkg:none,fill:#ff652c
    classDef cluster font-weight: bold,fill:none,color:darkgray,stroke:#ff652c,stroke-width:2px
    classDef pad fill:none, stroke:none, opacity:0
    classDef bounded_context stroke-dasharray:5 5

subgraph MITRE [ATT&CK + D3FEND]
subgraph p1
direction TB
DefensiveTechnique
DigitalArtifact
Artifact((Attacked\nArtifact))
OffensiveTechnique
DefensiveArtifact((Defensive\nArtifact))
Attack
end
end

Reference[D3fend\nDefensiveTechnique]


subgraph DSOMM
subgraph p2
direction LR
Reference
Activity
%% Dimension & Subdimension
Implementation
end
end


%%Subdimension ---o|hasDimension| Dimension
%%Activity ---o |hasSubdimension| Subdimension
Activity ---o |3. hasReference| Reference

Activity ---o |4. hasImplementation| Implementation

Attack -.->|kindOf| OffensiveTechnique
Attack -->|1. attacks| Artifact

class p1,p2 pad


Implementation---o |hasTag| DefensiveArtifact -.->|kindOf| DigitalArtifact

Reference -.-|sameAs| DefensiveTechnique
DefensiveTechnique --->|2. protects| Artifact
Artifact -.-> |kindOf| DigitalArtifact

classDef highlight stroke-width: 4px

class Attack,Activity,Implementation,DefensiveTechnique,Reference,Artifact highlight

linkStyle 0,1,3,6,7 stroke-width: 4px
```
