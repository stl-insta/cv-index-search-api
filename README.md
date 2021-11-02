CV Indexing and Searching in Typescript.

## Requirements

- [Node.js](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Clone the repository, install the dependencies.

```bash
$ git clone git@github.com:stl-insta/cv-index-search-api.git <application-name>

$ cd <application-name>

$ cp .env.example .env
```

** Start the application using Docker**

Make a copy of `.env.docker` and save as `.env`.

```bash
$ cp .env.docker .env
```

Install dependencies
```bash
$ npm install
```

Run the application locally.

```bash
$ docker-compose up -d cv-app
```

Seed some fake data, **works only while docker and the app is running**

```bash
$ npm run migrate
```

View logs of the container.

```bash
$ docker-compose logs -f
```

To stop the services.

```bash
$ docker-compose stop cv-app
```
## REST API
### Swagger UI - REST API Documentation Tool
http://localhost:8000/swagger/#/

![image](https://user-images.githubusercontent.com/28400679/138573576-55565c36-181a-436e-9c01-7d69d5b9ed8d.png)

### Postman API platform
We also use Postman to test easily our queries and we share our requests on Collections. 

![image](https://user-images.githubusercontent.com/28400679/138573586-6195cfaa-204f-44ea-b5d7-194a26287ebd.png)

## Kibana
Go to Kibana dev tools console
http://localhost:5601/app/dev_tools#/console

## File parsing  
We use Tesseract OCR to read PDF files content.  
We use DOCX2XML to read docx files content.  

## Contributing

Feel free to send pull requests.

## License

cv-index-search is under [MIT License](LICENSE).
