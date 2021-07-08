// User Model for Storing User Information....
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { username: { $type: 'string' } },
      },
    },
    mobile: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } },
      },
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },

    address: {
      type: String,
    },
    country: {
      type: String,
    },

    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bookcatalogue',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
