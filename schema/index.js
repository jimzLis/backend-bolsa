// Nos traemos la funciónn que utilizaremos de la dependencia de graphql
const { buildSchema } = require("graphql")

// Utilizamos este método para crear nuestros esquemas de la siguiente forma
module.exports = buildSchema(`

  type Article {
    _id: ID!
    title: String!
    body: String!
    createdAt: String!
  }
  type Mensaje{
    title: String!
  }

  input ArticleInput {
    title: String!
    body: String!
  }

  type Query {
    articles:[Article!]
    deleteArticle(id: ID!): Mensaje
  }

  type Mutation {
    createArticle(article:ArticleInput): Article
    updateArticle(id: String, article:ArticleInput) :Article
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)