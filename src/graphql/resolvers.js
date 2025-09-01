import path from 'path';
import { fileURLToPath } from 'url';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import merge from 'lodash.merge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolversArray = loadFilesSync(path.join(__dirname, '../api/**/*.graphql.js'), {
  extensions: ['js'],
  extract: (file) => file.resolvers,
});

const resolvers = mergeResolvers(resolversArray);

const customResolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

export default merge(resolvers, customResolvers);
