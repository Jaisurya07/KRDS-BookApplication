// *** Imports for Models....
const BookCatalogue = require('../../models/bookCatalogue');
const User = require('../../models/user');
require('dotenv').config();

// *** Import Helper  Functions for validations
const utilities = require('./utils');

// *** Query Type  Resolvers... for BookCatalogue Schema...***
exports.queryResolver = {
  searchBook: async (_, args) => {
    try {
      // Serach for Book by ISBN or Book Title
      const searchKey = args.searchKey.trim();
      const value = args.value.trim();
      // Check for the Search key whether ISBN / Book Title..
      if (searchKey == 'ISBN') {
        const searchBook = await BookCatalogue.findOne({ ISBN: value });
        if (searchBook == null)
          throw new Error('Please provide a valid Entry for ISBN!');
        //   Retrieve Search Book result...
        return searchBook;
      } else if (searchKey == 'BOOKTITLE') {
        const searchBook = await BookCatalogue.findOne({
          bookTitle: value,
        });
        // Throw Exception If not a valid ISBN/BookTitle...
        if (searchBook == null)
          throw new Error('Please provide a valid Entry for BookTitle!');
        //   Retrieve Search Book result...
        return searchBook;
      } else throw new Error('Enter a valid Search Key');
    } catch (err) {
      throw err;
    }
  },
};

// *** Mutation Type  Resolvers... for Book Catalogue Schema...***
exports.mutationResolver = {
  addBook: async (_, args) => {
    try {
      const emailId = args.addBookInput.email.trim();

      if (!utilities.validateEmail(emailId))
        throw new Error('Invalid Email ID');

      // Check If User Already Exists...
      const IsUserExists = await User.findOne({ email: emailId }).exec();

      if (!IsUserExists) throw new Error('UserName/Email not registered!');

      //   Set Username from 'IsUserExists' Object...
      const username = IsUserExists.username;

      //   Fetching Book to Add Details...
      const bookTitle = args.addBookInput.bookTitle.trim();
      const ISBN = args.addBookInput.ISBN.trim();
      const genre = args.addBookInput.genre.trim();
      const author = args.addBookInput.author.trim();
      const publisher = args.addBookInput.publisher.trim();

      //   Constructing Book Object...
      const book = new BookCatalogue({
        _id: Object.id,
        bookTitle: bookTitle,
        ISBN: ISBN,
        genre: genre,
        author: author,
        publisher: publisher,
      });

      //   Add the Book to the Collection..
      const addbookResult = await book.save();

      //   Rtrieve the Book Data...
      return {
        bookDetails: book,
        bookAdded: true,
        doneBy: {
          email: emailId,
          username: username,
        },
      };
    } catch (err) {
      throw err;
    }
  },
};
