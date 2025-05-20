const { Student, StudentCourse } = require('../Configurations/Model');

//öğrenciye ait tüm dersler
async function getCoursesByStudentId(studentId) {
  if (!studentId) {
    throw new Error('Student ID gereklidir.');
  }

  // İlişkili kayıtları al (hem course hem student bilgileriyle birlikte)
  const records = await StudentCourse.find({ studentId })
    .populate('studentId')
    .populate('courseId');

  if (!records || records.length === 0) {
    return [];
  }

  // Tek bir kayıt yapısı oluştur
  const firstRecord = records[0];

  return [{
    _id: firstRecord._id,
    student: firstRecord.studentId,
    courses: records.map(r => r.courseId),
    createdAt: firstRecord.createdAt,
    updatedAt: firstRecord.updatedAt
  }];
}

// Yeni öğrenci-kurs ilişkisi oluştur
async function createStudentCourse(data) {
  const newEntry = new StudentCourse(data);
  return await newEntry.save();
}

// Belirli bir ilişkiyi ID ile getir
async function getStudentCourseById(id) {
  return await StudentCourse.findById(id)
    .populate('studentId')
    .populate('courseId');
}

// İlişkiyi güncelle
async function updateStudentCourse(id, updatedData) {
  return await StudentCourse.findByIdAndUpdate(id, updatedData, {
    new: true,
  }).populate('studentId').populate('courseId');
}

// İlişkiyi sil
async function deleteStudentCourse(id) {
  return await StudentCourse.findByIdAndDelete(id);
}

module.exports = {
  getCoursesByStudentId,
  createStudentCourse,
  getStudentCourseById,
  updateStudentCourse,
  deleteStudentCourse,
};
