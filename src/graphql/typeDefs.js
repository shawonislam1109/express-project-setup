import { gql } from 'apollo-server-express';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadFilesSync } from '@graphql-tools/load-files';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesArray = loadFilesSync(path.join(__dirname, '../api/**/*.graphql.js'), {
  extensions: ['js'],
  extract: (file) => file.typeDefs,
});

const rootTypeDefs = gql`
  type Query {
    hello: String
  }
  type Mutation {
    _empty: String
  }
`;

typesArray.push(rootTypeDefs);

export default mergeTypeDefs(typesArray);
