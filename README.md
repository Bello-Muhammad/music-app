# MusicApp

MusicApp is a system designed to help artists manage their events, availability, and bookings. It simplifies the process for customers to book events with artists and make payments based on the artist's pricing. The platform ensures a seamless experience for both artists and customers while maintaining robust security and role-based access control.

## Key Features

- **Security**: The system is built with strong security measures to protect user data and transactions.
- **Role-Based Authorization**: Different roles (e.g., Admin, Artist, Customer) have specific permissions to ensure proper access control.
- **Payment System**: Integrated payment gateway for secure and efficient transactions.
- **Booking Management**: Streamlined process for customers to book events with artists and manage bookings.
- **Artist Profile Management**: Artists can create and manage their profiles, including availability, pricing, and event details.

## Available Endpoints

### 1. **Auth**
    - Handles user authentication and authorization.
    - Endpoints include:
      - `POST api/v1/auth/register` - Register a new user.
      - `POST api/v1/auth/login` - Log in a user.

### 2. **User**
    - Manages user-related operations for artists, admins, and customers.
    - Artist Endpoints include:
      - GET: api/v1/users/artists
      - GET: api/v1/users/artist/:artistId
      - PATCH: pi/v1/users/artist/:artistId
      - DELETE: api/v1/users/artist/:artistId

    - Other user Endpoints include:
        - GET: api/v1/users
        - GET: api/v1/users/:userId
        - PATCH: api/v1/users/:userId 
      - `DELETE: api/v1/users/:userId

### 3. **Event**
    - Handles artist event
        POST: api/v1/events/create-event
        GET: api/v1/events/
        GET: api/v1/events/:eventId
        GET: api/v1/events/artist/:artistId
        PATCH: api/v1/events/:eventId
        DELETE: api/v1/events/:eventId

### 4. **Booking**
    - Handles event bookings and related operations.
    - Endpoints include:
      POST: api/v1/bookings/
      GET: api/v1/bookings/
      GET: api/v1/bookings/:bookingId
      GET: api/v1/bookings/user/:userId
      POST: api/v1/bookings/:bookingId/payment
      GET: api/v1/bookings/:bookingId/payment/verify
      GET: api/v1/bookings/user/transaction-history
      PATCH: api/v1/bookings/:bookingId

MusicApp is designed to provide a user-friendly and secure platform for artists and customers to connect and collaborate effortlessly.

## Tech use:
 - Expressjs
 - and mongodb as database

## Project was built on;
    - node v18.x.x
    - and npm v20.x.x

