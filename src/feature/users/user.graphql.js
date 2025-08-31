const { gql, UserInputError, AuthenticationError } = require('apollo-server-express');
const userService = require('./user.service');
const { updateUserSchema } = require('./user.validation');

const validate = (schema, input) => {
  const { error } = schema.validate(input, { abortEarly: false });
  if (error) {
    throw new UserInputError('Validation Error', { validationErrors: error.details });
  }
};

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    updateUser(id: ID!, input: UpdateUserInput!): User
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      return context.user;
    },
  },
  Mutation: {
    updateUser: async (_, { id, input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      if (context.user.id !== id) {
        throw new AuthenticationError('You are not authorized to perform this action');
      }
      validate(updateUserSchema, input);
      return await userService.updateUser(id, input);
    },
  },
};

module.exports = { typeDefs, resolvers };
