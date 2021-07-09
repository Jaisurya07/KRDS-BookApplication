// *** Common Library & Packages Imports *******//
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// *****Passport Js for Google & Facebook Login...
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const cors = require('cors');

// *** Configuration File ***
require('dotenv').config();

// **** GraphQL Resolvers & Schemas (TypeDefinitions) *****//
const typeDefs = require('./graphql/typedefs/index');
const resolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

//***   Initialising graphql-express app... ***
const app = express();
app.use(passport.initialize());

// *** Signup with Google API ***//
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'https://krds-product-app.herokuapp.com/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null, profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  function (req, res) {
    res.send('Sucessfully Authenticated  by Google!');
  }
);

// *** Signup with Facebook API ***//
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        'https://krds-product-app.herokuapp.com/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      console.log(accessToken);
      console.log(refreshToken);
      cb(null, profile);
    }
  )
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  function (req, res) {
    // Successful authentication, response with a Sucess Message.
    res.send(
      'Welcome to KRDS BOOK APPLICATION! Sucessfully Authenticated by FACEBOOK!'
    );
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (integrationContext) => ({
    req: integrationContext.req,
  }),
  playground: process.env.NODE_ENV || true,
  mocks: true,
  mockEntireSchema: false,
});

app.use(cors());

app.use(isAuth);

server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`MONGODB CONNECTED`);
  })
  .catch((err) => {
    throw err;
  });

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:5000/graphql`);
});
