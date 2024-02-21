



# 35 Inch Software Solutions Test Case Study Description

The task is to create a simple REST API that will allow admin users to create, read, update and delete an user. The users should have a first_name, last_name, email, password, and a role. The API should be able to handle the following requests:

### API Postman Collection
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/6223046-c6ed66af-be30-46b2-b629-41f471a28e88?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D6223046-c6ed66af-be30-46b2-b629-41f471a28e88%26entityType%3Dcollection%26workspaceId%3D8b1d49f7-7de3-40bc-8927-85655cba0f1d)

### Swagger 
[Swagger Api Endpoints Here](http://localhost:3000/api)  You can access the swagger documentation by running the application and navigating to the /api endpoint.

## Dependencies
- Node.js
- Npm
- Docker
- Docker Compose

## Installation
- Clone the repository
- Run `npm install` to install the dependencies
- Run `docker-compose up --build` to start the application

## Running the Application
- Check the application is running by navigating to `http://localhost:3000/api` in your browser
- You can also test the application using Postman by importing the collection from the link above.
- You can also test the application using the Swagger documentation by navigating to `http://localhost:3000/api` in your browser.
- You can also test the application using the following endpoints in Postman or any other API client of your choice.
- JWT Token is required for protected endpoints. You can get the token by registering a user or logging in with an existing user. The token should be passed in the Authorization header as a Bearer token. You can also get the token by logging in with the default user. The default user is an admin user with the following credentials:
  - email: admin@admin.com
  - password: 123456
- If you can't access the application using the default user, you can create a new user with the following credentials:
    - email
    - password
    - first_name
    - last_name
    - role

>**To access protected endpoints, you must create a user with an administrator role. Maybe you need to change the default auth/register endpoint for initial user registration, assign role column and pass parameter '2' within the code.**


### API Endpoints
- Create an user - POST /users (protected)
- Read an user - GET /users/:id (protected)
- Update an user - PATCH /users/:id (protected)
- Delete an user - DELETE /users/:id (protected)
- Get all users - GET /users (protected)
- Authenticate an user - POST /auth/login
- Register an user - POST /auth/register
- Get current user - GET /auth/user (protected)

### User Model
- first_name
- last_name
- email
- password
- role

### User Roles
- User (1)
- Admin (2)



### User Authentication
- The API should be able to authenticate users using email and password.
- The API should be able to return a JWT token that will be used to authenticate the user in the future.

### User Authorization
- The API should be able to authorize users based on their role.
- The API should be able to restrict access to certain endpoints based on the user's role.

### User Password
- The API should be able to hash the user's password before saving it to the database.
- The API should be able to compare the user's password with the hashed password in the database.
- The API using bcrypt for hashing the password.

### User Validation
- The API should be able to validate the user's input before saving it to the database.
- The API should be able to return an error message if the user's input is invalid.
- The API using joi for validation.

### Error Handling
- The API should be able to return an error message if something goes wrong.
- The API should be able to return an error message if the user's input is invalid.
- The API should be able to return an error message if the user is not authorized to access a certain endpoint.

### User Database
- The API should be able to save the user's data to a database.
- The API should be able to read the user's data from a database.
- The API using PostgreSql with TypeORM for database.