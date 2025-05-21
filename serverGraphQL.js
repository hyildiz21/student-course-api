// server.js örneği
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./Configurations/Configuration');

async function startServer() {
  const app = express();
   await connectDB();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
}

startServer();
