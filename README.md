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
   git clone https://github.com/your-username/twitter-clone..git
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

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Max Base
