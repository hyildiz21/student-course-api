const { Student } = require('../Configurations/Model');

//Query altında sadece okuma işlemleri,
//Mutation altında ise ekleme, güncelleme, silme işlemleri bulunuyor.

const resolvers = {
  Query: {
    getAllStudents: async () => {
    console.log('getAllStudents resolver called');
    return await Student.find().sort({ _id: -1 });
    },

    getStudentById: async (_, { id }) => {
      console.log('getStudentById called with id:', id);
      return await Student.findById(id);
    }
  },

  Mutation: {
    addStudent: async (_, { studentData }) => {
      try {
        console.log('addStudent called with data:', studentData);
        const newStudent = new Student(studentData);
        return await newStudent.save();
      } catch (error) {
        console.error("Öğrenci eklenirken hata oluştu:", error);
        throw error;
      }
    },

    updateStudent: async (_, { id, updateData }) => {
      try {
        console.log('updateStudent called with id:', id, 'and data:', updateData);
        return await Student.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        console.error("Öğrenci güncellenirken hata oluştu:", error);
        throw error;
      }
    },

    deleteStudent: async (_, { id }) => {
      try {
        console.log('deleteStudent called with id:', id);
        return await Student.findByIdAndDelete(id);
      } catch (error) {
        console.error("Öğrenci silinirken hata oluştu:", error);
        throw error;
      }
    }
  }
};

module.exports = resolvers;
