const { gql } = require('apollo-server-express');

const courseTypeDefs = gql`
  type Course {
    id: ID!
    CourseId: String
    Name: String
    DayOfWeek: Int
    CourseCode: String
    StartTime: String
    EndTime: String
  }

  input CourseInput {
    CourseId: String
    Name: String
    DayOfWeek: Int
    CourseCode: String
    StartTime: String
    EndTime: String
  }

  type Query {
    getAllCourses: [Course]
    getCourseById(id: ID!): Course
  }

  type Mutation {
    addCourse(courseData: CourseInput!): Course
    updateCourse(id: ID!, updateData: CourseInput!): Course
    deleteCourse(id: ID!): Course
  }
`;

module.exports = courseTypeDefs;
