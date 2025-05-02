# User Manual

# Installation

---

### Prerequisites

- Node.js
- npm
- MongoDB

### Clone the repository

```jsx
git clone https://github.com/owen-newberry/ase-285-hw6.git
```

### Install Dependencies

```jsx
npm intall
```

This will install all of the dependencies in `package.json`, including:

- crypto
- dotenv
- fs
- jest
- mongo
- mongoose

### Set Up Environment Variables

Create a `.env` file in the `src` directory and include the following

```jsx
MONGO_URI=your_mongodb_connection_string
```

# Using the Application

---

To use the application, each module will be accessed by the command line.

## makepassword.js

To make email and hashed password pairs in password.enc.txt, we simply need to execute this code:

```jsx
cd src
node makepassword.js
```

This will create a file password.enc.txt, and also upload the encrypted data to MongoDB.

## passwordjs.js

To verify email and pass word pairs, we need to execute this code:

```jsx
node passwordjs.js password.enc.txt [email] [password]
```

This will return either `true` or `false` if the email and password pair match up.

# Testing

---

We have two tests we can execute to ensure our code is working properly.

## makepassword.test.js

This will ensure that makepassword.js is creating a file and writing to it, and that our database functionality is working. This uses jest to mock our database, so we aren’t in danger of accidentally altering the data.

To run this test, navigate to the root directory:

```jsx
cd ..
npm test
```

## passwordjs.test.js

This test ensures that passwordjs.js is working as intended by executing an acceptance test. To run this, stay in the root directory:

```jsx
npm run acceptance
```