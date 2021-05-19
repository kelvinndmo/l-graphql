import { GraphQLServer } from "graphql-yoga";

//Type definations(Schema)
// -> Everything that can be done
// -> Defines what the query will look like.

//Resolvers
// => Functions that run for each operations that can run.
// => Get and return the correct data
// => Querying data based on what is performed

const typeDefs = `
    type Query {
        hello: String!
        name:String!
        bio:String!
        age:Int!
        employed:Boolean!
        inStock:String!

    }

`;

const resolvers = {
  Query: {
    hello() {
      return "This is my first query";
    },
    name() {
      return "Kelvin Onkundi Ndemo";
    },
    bio() {
      return "I live in Jua";
    },
    inStock() {
      return "True";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is running and up....");
});
