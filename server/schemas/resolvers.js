const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      // get a single user by either their id or their username
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('books');
      },
      /* Not included in user-controller */
      books: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Book.find(params).sort({ createdAt: -1 });
      },
      book: async (parent, { bookId }) => {
        return Book.findOne({ _id: bookId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('books');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  
    Mutation: {
      // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
      saveBook: async (parent, { user, body }, context) => {
        if (context.user) {  
           await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: body } }
          );
          return User.savedBooks;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      // remove a book from `savedBooks`
      deleteBook: async (parent, { userId, bookId }, context) => {
        if (context.user) {
            return User.findOneAndUpdate(
              { _id: userId },
              { $pull: { savedBooks: { bookId: bookId } } },
              { new: true }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
        },
    }
}
    
  
  module.exports = resolvers;
  