const { Student } = require('../../Configurations/Model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mySuperSecretKey123'; // sabit key

// Sahte kullanıcı (veritabanı yerine hard-coded)
const users = [
  { id: 1, username: 'admin', password: '1234' }
];


const resolvers = {
  Query: {
    getAllStudents: async (_, __, context) => {
      if (!context.user) throw new Error('Yetkisiz erişim');
      console.log('getAllStudents resolver called');
      return await Student.find().sort({ _id: -1 });
    },

    getStudentById: async (_, { id }, context) => {
      if (!context.user) throw new Error('Yetkisiz erişim');
      console.log('getStudentById called with id:', id);
      return await Student.findById(id);
    }
  },

  Mutation: {
    addStudent: async (_, { studentData }, context) => {
      if (!context.user) throw new Error('Yetkisiz erişim');
      try {
        console.log('addStudent called with data:', studentData);
        const newStudent = new Student(studentData);
        return await newStudent.save();
      } catch (error) {
        console.error("Öğrenci eklenirken hata oluştu:", error);
        throw error;
      }
    },

    updateStudent: async (_, { id, updateData }, context) => {
      if (!context.user) throw new Error('Yetkisiz erişim');
      try {
        console.log('updateStudent called with id:', id, 'and data:', updateData);
        return await Student.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        console.error("Öğrenci güncellenirken hata oluştu:", error);
        throw error;
      }
    },

    deleteStudent: async (_, { id }, context) => {
      if (!context.user) throw new Error('Yetkisiz erişim');
      try {
        console.log('deleteStudent called with id:', id);
        return await Student.findByIdAndDelete(id);
      } catch (error) {
        console.error("Öğrenci silinirken hata oluştu:", error);
        throw error;
      }
    },

    login: (_, { username, password }) => {
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) throw new Error('Kullanıcı adı veya şifre hatalı');

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return token;
    }
  }
};

module.exports = resolvers;
