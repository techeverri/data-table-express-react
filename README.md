## Trello

https://trello.com/b/cs18eD6j/datatable-react-express

## System requirements

Make sure you have either:

- [Node.js](https://nodejs.org/) v10.16.0 or greater
- [Yarn](https://yarnpkg.com/) v1.16.0 or greater (optional)

or

- [Docker](https://docs.docker.com/install/)

## Development

To run the service you need to provide the following environment variables

```
PORT=8080
API_URL=https://api.example.com/data.json
```

## Docker

### `docker build -t data-table-express-react .`

Builds the Docker image. The `-t` flag lets you tag your image so it's easier to find later using the `docker images` command.

### `docker run -p 8080:8080 -d data-table-express-react`

Starts the app in a new container from the `data-table-express-react` image.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `docker ps`

Useful to get the container ID

### `docker exec -it <CONTAINER ID> bash`

Runs bash inside the container

### `docker stop <CONTAINER ID>`

Stops the running container

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn server:start`

Runs the server in production mode and serves the `build` folder.<br>
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.
