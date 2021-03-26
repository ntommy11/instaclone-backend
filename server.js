import { ApolloServer, gql} from 'apollo-server';
// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'hii',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const url = "http://localhost:4000/";

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});