// *** Imports for Models....

const User = require('../../models/user');
const BookCatalogue = require('../../models/bookCatalogue');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// *** Import Helper  Functions for validations
const utilities = require('./utils');
require('dotenv').config();

// *** Query Type  Resolvers... for User Schema...***
exports.queryResolver = {
  login: async (_, args) => {
    const emailId = args.loginInput.email.trim();
    const passwd = args.loginInput.password.trim();

    if (!utilities.validateEmail(emailId)) throw new Error('Invalid Email ID');

    const IsUserExists = await User.findOne({
      email: emailId,
      password: passwd,
    }).exec();

    if (!IsUserExists)
      throw new Error('Email/password is Incorrect!Please try again!');

    return {
      accountDetails: IsUserExists,
      loggedIn: true,
    };
  },
  searchUser: async (_, args) => {
    try {
      const username = args.username.trim();
      const userPlayList = await User.findOne({ username: username });

      if (!userPlayList) throw new Error('usernmae not registered!');

      return userPlayList.populate('favourites').execPopulate();
    } catch (err) {
      throw err;
    }
  },
};

// *** Mutation Type  Resolvers... for User Schema ***
exports.mutationResolver = {
  signUp: async (_, args) => {
    try {
      // ****** Fetching all the Signup- details **********//

      const emailId = args.signupInput.email.trim();
      const passwd = args.signupInput.password.trim();

      if (!utilities.validateEmail(emailId))
        throw new Error('Invalid Email ID');
      if (!utilities.validatePassword(passwd))
        throw new Error(
          'Your Password not met the requirements! Please set a password according to the instructions'
        );

      // Check User if already  Exists...
      const IsUserExists = await User.findOne({ email: emailId }).exec();

      if (IsUserExists) throw new Error('Email already registered!');

      const user = new User({
        _id: Object.id,
        email: emailId,
        password: passwd,
      });
      // Fetching the User Object as Result....
      const result = await user.save();
      console.log(result);
      return {
        accountDetails: user,
        accountCreated: true,
      };
    } catch (err) {
      throw err;
    }
  },

  updateProfile: async (_, args) => {
    try {
      // ****** Fetching all the Profile-Update details **********//
      const email = args.updateUserInput.email.trim();
      const firstname = args.updateUserInput.firstname.trim();
      const lastname = args.updateUserInput.lastname.trim();
      const username = args.updateUserInput.username.trim();
      const mobile = args.updateUserInput.mobile.trim();
      const address = args.updateUserInput.address.trim();
      const country = args.updateUserInput.country.trim();

      // Validating User Details...
      if (!utilities.validateEmail(email)) throw new Error('Invalid Email ID');
      if (!utilities.validateName(firstname))
        throw new Error('Enter a valid first Name');
      if (!utilities.validateName(lastname))
        throw new Error('Enter a valid last Name');
      if (!utilities.validateMobile(mobile))
        throw new Error('Invalid Mobile Number');

      // Check if user exists....
      const updateUser = await User.findOne({ email: email }).exec();

      // Update profile Info for the corresponding Users...
      updateUser.firstname = firstname;
      updateUser.lastname = lastname;
      updateUser.username = username;
      updateUser.mobile = mobile;
      updateUser.address = address;
      updateUser.country = country;

      // Fetching Udated User Result...
      await updateUser.save();

      return updateUser;
    } catch (err) {
      throw err;
    }
  },

  addToFavourites: async (_, args) => {
    try {
      // Fetching Book Details.....
      const bookTitle = args.bookTitle.trim();
      const emailID = args.email.trim();
      const book = await BookCatalogue.findOne({ bookTitle: bookTitle });
      const user = await User.findOne({ email: emailID });

      // Check if the book already added to User's Favourties..
      if (user.favourites.includes(book.id))
        throw new Error('Already added to favourites!');

      // Add book to the User Favourites...
      user.favourites.push(book.id);

      // Updated User Result....
      await user.save();

      // Populating book Details for  User's Favourites....
      return user.populate('favourites').execPopulate();
    } catch (err) {
      throw err;
    }
  },
};
