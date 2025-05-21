const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const studentTypeDefs = require('../graphql/schemas/studentSchema');
const courseTypeDefs = require('../graphql/schemas/courseSchema');

const studentResolvers = require('../graphql/resolvers/studentResolver');
const courseResolvers = require('../graphql/resolvers/courseResolver');

const typeDefs = mergeTypeDefs([studentTypeDefs, courseTypeDefs]);
const resolvers = mergeResolvers([studentResolvers, courseResolvers]);

module.exports = { typeDefs, resolvers };
