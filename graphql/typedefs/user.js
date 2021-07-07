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
    personalisedBookList : [String]
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
        verifypassword : String!
  }

  type UserData {
    accountDetails: User
    accountCreated: Boolean!
  }`;

exports.queries = `
    login(loginInput : LoginInput): Boolean!
    refreshToken(userID: String!): Auth!
    searchUser(username : String!) : User!
    `;

exports.mutations = `
    SignUp(signupInput : SignUpInput): UserData`;
