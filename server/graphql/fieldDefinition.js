const { gql } = require('apollo-server-express');

exports.typeDef = gql`
  type FieldDefinition {
    id: ID!
    key: String!
    type: String!
  }

  input UpdatedFieldDefinition {
    key: String
    type: String
  }

  input NewFieldDefinition {
    key: String!
    type: String
  }

  input UpsertedFieldDefinition {
    id: ID
    key: String
    type: String
  }
`;
