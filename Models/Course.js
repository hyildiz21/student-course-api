const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  CourseId: { type: String, required: true },
  Name: { type: String, required: true },
  DayOfWeek: { type: Number, required: true },
  CourseCode: { type: String, required: true },
  StartTime: { type: Date, required: true },
  EndTime: { type: Date, required: true }
});

module.exports = mongoose.model('Course', CourseSchema);
