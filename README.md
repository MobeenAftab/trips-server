# trips-server

The purpose of this project is to build a showcase application of production ready quality. I plan on extending this application with more features as mentioned in the TODO section. This API will be consumed by various frontend frameworks to test my skills in those frontend frameworks.

## Development

To start the development server

`yarn dev`

Default url is

`http://localhost:3000`

To build the project

`yarn build`

Push changes to heroku live environment, master branch

`yarn publish`

## Testing

Postman test API is available as JSON in the `./src/test` directory. Import JSON file into postman to get example data and API routes setup.

Automated unit and e2e testing coming soon.

## Features

- CRUD operations on trips and user entities.
- Admins can create and manage a trip.
- Users can create accounts and then sign up for trips.
- Server tracks trip details and lists attending users.
- Authorisation on routes using JSON web Tokens.
- Mongoose ORM over mongodb.
- MVC Pattern.
- Request Authentication using refresh tokens.
- Password encryption.
- Reusable modular component design, separation of concerns.

## Tech Stack

- Typescript
- ESlint
- Node
- express
- mongoose / mongodb
- dotenv
- JSON web tokens
- Role based auth to protect routes
- Hosted on Heroku

## TODO

- [ ] Frontend written in Angular can be found here.
- [ ] Add e2e and unit tests.
- [ ] Hosted on Heroku.
- [ ] CI/CD pipeline.
- [ ] Docker for local mongodb instance.
- [ ] logger for server side logging.
- [ ] Automate postman API route testing.
- [ ] Generate API documentation.

- [x] Refactor code to extract all logic from routers into controllers
- [ ] Redirects for urls that don't exist
- [ ] middleware to handle request body data, should match entity type and
  - have the required fields present. If not error out, write request should have some validation on body data.
- [ ] Some CRUD operations can be refactored into a generic controller over the trip and user models.
- [ ] Add query parameters to search for trips and users.
- [ ] Add routes for admins to remove permission roles from users.

## Docker Compose

run `docker compose up -d` to start a local mongodb instance inside a docker container.

To access the running container `docker exec -it devops-mongodb_container-1 mongo` .

The mongodb username and password are passed through the `.env`, read [here](https://docs.docker.com/compose/environment-variables/).

TODO - Setting up local mongodb instance for development.

- [x] Setup docker compose file for local mongodb instance.
- [x] Securely pass through environment variables.
- [ ] Setup db volume persistance.
- [ ] Script to setup db schema.
- [ ] Validate schema.
- [ ] Generate and insert test data.
- [ ] Setup test suite for API

References for docker todo tasks

- <https://www.mongodb.com/docs/manual/core/schema-validation/>
- <https://www.mongodb.com/docs/manual/tutorial/write-scripts-for-the-mongo-shell/>
- <https://www.mongodb.com/docs/mongodb-shell/write-scripts/>
