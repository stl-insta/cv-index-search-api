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

Start the application.

```bash
$ npm install

$ npm start # For production

$ npm start dev # For development
```

**Using Docker**

Make a copy of `.env.docker` and save as `.env`.

```bash
$ cp .env.docker .env
```

Install dependencies and run the application locally.

```bash
$ docker-compose up -d api
```

View logs of the container.

```bash
$ docker-compose logs -f
```

To stop the services.

```bash
$ docker-compose stop api
```
## REST API
### Swagger UI - REST API Documentation Tool
http://localhost:8000/swagger/#/

![image](https://user-images.githubusercontent.com/28400679/138511547-b6c6122e-6470-4096-bddb-8793668591a6.png)

### Postman API platform
We also use Postman to test easily our queries and we share our requests on Collections. 

![image](https://user-images.githubusercontent.com/28400679/138511594-559667cf-98ae-4162-b979-2107dc089054.png)

## Contributing

Feel free to send pull requests.

## License

cv-index-search is under [MIT License](LICENSE).
