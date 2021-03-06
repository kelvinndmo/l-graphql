import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import Mutation from "../resolvers/Mutation";
import User from "../resolvers/User";
import Post from "../resolvers/Post";
import Comment from "../resolvers/Comment";
import Query from "../resolvers/Query";
import Subscription from "../resolvers/subscription";

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers:{
    Query,
    Mutation,
    User,
    Post,
    Comment,
    Subscription
  },
  context: {
    db,
    pubsub
  },
});

server.start(() => {
  console.log("Server is running and up....");
});
