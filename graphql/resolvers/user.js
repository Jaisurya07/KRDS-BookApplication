const User = require('../../models/user');
const BookCatalogue = require('../../models/bookCatalogue');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const redis = require('redis');
// const { promisify } = require('util');
const client = redis.createClient(process.env.REDIS_PORT);
// let get = promisify(client.get).bind(client);

require('dotenv').config();
exports.queryResolver = {
  login: async (_, args) => {
    const emailId = args.loginInput.email.trim();
    const passwd = args.loginInput.password.trim();

    if (!validateEmail(emailId)) throw new Error('Invalid Email ID');

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

exports.mutationResolver = {
  signUp: async (_, args) => {
    try {
      // ****** Fetching all the Signup-form details **********//

      const emailId = args.signupInput.email.trim();
      const passwd = args.signupInput.password.trim();

      if (!validateEmail(emailId)) throw new Error('Invalid Email ID');
      if (!validatePassword(passwd))
        throw new Error(
          'Your Password not met the requirements! Please set a password according to the instructions'
        );
      // console.log(passwd.localeCompare(verifyPasswd));

      const IsUserExists = await User.findOne({ email: emailId }).exec();
      // console.log(IsUserExists);
      if (IsUserExists) throw new Error('Email already registered!');

      const user = new User({
        _id: Object.id,
        email: emailId,
        password: passwd,
      });

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
      const email = args.updateUserInput.email.trim();
      const firstname = args.updateUserInput.firstname.trim();
      const lastname = args.updateUserInput.lastname.trim();
      const username = args.updateUserInput.username.trim();
      const mobile = args.updateUserInput.mobile.trim();
      const address = args.updateUserInput.address.trim();
      const country = args.updateUserInput.country.trim();

      if (!validateEmail(email)) throw new Error('Invalid Email ID');
      if (!validateName(firstname)) throw new Error('Enter a valid first Name');
      if (!validateName(lastname)) throw new Error('Enter a valid last Name');
      if (!validateMobile(mobile)) throw new Error('Invalid Mobile Number');

      const updateUser = await User.findOne({ email: email }).exec();

      updateUser.firstname = firstname;
      updateUser.lastname = lastname;
      updateUser.username = username;
      updateUser.mobile = mobile;
      updateUser.address = address;
      updateUser.country = country;

      await updateUser.save();

      return updateUser;
    } catch (err) {
      throw err;
    }
  },

  addToFavourites: async (_, args) => {
    try {
      const bookTitle = args.bookTitle.trim();
      const emailID = args.email.trim();
      const book = await BookCatalogue.findOne({ bookTitle: bookTitle });
      const user = await User.findOne({ email: emailID });

      if (user.favourites.includes(book.id))
        throw new Error('Already added to favourites!');
      user.favourites.push(book.id);
      await user.save();

      return user.populate('favourites').execPopulate();
    } catch (err) {
      throw err;
    }
  },
};

function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function validatePassword(passwd) {
  /* Password Regex for :
    Minmimum 8 characters & atleast one special character,uppercase character ,number....*/

  const passwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwdRegex.test(passwd);
}

function validateMobile(mobile) {
  const mobileRegex = /^([+]\d{2}[ ])?\d{10}$/;
  return mobileRegex.test(mobile);
}

function validateName(name) {
  const regex = /^[a-zA-Z ]{2,30}$/;
  return regex.test(name);
}
