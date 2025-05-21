const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    id: ID!
    StudentId: String
    Name: String
    Surname: String
    Phone: String
    StudentNumber: String
    Email: String
  }

  input StudentInput {
    StudentId: String
    Name: String
    Surname: String
    Phone: String
    StudentNumber: String
    Email: String
  }

  type Query {
    getAllStudents: [Student]
    getStudentById(id: ID!): Student
  }

  type Mutation {
    addStudent(studentData: StudentInput!): Student
    updateStudent(id: ID!, updateData: StudentInput!): Student
    deleteStudent(id: ID!): Student
  }
`;

module.exports = typeDefs;
