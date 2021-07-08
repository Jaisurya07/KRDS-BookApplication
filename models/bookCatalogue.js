// *** Model for Books that needs to be inserted in Book Catalogue... ***//
const { Schema, model } = require('mongoose');

const bookCataloguechema = new Schema(
  {
    bookTitle: {
      type: String,
      trim: true,
      unique: true,
    },
    ISBN: {
      type: Number,
      trim: true,
      unique: true,
    },
    genre: {
      type: String,
      trim: true,
      unique: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Bookcatalogue', bookCataloguechema);
