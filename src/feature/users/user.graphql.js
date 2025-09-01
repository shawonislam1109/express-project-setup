import { gql, UserInputError, AuthenticationError } from 'apollo-server-express';
import userService from './user.service.js';
import { updateUserSchema } from './user.validation.js';

const validate = (schema, input) => {
  const { error } = schema.validate(input, { abortEarly: false });
  if (error) {
    throw new UserInputError('Validation Error', { validationErrors: error.details });
  }
};

export const typeDefs = gql`
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

export const resolvers = {
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