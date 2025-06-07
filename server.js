// REST API 

const express = require('express');
const connectDB = require('./Configurations/Configuration');

const app = express();
app.use(express.json());

connectDB();

const StudentRoutes = require('./Routes/StudentRoutes');
const CourseRoutes = require('./Routes/CourseRoutes');
const studentCourseRoutes = require('./Routes/StudentCourseRoutes');


app.use('/student', StudentRoutes);
app.use('/course', CourseRoutes);
app.use('/studentCourse', studentCourseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ---- 


// çalışan v1 

// const express = require('express');
// const connectDB = require('./Configurations/Configuration');
// const { ApolloServer } = require('apollo-server-express');

// const typeDefs = require('./graphql/schema');      // GraphQL şema dosyan
// const resolvers = require('./graphql/resolvers');  // GraphQL resolverların

// const app = express();
// app.use(express.json()); // REST için JSON parse middleware

// connectDB();

// // REST rotaları
// const StudentRoutes = require('./Routes/StudentRoutes');
// const CourseRoutes = require('./Routes/CourseRoutes');
// const studentCourseRoutes = require('./Routes/StudentCourseRoutes');

// app.use('/student', StudentRoutes);
// app.use('/course', CourseRoutes);
// app.use('/studentCourse', studentCourseRoutes);

// async function startApolloServer() {
//   const server = new ApolloServer({ typeDefs, resolvers });
//   await server.start();

//   // Apollo Server middleware'ini /graphql endpoint'ine uygula
//   server.applyMiddleware({ app, path: '/graphql' });

//   // Server'ı başlat
//   app.listen(3000, () => {
//     console.log('Server running on port 3000');
//     console.log(`GraphQL endpoint: http://localhost:3000/graphql`);
//   });
// }

// // Apollo server'ı başlat
// startApolloServer();

// ---


// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const connectDB = require('./Configurations/Configuration');

// const typeDefs = require('./graphql/schema');
// const resolvers = require('./graphql/resolvers');

// async function startServer() {
//   const app = express();
//   app.use(express.json());

//   await connectDB();

//   const server = new ApolloServer({ typeDefs, resolvers });
//   await server.start();

//   server.applyMiddleware({ app, path: '/graphql' });

//   // REST API rotaları
//   const StudentRoutes = require('./Routes/StudentRoutes');
//   const CourseRoutes = require('./Routes/CourseRoutes');
//   const studentCourseRoutes = require('./Routes/StudentCourseRoutes');

//   app.use('/student', StudentRoutes);
//   app.use('/course', CourseRoutes);
//   app.use('/studentCourse', studentCourseRoutes);

//   const PORT = 3000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
//   });
// }

// startServer();


