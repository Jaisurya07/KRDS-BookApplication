const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./graphql/typedefs/index');
const resolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();
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

app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000/graphql`);
});
