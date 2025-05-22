const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const studentTypeDefs = require('../graphql/schemas/studentSchema');
const courseTypeDefs = require('../graphql/schemas/courseSchema');

const studentResolvers = require('../graphql/resolvers/studentResolver');
const courseResolvers = require('../graphql/resolvers/courseResolver');

const studentCourseTypeDefs = require('../graphql/schemas/studentCourseSchema');
const studentCourseResolvers = require('../graphql/resolvers/studentCourseResolver');

const typeDefs = mergeTypeDefs([
  studentTypeDefs,
  courseTypeDefs,
  studentCourseTypeDefs
]);

const resolvers = mergeResolvers([
  studentResolvers,
  courseResolvers,
  studentCourseResolvers
]);

module.exports = { typeDefs, resolvers };
