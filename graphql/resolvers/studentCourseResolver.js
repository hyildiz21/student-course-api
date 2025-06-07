const { StudentCourse } = require('../../Configurations/Model');

const resolvers = {
  Query: {
    getStudentCourseById: async (_, { id }) => {
      const result = await StudentCourse.findById(id)
        .populate('studentId')
        .populate('courseId');
      
      return {
        id: result._id,
        StudentData: result.studentId,
        CourseData: result.courseId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      };
    },

    getStudentCoursesByStudentId: async (_, { studentId }) => {
      const results = await StudentCourse.find({ studentId })
        .populate('studentId')
        .populate('courseId');

      return results.map(result => ({
        id: result._id,
        StudentData: result.studentId,
        CourseData: result.courseId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      }));
    }
  },

  Mutation: {
    addStudentCourse: async (_, { data }) => {
      // Kayıt oluşturuluyor
      const saved = await StudentCourse.create(data);

      // Kayıt tekrar sorgulanıp populate ediliyor
      const populated = await StudentCourse.findById(saved._id)
        .populate('studentId')
        .populate('courseId');

      return populated;
    },

    updateStudentCourse: async (_, { id, data }) => {
      const updated = await StudentCourse.findByIdAndUpdate(id, data, { new: true })
        .populate('studentId')
        .populate('courseId');

      return {
        id: updated._id,
        StudentData: updated.studentId,
        CourseData: updated.courseId,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt
      };
    },

    deleteStudentCourse: async (_, { id }) => {
      const deleted = await StudentCourse.findByIdAndDelete(id)
        .populate('studentId')
        .populate('courseId');

      return {
        id: deleted._id,
        StudentData: deleted.studentId,
        CourseData: deleted.courseId,
        createdAt: deleted.createdAt,
        updatedAt: deleted.updatedAt
      };
    }
  }
};

module.exports = resolvers;
