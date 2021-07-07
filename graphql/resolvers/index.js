const user = require('./user');

const resolvers = {
  Query: {
    ...user.queryResolver,
  },

  Mutation: {
    ...user.mutationResolver,
  },
};

module.exports = resolvers;
