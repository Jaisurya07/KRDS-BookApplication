// *** Graph QL Schemas for BookCatalogue Model
exports.types = `

enum Genre {
    COMEDY
    ROMANCE
    SCIFI
    HORROR
}

enum SearchCriteria{
    ISBN
    BOOKTITLE
}
type BookCatalogue{
    _id : ID!
    bookTitle : String!
    ISBN : String!
    genre : Genre!
    author : String!
    publisher : String!
}

input AddBookInput {
    email : String!
    bookTitle : String!
    ISBN : String!
    genre : Genre!
    author : String!
    publisher : String!
}
 type DoneBy {
     email : String!
     username : String!
 }

type BookData{
    bookDetails : BookCatalogue!
    bookAdded : Boolean!
    doneBy : DoneBy
}
`;
// *** Graph QL Queries for BookCatalogue Model
exports.queries = `
searchBook(searchKey : SearchCriteria!,value : String!) : BookCatalogue!
`;

// *** Graph QL Mutations for BookCatalogue Model
exports.mutations = `
addBook(addBookInput : AddBookInput) : BookData!
`;
