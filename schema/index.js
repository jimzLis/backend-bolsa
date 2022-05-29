// Nos traemos la funciónn que utilizaremos de la dependencia de graphql
const { buildSchema } = require("graphql")

// Utilizamos este método para crear nuestros esquemas de la siguiente forma
module.exports = buildSchema(`

  type Job {
    _id: ID!
    title: String!
    companyName: String!
    place: String!
    emailCompany: String!
    phoneCompany: String!
    body: String!
    createdAt: String!
  }
  type MessageReturn{
    title: String!
  }
  input JobInput {
    title: String!
    companyName: String!
    place: String!
    emailCompany: String!
    phoneCompany: String!
    body: String!
  }

  type Query {
    jobs:[Job!]
    deleteJob(id: ID!): MessageReturn
  }

  type Mutation {
    createJob(job:JobInput): Job
    updateJob(id: String, job:JobInput) :Job
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)