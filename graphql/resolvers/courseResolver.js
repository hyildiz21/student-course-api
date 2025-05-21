const { Course } = require('../../Configurations/Model');

const courseResolvers = {
  Query: {
    getAllCourses: async () => {
      console.log('getAllCourses resolver called');
      return await Course.find().sort({ _id: -1 });
    },

    getCourseById: async (_, { id }) => {
      console.log('getCourseById called with id:', id);
      return await Course.findById(id);
    },
  },

  Mutation: {
    addCourse: async (_, { courseData }) => {
      try {
        console.log('addCourse called with data:', courseData);
        const newCourse = new Course(courseData);
        return await newCourse.save();
      } catch (error) {
        console.error("Course eklenirken hata oluştu:", error);
        throw error;
      }
    },

    updateCourse: async (_, { id, updateData }) => {
      try {
        console.log('updateCourse called with id:', id, 'and data:', updateData);
        return await Course.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        console.error("Course güncellenirken hata oluştu:", error);
        throw error;
      }
    },

    deleteCourse: async (_, { id }) => {
      try {
        console.log('deleteCourse called with id:', id);
        return await Course.findByIdAndDelete(id);
      } catch (error) {
        console.error("Course silinirken hata oluştu:", error);
        throw error;
      }
    },
  },
};

module.exports = courseResolvers;
