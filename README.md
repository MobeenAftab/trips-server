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

Postman test API is avalible as JSON in the `./src/test` directory. Import JSON file into postman to get example data and API routes setup.

Automated unit and e2e testing coming soon.

## Features

-   CRUD operations on trips and user entities.
-   Admins can create and manage a trip.
-   Users can create accounts and then sign up for trips.
-   Server tracks trip details and lists attending users.
-   Authorisation on routes using JSON web Tokens.
-   Mongoose ORM over mongodb.
-   MVC Pattern.
-   Request Authentication using refresh tokens.
-   Password encryption.
-   Reusable modular component design, separation of concerns.

## Tech Stack

-   Typescript
-   ESlint
-   Node
-   express
-   mongoose / mongodb
-   dotenv
-   JSON web tokens
-   Role based auth to protect routes
-   Hosted on Heroku

# TODO

-   [ ] Frontend written in Angular can be found here.
-   [ ] Add e2e and unit tests.
-   [ ] Hosted on Heroku.
-   [ ] CI/CD pipeline.
-   [ ] Docker for local mongodb instance.
-   [ ] logger for server side logging.
-   [ ] Automate postman API route testing.
-   [ ] Generate API documentation.

-   [x] Refactor code to extract all logic from routers into controllers
-   [ ] Redirects for urls that dont exist
-   [ ] middleware to handle request body data, should match entity type and
    -   have the required fields present. If not error out, write request should have some validation on body data.
-   [ ] Some CRUD operations can be refactored into a generic controller over the trip and user models.
-   [ ] Add query parameters to search for trips and users.
-   [ ] Add routes for admins to remove permission roles from users.

# Testing

## Testing Strategy

## What To Test

References

Testing

-   https://www.sisense.com/blog/rest-api-testing-strategy-what-exactly-should-you-test/
-   https://www.360logica.com/blog/sneak-peek-test-framework-test-pyramid-testing-pyramid/
-   [Types of API tests](https://www.code-intelligence.com/rest-api-testing#Types-of-REST-APIs)
-   https://www.testim.io/blog/unit-test-rest-api/

REST API

-   [REST API Guide](https://restfulapi.net/resource-naming/)
-   https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9
