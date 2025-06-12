const express = require('express');
const connectDB = require('./Configurations/Configuration');
const { ApolloServer } = require('apollo-server-express');

const app = express();
app.use(express.json());

connectDB();

// 🔐 Auth rotası
const { router: loginRouter } = require('./Routes/login');
app.use('/auth', loginRouter);

// REST rotaları
const StudentRoutes = require('./Routes/StudentRoutes');
const CourseRoutes = require('./Routes/CourseRoutes');
const studentCourseRoutes = require('./Routes/StudentCourseRoutes');

app.use('/student', StudentRoutes);
app.use('/course', CourseRoutes);
app.use('/studentCourse', studentCourseRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

