const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: int
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    bookId: int
    authors: [Auth]
    description: String
    title: String
    image:
    link:
  }

  type Auth {
    _id: ID
    token: ID
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [Auth]!, description: String!, title: String!, bookId: int!, image: , link: ): User
    removeBook(bookId: int!): User
  }
`;

module.exports = typeDefs;
