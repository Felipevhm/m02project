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

### File Tree

![image](https://github.com/user-attachments/assets/333e702f-6042-4c02-964b-9516bb9226a4)

### Database schema

<img width="512" alt="tabela_sql" src="https://github.com/user-attachments/assets/f2999795-8b63-45e7-b3c4-948185b36de0">

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
APP_PORT=3000
DB_DIALECT=postgres
DB_HOST=localhost
DB_DATABASE=m02project
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=j438n493n7348n5
```

5. Run migrations to create the database tables:

    ```bash
         npx sequelize db:migrate
    ```

6(optional). Run seeders to populate the database tables:

```bash
npx sequelize db:seed:all
```

7. Ensure your database is running and move to the /src folder before running the system:

    ```bash
    cd /src
    ```

8. Start the server:

    ```bash
    nodemon index.js
    ```

### API Documentation

API documentation is available via Swagger. To access it, start the server and navigate to:

http://localhost:3000/docs

## Features

### Users

- **Registration and Login**: Endpoints for user registration and login.
- **User Information**: Users must provide information such as name, gender, CPF, address, email, password and date of birth.
- **Validation**: Rules to prevent registration of users with the same CPF or email.

### Waste Collection

- **Location Registration**: Users can register waste collection locations, providing name, description, location, geographic coordinates, etc.
- **Google Maps Link**: Generation of a Google Maps link pointing to the registered location.
- **Business Rules**: Specific validations, such as not allowing the deletion of a user who has associated locations and only the users can deal with the routes that belong to them.

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

- Allow users to access registered places by other users, leading to a network of recycling spots.
- Update documentation to improve user experience.
- Update variable names for better comprehension to english speakers.


## Contributions

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For questions and suggestions, please contact via email: fvhmanhaes@gmail.comn
