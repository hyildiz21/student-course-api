const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  StudentId: { type: String, required: true },
  Name: { type: String, required: true },
  Surname: { type: String, required: true },
  Phone: { type: String, required: true },
  StudentNumber: { type: String, required: true },
  Email: { type: String, required: true }
});

module.exports = mongoose.model('Student', StudentSchema);
