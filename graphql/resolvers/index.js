// *** driver file to Integrate different GraphQL Resolvers... ***

const user = require('./user');
const bookCatalogue = require('./bookcatalogue');

const resolvers = {
  Query: {
    ...user.queryResolver,
    ...bookCatalogue.queryResolver,
  },

  Mutation: {
    ...user.mutationResolver,
    ...bookCatalogue.mutationResolver,
  },
};

module.exports = resolvers;
