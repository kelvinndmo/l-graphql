import { GraphQLServer } from "graphql-yoga";

//Type definations(Schema)
// -> Everything that can be done
// -> Defines what the query will look like.

//Resolvers
// => Functions that run for each operations that can run.
// => Get and return the correct data
// => Querying data based on what is performed

const users = [
  { id: "1", name: "kelvin Onkundi", email: "ndemo@gmail.com" },
  { id: "2", name: "Anita Waither", email: "novakss@gmail.com", age: 30 },
  { id: "3", name: "Anita Waither", email: "novakss@gmail.com", age: 30 },
];

const posts = [
  {
    id: "1",
    title: "Graphql 101",
    body: "This is now used for graphql",
    published: false,
    author: "1",
  },
  {
    id: "2",
    title: "Graphql 102",
    body: "This is now used for graphql",
    published: false,
    author: "2",
  },
];

const typeDefs = `
    type Query {
      me : User
      post:Post
      users(query:String):[User!]!
      posts:[Post]
    
    }

    type User {
      id:ID!
      name:String!
      email:String!
      age:Int
      posts:[Post]
    }

    type Post {
      id:ID!
      title:String!
      body:String!
      published:Boolean!
      author:User!
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
    post() {
      return {
        id: "4rt",
        title: "Graphql 101",
        body: "Gell",
        published: false,
      };
    },
    users(parent, args, ctx, info) {
      if (args.query) {
        return users.filter((user) =>
          user.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return users;
    },
    posts() {
      return posts;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
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
