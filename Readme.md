# E-Commerce API

This is a simple E-commerce API built with **Node.js**, **Express**, **TypeORM**, and **MySQL**. The API supports the basic functionalities of managing users, products, and orders for a small e-commerce platform.

## Features

- **User Management:** Create, update, and fetch user data.
- **Product Management:** Create, update, and fetch product details.
- **Order Management:** Create, update, and fetch orders, including adjusting stock quantity based on orders.
- **Additional Features:**
  - Get orders placed in the last 7 days.
  - Get users who bought a specific product.
  - Get the total stock quantity of all products combined.

## Requirements

- Node.js
- MySQL (or any compatible database, with TypeORM configured)
- Postman (for testing the API endpoints)

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure the database

Make sure to configure your database connection in the `src/utils/database.ts` file. Replace the database credentials with your own MySQL database configuration.

### Step 4: Run the application

```bash
npm start
```

This will start the server on port `3000` (or a port specified in your `.env` file).

### Step 5: Testing the API

You can use **Postman** or any other API testing tool to test the API endpoints.

---

## API Endpoints

### **User Routes**

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user by ID
- `PUT /users/:id` - Update a specific user by ID

### **Product Routes**

- `POST /products` - Create a new product
- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product by ID
- `PUT /products/:id` - Update a specific product by ID
- `GET /products/total-stock` - Get the total stock quantity for all products combined

### **Order Routes**

- `POST /orders` - Create a new order
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get a specific order by ID
- `PUT /orders/:id` - Update a specific order by ID
- `GET /orders/last-7-days` - Get orders placed in the last 7 days
- `GET /orders/users/:productId` - Get users who bought a specific product

---

## File Structure

Here’s the general file structure of the project:

```
ecommerce-api/
│
├── src/
│   ├── app.ts                  # Main application file (Server entry point)
│   ├── controllers/            # Controllers for handling API logic
│   │   ├── UserController.ts   # User-related logic
│   │   ├── ProductController.ts # Product-related logic
│   │   └── OrderController.ts  # Order-related logic
│   ├── entities/               # TypeORM entity models (User, Product, Order)
│   │   ├── User.ts             # User entity
│   │   ├── Product.ts          # Product entity
│   │   └── Order.ts            # Order entity
│   ├── routes/                 # Route definitions for API endpoints
│   │   ├── UserRoutes.ts       # Routes for User-related endpoints
│   │   ├── ProductRoutes.ts    # Routes for Product-related endpoints
│   │   └── OrderRoutes.ts      # Routes for Order-related endpoints
│   ├── utils/                  # Utility functions and database connection
│   │   └── database.ts         # TypeORM database connection setup
│   └── config/                 # Configuration files (for environment variables, etc.)
│       └── .env                # Environment variables (e.g., DB connection)
│
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── .env                        # Environment file for secrets/configuration
└── README.md                   # This README file
```

---

## Configuration

Make sure to configure your `.env` file to include the necessary environment variables:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=ecommerce_db
```

### Running the application

Once everything is configured, run the application with:

```bash
npm run dev
```

This will start the server, and you can access it at `http://localhost:3000`.

