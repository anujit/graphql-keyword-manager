# graphql-keyword-manager

A keyword manager application using GraphQL and React

## Installation
This repo follows a monorepo structure. Doing `yarn install` at the root level will install all the dependencies for client and server.

## Running the server app

`cd modules/server` and `npm start` will run the GraphQL server on `localhost:4000`

## Running the client app

`cd modules/client` and `npm start` starts the client webpack server on `localhost:3000`

## Explanation of architecture
I have used apollo-server at the backend. Since the datamuse REST api is read-only, all the Graph Mutations are performed on the data stored in an sqlite database table. So the flow is like this - 
1. Once the GraphQL server receives a query from apollo-client, it first checks in the sqlite table if the requested data exists. If yes, it sends this data to the client. If not, it makes a new request to the Datamuse REST api and stores this data in sqlite.
2. All the Graph Mutations are performed on the data in the sqlite table

## Pending code changes
1. Need to add Mutations for Delete Category and Add Keyword
2. On the UI side, currently loading a hard-coded query by default, need to add changes for loading categories based on user input
3. Need to add and process user input for mutations related to delete category, delete keyword and add keyword on the UI side
