const { Course } = require('../Configurations/Model');

// Tüm kursları getir
async function getAllCourses() {
  return await Course.find({});
}

// Yeni kurs oluştur
async function createCourse(courseData) {
  const newCourse = new Course(courseData);
  return await newCourse.save();
}

// ID ile kurs getir
async function getCourseById(id) {
  return await Course.findById(id);
}

// Kursu güncelle
async function updateCourse(id, updatedData) {
  return await Course.findByIdAndUpdate(id, updatedData, { new: true });
}

// Kursu sil
async function deleteCourse(id) {
  return await Course.findByIdAndDelete(id);
}


module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse
};

