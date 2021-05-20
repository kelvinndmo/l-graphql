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
      me : User
      getPost:Post
    }

    type User {
      id:ID!
      name:String!
      email:String!
      age:Int
    }

    type Post {
      ID:ID!
      title:String!
      description:String!
      published:Boolean!
    }

`;

const resolvers = {
  Query: {
    me() {
      return {
        id: "Kelvin",
        name: "Kelvin",
        email: "dsddsd@gmail.com",
      };
    },
    getPost() {
      return {
        id: "4rt",
        title: "Graphql 101",
        description: "Gell",
        published: false,
      };
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
