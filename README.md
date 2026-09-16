# NexCart

NexCart is a full-stack e-commerce application built to practice and demonstrate backend development, relational database design, authentication, authorization, API development, testing, and CI.

The project consists of a TypeScript/Express backend and a Next.js frontend.

> **Project Status:** The backend is the primary completed part of the project. The Next.js frontend is functional but **not fully complete or production-ready** and was mainly built to provide a basic interface for interacting with the API.

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Password hashing with Argon2
* Protected routes
* Role-based authorization
* `USER` and `ADMIN` roles

### Products

* Create, read, update, and delete products
* Product categories
* Product stock management
* Product images
* Available-products endpoint
* Product price and description
* Admin-only product management

### Categories

* Create, read, update, and delete categories
* Admin-only category management
* Products associated with categories

### Shopping Cart

* One cart per user
* Add products to cart
* Update item quantities
* Remove cart items
* Stock validation
* Cart ownership protection

### Orders

* Checkout cart into an order
* Order items preserve the purchase price
* Order totals
* Order history
* Admin order management
* Order status management

Supported order statuses:

* `PENDING`
* `PROCESSING`
* `SHIPPED`
* `DELIVERED`
* `CANCELLED`

### Reviews

* Users can review products
* Rating and optional comments
* One review per user per product
* Update reviews
* Delete reviews

### Validation & Error Handling

* Request validation with Zod
* Centralized application errors
* Authentication and authorization middleware
* Resource ownership checks
* Prisma error handling

### API Documentation

The backend includes Swagger UI for API documentation.

## Tech Stack

### Backend

* Node.js
* TypeScript
* Express 5
* Prisma 7
* MySQL
* Zod
* JWT
* Argon2
* Multer
* Swagger UI
* Vitest

### Frontend

* Next.js
* TypeScript
* React

The frontend is currently **functional but incomplete**. It provides the basic UI needed to interact with several parts of the backend, but it does not yet represent a polished or production-ready e-commerce frontend.

### Development & CI

* Git
* GitHub Actions
* npm
* TypeScript compiler
* Prisma migrations

## Project Structure

```text
NexCart/
├── src/
│   ├── config/
│   ├── errors/
│   ├── lib/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── carts/
│   │   ├── categories/
│   │   ├── orders/
│   │   ├── products/
│   │   └── reviews/
│   └── server.ts
│
├── prisma/
│   └── schema.prisma
│
├── frontend/
│   └── Next.js application
│
├── .github/
│   └── workflows/
│
├── package.json
├── tsconfig.json
└── ...
```

The backend follows a modular structure where each major domain has its own routes, controllers, services, and validation schemas.

## Database

NexCart uses MySQL with Prisma ORM.

The main entities are:

```text
User
 ├── Cart
 ├── Orders
 └── Reviews

Category
 └── Products

Product
 ├── CartItems
 ├── OrderItems
 └── Reviews

Cart
 └── CartItems

Order
 └── OrderItems
```

### Main Models

* `User`
* `Cart`
* `CartItem`
* `Product`
* `Category`
* `Order`
* `OrderItem`
* `Review`

The database also uses relational constraints such as unique fields, foreign keys, cascading deletes, and a composite uniqueness constraint for product reviews.

## API Overview

### Authentication

```text
POST /auth/signup
POST /auth/login
```

### Products

```text
GET    /products
GET    /products/available
GET    /products/:id

POST   /products
PATCH  /products/:id
DELETE /products/:id
```

Product creation, updates, and deletion require administrator privileges.

### Categories

```text
GET    /categories
GET    /categories/:id

POST   /categories
PATCH  /categories/:id
DELETE /categories/:id
```

Category management requires administrator privileges.

### Cart

```text
GET    /cart
POST   /cart/items
PATCH  /cart/items/:itemId
DELETE /cart/items/:itemId
```

Cart operations require authentication.

### Orders

```text
POST   /orders/checkout

GET    /orders
GET    /orders/:id

GET    /orders/admin
GET    /orders/admin/:id
PATCH  /orders/admin/:id/status
```

Administrative order endpoints require administrator privileges.

### Reviews

```text
POST   /reviews/products/:id
PATCH  /reviews/products/:id
DELETE /reviews/products/:id
```

Review operations require authentication.

## Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* MySQL
* Git

### Clone the repository

```bash
git clone <repository-url>
cd NexCart
```

### Install backend dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

DB_HOST="localhost"
DB_PORT="3306"
DB_USER="root"
DB_PASSWORD="your-password"
DB_NAME="nexcart"

JWT_SECRET="your-secret"
```

Do not commit your real `.env` file.

### Database Setup

Create the MySQL database, configure the environment variables, then run the Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma client:

```bash
npx prisma generate
```

### Run the Backend

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

## Frontend

The frontend is located in the `frontend/` directory.

```bash
cd frontend
npm install
npm run dev
```

The frontend communicates with the Express API through the configured API URL.

> **Note:** The frontend is currently incomplete and should be considered a functional work-in-progress rather than a finished production frontend. The primary focus of this project was the backend and API.

## Testing

NexCart uses Vitest for backend testing.

Run:

```bash
npm test
```

> The current repository does not yet contain a comprehensive test suite. Vitest is configured and included in the CI workflow, but additional automated tests would be needed for broader coverage.

## CI

NexCart uses GitHub Actions to automatically validate the backend when changes are pushed to `main` or submitted through a pull request.

The CI pipeline performs:

```text
Install dependencies
        ↓
Generate Prisma Client
        ↓
Type check
        ↓
Run tests
        ↓
Build
```

This helps catch compilation, testing, and build problems before changes are merged.

## Development Goals

NexCart was built as a practical backend/full-stack project to develop experience with:

* REST API design
* TypeScript backend development
* Express architecture
* Authentication and authorization
* Relational database design
* Prisma ORM
* MySQL
* Input validation
* Error handling
* File uploads
* Transactions
* Testing
* Next.js frontend development
* GitHub Actions and CI

## Future Improvements

Possible future improvements include:

* Complete the frontend
* Improve frontend UX and styling
* Add more comprehensive automated tests
* Product search and advanced filtering
* Pagination improvements
* Production deployment
* Automated deployment/CD
* Production infrastructure

## License

This project is currently provided without a public license.
