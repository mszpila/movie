# Project Name

> This project is made for recruitment at Netguru.

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [API](#api)
- [Test](#test)
- [Docker](#docker)

## General Information

Its main task is to store information about movies. This is done on the basis of the title entered by the user, then the title is sent to a third-party database and from there information such as full movie title, release date, genre(s) and director are fetched and saved.

## Technologies Used

- Typescript - version 4.0.3
- Nestjs - version 7.6.0
- Mongodb - version 3.6.9
- Jest - version 26.6.3

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API

> Sign in

```nodejs
POST http://localhost:8080/auth/login
```

BODY PARAMETER (required)
Basic user

```bash
{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8",
}
```

Premium user

```bash
{
    "username": "premium-jim",
    "password": "GBLtTyq3E_UNjFnpo9m6",
}
```

RESPONSE
On success, the HTTP status code in the response header is 201 Created and the response body contains an access token which is required to add movies.

```bash
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMywidXNlcklkIjoxMjMsIm5hbWUiOiJCYXNpYyBUaG9tYXMiLCJyb2xlIjoiYmFzaWMiLCJpYXQiOjE2MjM3NzcxMDksImV4cCI6MTYyMzc3ODkwOSwiaXNzIjoiaHR0cHM6Ly93d3cubmV0Z3VydS5jb20vIn0.s4qnaal4fFPgRBrJXne4FQ9pW-NOEipwkLGYU_6xzQI"
}
```

> Get movies

```nodejs
GET http://localhost:8080/movies
```

Response
On success, the HTTP status code in the response header is 200 OK and the response body contains an array of objects in JSON format.

```bash
[
    {
        "title": "Star Wars: Episode IV - A New Hope",
        "released": "1977-05-24T23:00:00.000Z",
        "genre": "Action, Adventure, Fantasy, Sci-Fi",
        "director": "George Lucas",
        "authorId": 123,
        "added": "2021-06-15T22:18:44.573Z",
        "id": "74d6c0e6-8ff8-488f-9f92-93a52391a10d"
    },
    {
        "title": "Rick and Morty",
        "released": "2013-12-01T23:00:00.000Z",
        "genre": "Animation, Adventure, Comedy, Sci-Fi",
        "director": "N/A",
        "authorId": 123,
        "added": "2021-06-15T22:18:58.857Z",
        "id": "e2b13a2f-80b5-451f-802d-5c587abecb85"
    }
]
```

> Post movies

```nodejs
POST http://localhost:8080/movies
```

HEADER (required)
A valid user access token

```bash
Authorization: Bearer <string>
```

BODY PARAMETER (required)

```bash
{
    "title": <string>
}
```

Response
On success, the HTTP status code in the response header is 201 Created.

## Test

```bash
# run tests
$ npm run test

# watch mode
$ npm run test:watch

# unit tests
$ npm run test:unit

# integration tests
$ npm run test:int

# test coverage
$ npm run test:cov
```

## Docker

To run dockerized application

```bash
docker pull mszpila/movie
docker run -p 8080:8080 movie
```
