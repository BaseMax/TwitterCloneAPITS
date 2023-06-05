# Twitter Clone API TS

This is a Twitter clone project built with NestJS and TypeScript.

## Description

The Twitter Clone is a web application that aims to replicate some of the core features and functionality of the popular social media platform, Twitter. It provides a platform for users to post tweets, follow other users, like and comment on tweets, and more.

The project is built with NestJS, a progressive Node.js framework for building efficient, scalable, and maintainable server-side applications. NestJS leverages TypeScript, providing strong typing and enhanced tooling for better developer experience.

## Features

- User registration and authentication
- User profiles with bio and profile picture
- Posting tweets with text and media attachments
- Following and unfollowing other users
- Timeline and feed for viewing tweets from followed users
- Like and comment on tweets
- Search functionality for finding users and tweets

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BaseMax/TwitterCloneAPITS.git
   ```

2. Navigate to the project directory:

  ```bash
  cd twitter-clone
  ```

3. Install the dependencies:

  ```bash
  npm install
  ```

4. Create a `.env` file in the root directory and provide the necessary configuration variables. You can use the .env.example file as a template.

5. Set up the database by running the migrations:

  ```bash
  npm run migration:run
  ```

## Usage

Start the application:

```bash
npm run start:dev
```

Access the application in your browser at http://localhost:3000.

Use the provided API endpoints to interact with the Twitter Clone, or explore the application's user interface.

## API Endpoints

Here's an example of a list of API routes that could be included in a Twitter clone project:

- `POST /api/auth/register`: Register a new user account.
- `POST /api/auth/login`: Log in an existing user.
- `GET /api/auth/logout`: Log out the currently authenticated user.
- `GET /api/users`: Get a list of all users.
- `GET /api/users/:id`: Get the details of a specific user by ID.
- `PUT /api/users/:id`: Update the profile information of a specific user by ID.
- `GET /api/tweets`: Get a list of all tweets.
- `GET /api/tweets/:id`: Get the details of a specific tweet by ID.
- `POST /api/tweets`: Create a new tweet.
- `PUT /api/tweets/:id`: Update the content of a specific tweet by ID.
- `DELETE /api/tweets/:id`: Delete a specific tweet by ID.
- `POST /api/tweets/:id/like`: Like a specific tweet by ID.
- `POST /api/tweets/:id/comments`: Add a comment to a specific tweet by ID.
- `GET /api/tweets/:id/comments`: Get all comments for a specific tweet by ID.
- `POST /api/follow/:id`: Follow a specific user by ID.
- `POST /api/unfollow/:id`: Unfollow a specific user by ID.
- `GET /api/feed`: Get the user's feed (tweets from followed users).
- `GET /api/search/users`: Search for users based on a query.
- `GET /api/search/tweets`: Search for tweets based on a query.

## API Examples

Here are some examples of how the API routes could be used in a Twitter clone project:

### `POST /api/auth/register`: Register a new user account.

Request Body:

```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "id": "1",
  "username": "john_doe",
  "email": "john.doe@example.com"
}
```

### `POST /api/auth/login`: Log in an existing user.

Request Body:

```json
{
  "username": "john_doe",
  "password": "password123"
}
```

Response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "username": "john_doe",
    "email": "john.doe@example.com"
  }
}
```

### `GET /api/auth/logout`: Log out the currently authenticated user.

Response:

```json
{
  "message": "Logged out successfully"
}
```

### `GET /api/users`: Get a list of all users.

Response:

```json
[
  {
    "id": "1",
    "username": "john_doe",
    "email": "john.doe@example.com"
  },
  {
    "id": "2",
    "username": "jane_smith",
    "email": "jane.smith@example.com"
  }
]
```

### `GET /api/users/:id`: Get the details of a specific user by ID.

Response:

```json
{
  "id": "1",
  "username": "john_doe",
  "email": "john.doe@example.com"
}
```

### `PUT /api/users/:id`: Update the profile information of a specific user by ID.

Request Body:

```json
{
  "username": "john_doe_updated",
  "bio": "Software Developer"
}
```

Response:

```json
{
  "id": "1",
  "username": "john_doe_updated",
  "email": "john.doe@example.com",
  "bio": "Software Developer"
}
```

### `GET /api/tweets`: Get a list of all tweets.

Response:

```json
[
  {
    "id": "1",
    "author": {
      "id": "1",
      "username": "john_doe"
    },
    "content": "Hello, Twitter!"
  },
  {
    "id": "2",
    "author": {
      "id": "2",
      "username": "jane_smith"
    },
    "content": "Tweeting away!"
  }
]
```

### `GET /api/tweets/:id`: Get the details of a specific tweet by ID.

Response:

```json
{
  "id": "1",
  "author": {
    "id": "1",
    "username": "john_doe"
  },
  "content": "Hello, Twitter!"
}
```

### `POST /api/tweets`: Create a new tweet.

Request Body:

```json
{
  "content": "My first tweet!"
}
```

Response:

```json
{
  "id": "3",
  "author": {
    "id": "1",
    "username": "john_doe"
  },
  "content": "My first tweet!"
}
```

### `PUT /api/tweets/:id`: Update the content of a specific tweet by ID.

Request Body:

```json
{
  "content": "Updated tweet content"
}
```

Response:

```json
{
  "id": "1",
  "author": {
    "id": "1",
    "username": "john_doe"
  },
  "content": "Updated tweet content"
}
```

### `DELETE /api/tweets/:id`: Delete a specific tweet by ID.

Response:

```json
{
  "message": "Tweet deleted successfully"
}
```

### `POST /api/tweets/:id/like`: Like a specific tweet by ID.

Response:

```json
{
  "message": "Tweet liked successfully"
}
```

### `POST /api/tweets/:id/comments`: Add a comment to a specific tweet by ID.

Request Body:

```json
{
  "content": "Great tweet!"
}
```

Response:

```json
{
  "id": "1",
  "tweetId": "1",
  "author": {
    "id": "2",
    "username": "jane_smith"
  },
  "content": "Great tweet!"
}
```

### `GET /api/tweets/:id/comments`: Get all comments for a specific tweet by ID.

Response:

```json
[
  {
    "id": "1",
    "tweetId": "1",
    "author": {
      "id": "2",
      "username": "jane_smith"
    },
    "content": "Great tweet!"
  },
  {
    "id": "2",
    "tweetId": "1",
    "author": {
      "id": "1",
      "username": "john_doe"
    },
    "content": "Thanks!"
  }
]
```

### `POST /api/follow/:id`: Follow a specific user by ID.

Response:

```json
{
  "message": "You are now following john_doe"
}
```

### `POST /api/unfollow/:id`: Unfollow a specific user by ID.

Response:

```json
{
  "message": "You have unfollowed john_doe"
}
```

### `GET /api/feed`: Get the user's feed (tweets from followed users).

Response:

```json
[
  {
    "id": "2",
    "author": {
      "id": "2",
      "username": "jane_smith"
    },
    "content": "Tweeting away!"
  },
  {
    "id": "1",
    "author": {
      "id": "1",
      "username": "john_doe"
    },
    "content": "Hello, Twitter!"
  }
]
```

### `GET /api/search/users`: Search for users based on a query.

Query Parameters:

```
q=john
```

Response:

```json
[
  {
    "id": "1",
    "username": "john_doe"
  }
]
```

### `GET /api/search/tweets`: Search for tweets based on a query.

Query Parameters:

```
q=twitter
```

Response:

```json
[
  {
    "id": "1",
    "author": {
      "id": "1",
      "username": "john_doe"
    },
    "content": "Hello, Twitter!"
  }
]
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Max Base
