import { gql } from 'apollo-server-express';
import articleService from './article.service.js';

export const typeDefs = gql`
  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  extend type Query {
    articles: [Article]
    article(id: ID!): Article
  }

  extend type Mutation {
    createArticle(title: String!, content: String!): Article
  }
`;

export const resolvers = {
  Query: {
    articles: async () => {
      return await articleService.getArticles();
    },
    article: async (_, { id }) => {
      return await articleService.getArticleById(id);
    },
  },
  Mutation: {
    createArticle: async (_, { title, content }, { user }) => {
      if (!user) {
        throw new Error('You must be logged in to create an article.');
      }
      return await articleService.createArticle({ title, content, author: user._id });
    },
  },
};