# magic-potion

> A fullstack application built with React, Node.JS, ExpressJS, PostGreSQL, styled with TailWindCSS, and deployed on Heroku. This application servers as the unofficial "launch page" of the magically magical Magic Potion. Fill out the form and try it for yourself!

http://magic-potion-demo.herokuapp.com/

## Table of Contents

1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Development](#development)
1. [Run Application](#run-application)

## Requirements

- Node v12.16.1

- NPM 6.14.4

- PostgreSQL 12.3

## Getting Started

### Installing Dependencies

Install backend dependencies within the root directory:

```sh
npm install
```

Also, install client dependencies:


```sh
cd /Client
npm install
```

### Configure PostgreSQL config:

From within database.js in root, configure credentials:

```sh
const devConfig = {
  host: YOUR_HOST,
  user: YOUR_USER,
  password: YOUR_PASSWORD,
  database: YOUR_DATABASE,
};
```
You may input credentials directly or create a .env file. I recommend the latter. Example .env:

```sh
PG_USER = user
PG_PASSWORD = password
PG_HOST = localhost
PG_PORT = 5432
PG_DATABASE = magicpotion
```

### Create Database Tables

You may use the provided schema.sql file to build the database in postgresql.

## Development

### Run Server in development mode
In root directory run:

```sh
npm run start-server
```

this will run nodemon and will watch for any changes to the server code.


### Run Client App in development mode

In /client folder run,

```sh
npm start
```
## Production

### Run Server for production
In root directory run:

```sh
npm start
```

this will run nodemon and will watch for any changes to the server code.

### Run Client App for production

In /client directory run,

```sh
npm run build
```

