const express = require('express');
const connectDB = require('./Configurations/Configuration');

const app = express();
app.use(express.json());

connectDB();

const StudentRoutes = require('./routes/StudentRoutes');
const CourseRoutes = require('./routes/CourseRoutes');

app.use('/student', StudentRoutes);
app.use('/course', CourseRoutes);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});


