const { gql } = require('apollo-server-express');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typesArray = loadFilesSync(path.join(__dirname, '../api/**/*.graphql.js'), {
  extensions: ['js'],
  extract: (file) => file.typeDefs,
});

const rootTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

typesArray.push(rootTypeDefs);

module.exports = mergeTypeDefs(typesArray);
