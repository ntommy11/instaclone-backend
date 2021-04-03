require('dotenv').config();

import { ApolloServer, gql} from 'apollo-server';
import schema from './schema';
import { getUser, protectResolver } from './users/users.utils';

// The GraphQL schema

const server = new ApolloServer({
  schema,
  context: async ({req})=>{
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    }
  }
});

const url = "http://localhost:4000/";
const PORT = process.env.PORT
server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at localhost:${PORT}`);
});