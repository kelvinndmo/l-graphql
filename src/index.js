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

const commments = [
  { id: 1, author: "2", body: "Hello i dont think you meant it", post_id: "1" },
  { id: 2, author: "1", body: "Hello i dont think you meant it", post_id: "2" },
  { id: 4, author: "2", body: "Hello i dont think you meant it", post_id: "2" },
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

    type Mutation {
      createUser(data:CreateUserInput!):User!
      createPost(data:CreatePostInput):Post!
      createComment(data:CreateCommentInput): Comment!
    }

    input CreateUserInput {
      name:String!
      email:String!
      age:Int!
    }

    input CreateCommentInput {
      text:String!
      user:String!
      post:String!
    }

    input CreatePostInput  {
      title:String!
      body:String!
      published:Boolean!
      author:ID!
    }

    type User {
      id:ID!
      name:String!
      email:String!
      age:Int
      posts:[Post]
    }


    type Comment {
      id:ID!
      author:User!
      body:String!

    }

    type Post {
      id:ID!
      title:String!
      body:String!
      published:Boolean!
      author:User!
      comments:[Comment!]!
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
  Mutation: {
    createUser(parent, args, context, info) {
      const emailExists = users.some((user) => user.email === args.data.email);
      if (emailExists) {
        throw new Error("Email token");
      } else {
        const u = {
          ...args.data,
          id: Date.now(),
        };

        users.push(u);
        return u;
      }
    },
    createPost(parent, args, context, info) {
      const userExists = users.some((user) => user.id === args.data.author);

      if (userExists) {
        const post = {
          ...args.data,
          id: Date.now(),
        };

        posts.push(post);
        return post;
      } else {
        throw new Error("User not found...");
      }
    },
    createComment(parent, args, context, info) {
      const { user, post, text } = args.data;
      const u = users.some((u) => u.id === user);
      console.log(u);
      const pst = posts.some((p) => p.id === post);
      console.log(pst);
      if (u && pst) {
        const commment = {
          id: new Date(),
          author: user,
          body: text,
        };

        commments.push({ ...commment, post_id: post });
        return commment;
      }
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      console.log(parent);
      return commments.filter((comment) => comment.post_id === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
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
