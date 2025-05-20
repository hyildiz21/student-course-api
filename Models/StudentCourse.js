const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentCourseSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
}, { timestamps: true });

module.exports = mongoose.model('StudentCourse', studentCourseSchema);
