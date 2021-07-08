// *** Graph QL Schemas for User Model

exports.types = `
type User {
    _id: ID!
    firstname: String
    lastname: String
    username: String
    email: String!
    mobile: String
    address: String
    country: String
    password : String!
    favourites: [BookCatalogue!]
    createdAt: String!
    updatedAt: String!
  }
  type Auth {
    userID: String!
    accessToken: String!
    refreshToken: String!
    accessExpiry: String!
    refreshExpiry: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input SignUpInput {
        email: String!
        password: String!
  }

  input UpdateUserInput {
    email: String!  
    firstname: String!
    lastname: String!
    username: String!
    mobile: String!
    address: String
    country: String
  }
  type UserData {
    accountDetails: User
    accountCreated: Boolean!
  }
  type LoginData {
    accountDetails: User
    loggedIn: Boolean!
  }`;

// *** Graph QL Queries for User Model

exports.queries = `
    login(loginInput : LoginInput): LoginData!
    refreshToken(userID: String!): Auth!
    searchUser(username : String!) : User!
    `;

// *** Graph QL Mutations for User Model

exports.mutations = `
    signUp(signupInput : SignUpInput): UserData!
    updateProfile(updateUserInput : UpdateUserInput) : User!
    addToFavourites(email:String!,bookTitle:String!) : User!
    `;
