# node-kafka-pipeline
Sample project to demonstrate NodeJS and Apache Kafka (Windows) pipeline

![Pipeline flow](/resources/Node_Kafka_Pipeline_V1.jpg)

---

## Table of contents
- Prerequisites
- Configuration
- Running Application
- Project Structure
- Kafka API

### Prerequisites

| Tool | Version |
| :--- | ------- |
| **Node JS** | 12.13.0 (LTS) |
| **kafka** | kafka_2.12-2.3.0 |
| **zookeeper** | zookeeper-3.5.5 |

### Configuration

1. npm install

2. Create two topics (As per configuration /config/config.development.js)

    > 'validateJSON' and 'saveData'
  
        > kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic validateJSON

        > kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic saveData
  
### Running Application

1. Under roor directory - _Spin up core service_

    > npm run core

2. Start Consumer(s)

    > npm run consumer

3. Logs available under

    > /logs/TOPIC_NAME_err.log

    > /logs/TOPIC_NAME_out.log

### Project Structure

    .
    ├── node-kafka-pipeline                                             
    |   ├── /config                         # Configuration files
    |   ├── /json_schema                    # JSON schema definition for request body validation
    |   ├── /kafka-central-producer         # Kafka Core Producer script
    |   ├── /kafka-consumers                # Kafka Consumers scripts
    |   ├── /logs                           # Log files
    │   |   ├── *_out.log                   # Stdout logs
    │   |   ├── *.log                       # Log
    │   |   └── *_err.log                   # Stderr logs
    |   ├── /src                            # Source scripts
    │   |   └── index.js                    # Entry point file - _Spin up core services_
    |   ├── /node_modules                   # Contains Node packages as specified as dependencies in package.json
    │   |   ├── :                           # -|-
    │   |   ├── :                           # -|-
    │   |   └── :                           # -|-
    │   ├── .gitignore                      # git configuration to ignore some files and folder
    │   ├── package.json                    # Standard npm package specification
    │   ├── LICENSE                         # LICENSE information
    └───└── README.md                       # **node-kafka-pipeline** documentation
  

### Kafka API

An API is included with the sandbox running on port 3001.

Current list of endpoints:

|End point|Type|Details|
|---|---|---|
|_/api/v1/topics_|GET|Get list of topics|
|_/api/v1/save_|POST|Save JSON post schema validation. Sample request body <pre>[<br/> {<br/>  "email": "email@email.com",<br/>  "DOB": "1990-01-01",<br/>  "first": "My",<br/>  "last": "Name",<br/>  "phone": 1234567891<br/> }<br/>]</pre>|
