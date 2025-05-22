const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    id: ID!
    Name: String
    Surname: String
    Phone: String
    StudentNumber: String
    Email: String
  }

  type Course {
    id: ID!
    CourseCode: String
    Name: String
    DayOfWeek: Int
    StartTime: String
    EndTime: String
  }

  type StudentCourse {
    id: ID!
    StudentData: Student!
    CourseData: Course!
    createdAt: String
    updatedAt: String
  }

  input StudentCourseInput {
    studentId: ID!
    courseId: ID!
  }

  type Query {
    getStudentCourseById(id: ID!): StudentCourse
    getStudentCoursesByStudentId(studentId: ID!): [StudentCourse]
  }

  type Mutation {
    addStudentCourse(data: StudentCourseInput!): StudentCourse
    updateStudentCourse(id: ID!, data: StudentCourseInput!): StudentCourse
    deleteStudentCourse(id: ID!): StudentCourse
  }
`;

module.exports = typeDefs;
