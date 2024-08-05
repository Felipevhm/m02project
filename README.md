# RecycleSpot API ♻️

<img width="960" alt="recycle_spot_api - Copia" src="https://github.com/user-attachments/assets/53ec329b-e8c6-4829-863e-8a5b6f276bd2">

## Description

RecycleSpot API is a system developed to automate actions related to storing information about waste collection locations and users. This system allows management of users and collection locations, ensuring data security and integrity through JWT authentication.

## Technologies 

- **Node.js**: Platform for server development.
- **Express**: Framework for creating routes and middlewares.

- **PostgreSQL**: Relational database.
- **Sequelize**: ORM for database interaction.
- **JWT (JSON Web Token)**: Authentication mechanism.
- **Axios**: HTTP client for making requests.

- **Swagger**: Tool for API documentation.

## Structure

![image](https://github.com/user-attachments/assets/333e702f-6042-4c02-964b-9516bb9226a4)


## Environment Setup

### Prerequisites

- Node.js
- PostgreSQL
- Sequelize CLI

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Felipevhm/m02project/
    ```

2. Navigate to the project directory:

    ```bash
    cd m02project
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Configure environment variables:

    Create a `.env` file in the project root with the following content:

    ```
    DB_HOST=localhost
    DB_USER=your-username
    DB_PASSWORD=your-password
    DB_NAME=database-name
    JWT_SECRET=your-secret-key
    ```

5. Run migrations to create the database tables:

    ```bash
    npx sequelize db:migrate
    ```

6. Start the server:

    ```bash
    npm start
    ```

### API Documentation

API documentation is available via Swagger. To access it, start the server and navigate to:

http://localhost:3000/docs

## Features

### Users

- **Initial Load**: The system loads a list of users already registered in the database.
- **Registration and Login**: Endpoints for user registration and login.
- **User Information**: Users must provide information such as name, gender, CPF, address, email, password, date of birth.
- **Validation**: Rules to prevent registration of users with the same CPF or email.

### Waste Collection

- **Location Registration**: Users can register waste collection locations, providing name, description, location, geographic coordinates, etc.
- **Google Maps Link**: Generation of a Google Maps link pointing to the registered location.
- **Business Rules**: Specific validations, such as not allowing the deletion of a user who has associated locations.

### JWT Authentication

- **Private Routes**: All routes, except login and registration, require authentication via JWT token.

## Implemented Routes

### User

- **POST /login**: User login.
- **POST /user**: Register a new user.

### Collection Locations

- **POST /location**: Register a new collection location.
- **GET /location**: List locations registered by the authenticated user.
- **GET /location/:location_id**: Detailed information about a specific location.
- **PUT /location/:location_id**: Update information about a specific location.
- **DELETE /location/:location_id**: Delete a specific location.
- **GET /location/:location_id/maps**: Google Maps link for the location.

## How to Run Locally

1. Follow the installation and environment setup instructions.
2. Start the server as described above.
3. Access the API documentation to test the endpoints.

## Future Improvements

- Implementation of automated tests.
- User interface enhancements.
- Addition of new features, such as notifications and reports.

## Contributions

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For questions and suggestions, please contact via email: your-email@domain.com
