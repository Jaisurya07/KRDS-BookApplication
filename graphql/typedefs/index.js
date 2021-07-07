const { gql } = require('apollo-server-express');
const User = require('./user');
const typeDefs = gql`

${User.types}

type Query {
    ${User.queries}
 }
type Mutation {
    ${User.mutations}
}  
`;

module.exports = typeDefs;
