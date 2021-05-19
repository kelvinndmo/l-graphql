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
        hello: String
    }
`;
