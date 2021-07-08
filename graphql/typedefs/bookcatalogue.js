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

exports.queries = `
searchBook(searchKey : SearchCriteria!,value : String!) : BookCatalogue!
`;

exports.mutations = `
addBook(addBookInput : AddBookInput) : BookData!
`;
