const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeResolvers } = require('@graphql-tools/merge');
const merge = require('lodash.merge');

const resolversArray = loadFilesSync(path.join(__dirname, '../api/**/*.graphql.js'), {
  extensions: ['js'],
  extract: (file) => file.resolvers,
});

const resolvers = mergeResolvers(resolversArray);

const customResolvers = {
  Query: {
    hello: () => 'Hello world!',
    getArticles: () => [
      {
        id: '1',
        title: 'First Article',
        content: 'This is the content of the first article.',
      },
      {
        id: '2',
        title: 'Second Article',
        content: 'This is the content of the second article.',
      },
    ],
  },
};

module.exports = merge(resolvers, customResolvers);
