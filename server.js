const express = require('express');
const connectDB = require('./Configurations/Configuration');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
app.use(express.json());

connectDB();

// // 🔐 Auth rotası
// const { router: loginRouter } = require('./Routes/login');
// app.use('/auth', loginRouter);

// REST rotaları
const StudentRoutes = require('./Routes/StudentRoutes');
const CourseRoutes = require('./Routes/CourseRoutes');
const studentCourseRoutes = require('./Routes/StudentCourseRoutes');

app.use('/student', StudentRoutes);
app.use('/course', CourseRoutes);
app.use('/studentCourse', studentCourseRoutes);

// GraphQL
async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
