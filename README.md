# User API

This is a simple User API built with Node.js, Express, and MongoDB. It allows you to perform CRUD operations on users.

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally

## Setup

### 1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/user-api.git
   cd user-api
```

### 2. Install dependencies:

```bash
npm install
```
### 3. Create a .env file with the following environment variables:

```bash
PORT= 8000
MONGODB_CONNECTION_URL=your_mongodb_connection_url
JWT_SECRET = yoursecret
```
### 4. Start the server 
```bash
npm start
```
## End Points

### 1. Create a new user
- URL: `/api/v1/auth/signup`
- Method: `POST`
- Request Body:
```bash
{
    "firstName": "tope",
    "lastName": "Shuaib",
    "username": "tope20",
    "email":"tope20@gmail.com",
    "password":"tope20@"
}
```
- Response:
 ```bash
  "success": true,
    "newUser": {
        "firstName": "tope",
        "lastName": "Shuaib",
        "username": "tope20",
        "email": "tope20@gmail.com",
        "password": "$2b$12$NklPpaUb9rFe4dGcDJJ65unVv8kt5pqknG6CvCJE/0aJwyUodt8mq",
        "_id": "668ce08dd9acb4ded239cc7b",
        "createdAt": "2024-07-09T07:02:37.204Z",
        "updatedAt": "2024-07-09T07:02:37.204Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhjZTA4ZGQ5YWNiNGRlZDIzOWNjN2IiLCJpYXQiOjE3MjA1MDg1NTcsImV4cCI6MTcyMDU5NDk1N30.dA7WPdo5T7dXKAUnW5tWa37JOCaY64Lln0QtbtUAG9E"
}
```

### 2. Get all users
- URL: `/api/v1/auth/users`
- Method: `GET`
- Response:
```bash
"success": true,
    "message": "Users fetched successfully",
    "users": [
        {
            "_id": "668ce00ca975266772d99eb5",
            "firstName": "Ganiyu",
            "lastName": "Shuaib",
            "username": "Ganiyu20",
            "email": "ganiyu20@gmail.com",
            "createdAt": "2024-07-09T07:00:29.004Z",
            "updatedAt": "2024-07-09T07:00:29.004Z",
            "__v": 0
        },
        {
            "_id": "668ce03da975266772d99eb8",
            "firstName": "Temitope",
            "lastName": "Shuaib",
            "username": "Temitope20",
            "email": "temitope20@gmail.com",
            "createdAt": "2024-07-09T07:01:17.806Z",
            "updatedAt": "2024-07-09T07:01:17.806Z",
            "__v": 0
        },
        {
            "_id": "668ce08dd9acb4ded239cc7b",
            "firstName": "tope",
            "lastName": "Shuaib",
            "username": "tope20",
            "email": "tope20@gmail.com",
            "createdAt": "2024-07-09T07:02:37.204Z",
            "updatedAt": "2024-07-09T07:02:37.204Z",
            "__v": 0
        }
    ]
}
```
### 3. Get a single user by ID
- URL: `/api/v1/auth/user/:id`
- Method: `GET`
- Response:
```bash
{
    "success": true,
    "message": "User retrieved successfully",
    "user": {
        "_id": "668cddd9a04f81e4103d3a66",
        "firstName": "Ganiyat",
        "lastName": "Shuaib",
        "username": "Ganiyat20",
        "email": "ganiyat20@gmail.com",
        "password": "$2b$12$GS1.mkjlYhhSwmGL26ke3OUnkbJ9nhE6NZRarjllhiRz2wv4DcUj.",
        "createdAt": "2024-07-09T06:51:05.334Z",
        "updatedAt": "2024-07-09T06:51:05.334Z",
        "__v": 0
    }
}
```
### 4. Update a user by ID
- URL: `/api/auth/user/update`
- Method: `PUT`
- Only a loggedIn user can update
- Request Body:
  ```bash
  {
    "firstName": "Ganiyatu",
    "lastName": "Shuaib",
    "username": "Ganiyatu20",
    "email": "ganiyatu20@gmail.com",
    "password": "$2b$12$GS1.mkjlYhhSwmGL26ke3OUnkbJ9nhE6NZRarjllhiRz2wv4DcUj.",
    "_id": "668cddd9a04f81e4103d3a66"
}
```
- Response:
```bash
{
    "success": true,
    "message": "User profile updated successfully",
    "user": {
        "firstName": "Ganiyatu",
        "lastName": "Shuaib",
        "username": "Ganiyatu20",
        "email": "ganiyatu20@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjhjZGRkOWEwNGY4MWU0MTAzZDNhNjYiLCJpYXQiOjE3MjA1MTc2MDMsImV4cCI6MTcyMDYwNDAwM30.fkERVzOJL99UN5ZfJ0Z5RXavdTR5g6wsAFCmR33LemM"
    }
}
```
### 5. Delete a user by ID
URL: `/api/auth/user/:id`
Method: `DELETE`
- Response:
  ```bash
  {
    "success": true,
    "message": "User deleted successfully",
    "deletedUser": {
        "acknowledged": true,
        "deletedCount": 1
    }}
```
# Database Configuration


``sh
import mongoose from 'mongoose'
//It will connect to the url 
export const connectDb = (url) => {
    // connecting to mongoose
    mongoose.connect(url).then(()=> console.log("DB connected successfully")).catch((err)=>console.log("Error connecting to MongoDB",err.message));
};
```

