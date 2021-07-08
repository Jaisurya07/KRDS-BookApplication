const { gql } = require('apollo-server-express');
const User = require('./user');
const BookCatalogue = require('./bookcatalogue');
const typeDefs = gql`

${User.types}
${BookCatalogue.types}
type Query {
    ${User.queries}
    ${BookCatalogue.queries}
 }
type Mutation {
    ${User.mutations}
    ${BookCatalogue.mutations}
}  
`;

module.exports = typeDefs;
