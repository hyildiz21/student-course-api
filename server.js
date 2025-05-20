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


app.listen(3000, () => {
  console.log('Server running on port 3000');
});


