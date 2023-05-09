import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//Save book
export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!) {
    saveBook(userId: $userId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
      }
    }
  }
`;

//Remove book
export const DELETE_BOOK = gql`
  mutation deleteBook($userId: ID!) {
    deleteBook(userId: $userId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
      }
    }
  }
`;