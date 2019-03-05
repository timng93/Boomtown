const { gql } = require('apollo-server-express');

module.exports = gql`
  # scalar Upload
  scalar Date

  enum Role {
    LoggedInUser
  }

  directive @auth(requires: Role = LoggedInUser) on OBJECT | FIELD_DEFINITION

  type Item @auth(requires: LoggedInUser) {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]
    created: Date
    borrower: User
  }

  type User @auth(requires: LoggedInUser) {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag @auth(requires: LoggedInUser) {
    id: ID!
    title: String!
  }

  type File @auth(requires: LoggedInUser) {
    id: ID!
    filename: String!
    encoding: String!
    mimetype: String!
    itemid: ID!
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag!]
  }

  input NewUser {
    fullname: String!
    email: String!
    password: String!
  }

  input Login {
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    addItem(item: NewItemInput!, image: String): Item
    signup(user: NewUser!): ID!
    login(user: Login!): ID!
    logout: Boolean
  }
`;
