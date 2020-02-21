# graphql-keyword-manager

A keyword manager application using GraphQL and React

## Installation
This repo follows a monorepo structure. Doing `yarn install` at the root level (inside graphql-keyword-manager folder itself) will install all the dependencies for client and server.

## Running the server app

`cd modules/server` and `npm start` will run the GraphQL server on `localhost:4001`
Prisma instance is already deployed on the demo server offered by Prisma

## Running the client app

`cd modules/client` and `npm start` starts the client webpack server on `localhost:3000`

## Explanation of architecture

Earlier I thought of using `apollo-server` as the graphql server and `sqlite` as a data source. But setting up `sqlite` and using `serialize` proved cumbersome. Instead, I have used `graphql-yoga` as the graphql server and `prisma` for storing and managing the data. Prisma proves to be a much better, easier and neater option to set up a database and perform operations using it's easy, fluent api.

This app uses the datamuse REST api as a data source to fetch similar words to a given word. It then stores these words in the database used by prisma. All the CRUD operations are performed on this data. The frontend uses `apollo-client` to query the graphql server.
