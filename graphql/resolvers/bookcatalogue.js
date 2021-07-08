const BookCatalogue = require('../../models/bookCatalogue');
const User = require('../../models/user');
require('dotenv').config();

exports.queryResolver = {
  searchBook: async (_, args) => {
    try {
      const searchKey = args.searchKey.trim();
      const value = args.value.trim();

      if (searchKey == 'ISBN') {
        const searchBook = await BookCatalogue.findOne({ ISBN: value });
        if (searchBook == null)
          throw new Error('Please provide a valid Entry for ISBN!');
        return searchBook;
      } else if (searchKey == 'BOOKTITLE') {
        const searchBook = await BookCatalogue.findOne({
          bookTitle: value,
        });
        if (searchBook == null)
          throw new Error('Please provide a valid Entry for BookTitle!');
        return searchBook;
      } else throw new Error('Enter a valid Search Key');
    } catch (err) {
      throw err;
    }
  },
};

exports.mutationResolver = {
  addBook: async (_, args) => {
    try {
      const emailId = args.addBookInput.email.trim();
      const IsUserExists = await User.findOne({ email: emailId }).exec();
      // console.log(IsUserExists);
      if (!IsUserExists) throw new Error('UserName/Email not registered!');

      const username = IsUserExists.username;

      const bookTitle = args.addBookInput.bookTitle.trim();
      const ISBN = args.addBookInput.ISBN.trim();
      const genre = args.addBookInput.genre.trim();
      const author = args.addBookInput.author.trim();
      const publisher = args.addBookInput.publisher.trim();

      const book = new BookCatalogue({
        _id: Object.id,
        bookTitle: bookTitle,
        ISBN: ISBN,
        genre: genre,
        author: author,
        publisher: publisher,
      });

      const addbookResult = await book.save();

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
