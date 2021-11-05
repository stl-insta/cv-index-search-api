CV Indexing (PDF & Word) and searching in Typescript with Elasticsearch.

* [Introduction](#introduction)
    * [Quick Links](#quick-Links)
* [Getting started](#getting-started)
    * [Requirements](#requirements)
    * [Run](#run)
    * [Seed Data](#seed-data)
    * [Logs](#logs)
    * [Tests](#tests)
* [Tools](#tools)
    * [Swagger](#swagger)
    * [Postman](#postman-api-platform)
    * [Kibana](#kibana)
    * [File parsing](#file-parsing)
* [User Interfaces](#user-interfaces)
* [Contributing](#contributing)
* [License](#license)
## Introduction

Cv app is a cv search engine platform, helping HR to find quickly the perfect candidate by upload candidate CVs in different formats such as PDF or WORD.

DAAR Project 2: searching distributed data with ElasticSearch.

Binome : [Mamy Razafintsialonina Ny Andrianina](https://github.com/nyandrianinamamy) & [Willyan LIN](https://github.com/willdow)
### Quick Links
Some shortcuts
- [Swagger](http://localhost:8000/swagger/#/) (Test request)
- [Kibana](http://localhost:5601/app/dev_tools#/console) (Dev tools console)
- [App](http://localhost:8080/) (Front-end application)
## Getting Started

### Requirements
- [Node.js](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Run

Clone the repository, install the dependencies.

```bash
$ git clone git@github.com:stl-insta/cv-index-search-api.git <application-name>
$ cd <application-name>
$ cp .env.example .env
```

** Start the application using Docker**

Install dependencies
```bash
$ npm install
```

Run the application locally.

```bash
$ docker-compose up api
```

When the api started successfully and displays server info. Run the frontend app in another console

```bash
$ docker-compose up cv-app
```

To stop the services.

```bash
$ docker-compose stop cv-app
$ docker-compose stop api
```
### Seed Data

Seed some fake data, **works only while docker and the app is running**

```bash
$ npm run migrate
```
### Logs

View logs of the container.

```bash
$ docker-compose logs -f
```

### Tests
Some unit testing has been implemented.  
The migration script acts as an end-2-end integration testing.  
Please **make sure** the app is running inside a docker container before launching the test. 
```bash
$ npm run test
```
## Tools
### Swagger
We use Swagger UI to documente our REST API
![image](https://user-images.githubusercontent.com/28400679/138573576-55565c36-181a-436e-9c01-7d69d5b9ed8d.png)

### Postman API platform
We also use Postman to test easily our queries and we share our requests on Collections. 

![image](https://user-images.githubusercontent.com/28400679/138573586-6195cfaa-204f-44ea-b5d7-194a26287ebd.png)

### Kibana
Kibana is a free and open user interface that let us visualize Elasticsearch data and navigate the Elastic Stack.

### File parsing  
We use [tesseract OCR ](https://github.com/tesseract-ocr/tesseract) to read PDF files content.  
We use [docx4js](https://github.com/lalalic/docx4js) and [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) to read docx files content.  

## User Interfaces
Home Page:

File Upload Page:

Search Page:

## Contributing
Feel free to send pull requests.

## License

cv-index-search is under [MIT License](LICENSE).
