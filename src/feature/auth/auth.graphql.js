import { gql, UserInputError } from 'apollo-server-express';
import authService from './auth.service.js';
import { registerSchema } from './auth.validation.js';

const validate = (schema, input) => {
  const { error } = schema.validate(input, { abortEarly: false });
  if (error) {
    throw new UserInputError('Validation Error', { validationErrors: error.details });
  }
};

export const typeDefs = gql`
  type AuthResponse {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthResponse
    login(input: LoginInput!): AuthResponse
  }
`;

export const resolvers = {
  Mutation: {
    register: async (_, { input }) => {
      validate(registerSchema, input);
      const user = await authService.registerUser(input.name, input.email, input.password);
      const tokens = await authService.generateAuthTokens(user);
      return { ...tokens, user };
    },
    login: async (_, { input }) => {
      const user = await authService.loginUserWithEmailAndPassword(input.email, input.password);
      const tokens = await authService.generateAuthTokens(user);
      return { ...tokens, user };
    },
  },
};