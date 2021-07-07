exports.types = `

enum Genre {
    COMEDY
    ROMANCE
    SCIFI
    HORROR
}
type bookCatalogue{
    _id : ID!
    bookTitle : String!
    ISBN : String!
    genre : Genre!
    author : String!
    publisher : String!
}

input AddBookInput {
    bookTitle : String!
    ISBN : String!
    genre : Genre!
    author : String!
    publisher : String!
}


type bookData{
    bookDetails : bookCatalogue!
    bookAdded : Boolean!
}
`;

exports.queries = `
searchBookbyISBN(ISBN : String!) ; bookCatalogue!
searchBookbyTitle(bookTitle : String!) : bookCatalogue!
`;

exports.mutations = `
addBook(addBookInput : AddBookInput) : bookData!
`;
