require('dotenv').config();

import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import {typeDefs, resolvers} from './schema';
import { getUser, protectResolver } from './users/users.utils';

// The GraphQL schema

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({req})=>{
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    }
  }
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({app});

const url = "http://localhost:4000/";
const PORT = process.env.PORT
app.listen({port:PORT},()=>{
  console.log(`🍣 Server is running on http://localhost:${PORT}/graphql`);
})