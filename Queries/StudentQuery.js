const { Student } = require('../Configurations/Model');

//get
async function getAllStudents() {
  console.log("Student: ", Student);  // Burada artık mongoose modeli görmelisin
  return await Student.find({});
}

//getBy
async function getStudentById(id) {
  try {
    const student = await Student.findById(id);
    return student;
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
}


//add
async function addStudent(studentData) {
  try {
    const newStudent = new Student(studentData);
    const savedStudent = await newStudent.save();
    return savedStudent;
  } catch (error) {
    console.error("Öğrenci eklenirken hata oluştu:", error);
    throw error;
  }
}


//update
async function updateStudent(id, updateData) {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });
    return updatedStudent;
  } catch (error) {
    console.error("Öğrenci güncellenirken hata oluştu:", error);
    throw error;
  }
}


//delete
async function deleteStudent(id) {
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    return deletedStudent;
  } catch (error) {
    console.error("Öğrenci silinirken hata oluştu:", error);
    throw error;
  }
}





module.exports = { getAllStudents, getStudentById, addStudent, updateStudent, deleteStudent};

