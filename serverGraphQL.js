const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const { typeDefs, resolvers } = require('./graphql/schemaAndResolvers');
const connectDB = require('./Configurations/Configuration');

const JWT_SECRET = 'mySuperSecretKey123'; // env yerine sabit anahtar

async function startServer() {
  const app = express();
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.split(' ')[1]; // Bearer <token>
      if (token) {
        try {
          const user = jwt.verify(token, JWT_SECRET);
          return { user }; // context.user kullanılabilir
        } catch (err) {
          console.warn('Geçersiz token:', err.message);
        }
      }
      return {}; // Token yoksa veya geçersizse boş context
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
}

startServer();
