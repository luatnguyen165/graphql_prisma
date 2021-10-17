const { ApolloServer ,gql} = require('apollo-server-express');
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const express = require('express');
const { prisma } = require('./common');

// your data.
const app = express()

const server = new ApolloServer({ typeDefs, resolvers,context:req=>({
  prisma,
  req
})});

server.applyMiddleware({app})
// The `listen` method launches a web server.
app.listen(3000,()=>{
  console.log(`server is running at http://localhost:3000${server.graphqlPath}`);
})