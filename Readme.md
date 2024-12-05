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
- MySQL 
- Postman 

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

Certainly! Based on the provided code, here's the updated section of your README file that reflects the correct API routes for the application:

---

## API Endpoints

### **User Routes**

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user by ID
- `GET /users/:id/orders` - Get all orders placed by a specific user
- `PUT /users/:id` - Update a specific user by ID

### **Product Routes**

- `POST /products` - Create a new product
- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product by ID
- `PUT /products/:id` - Update a specific product by ID
- `GET /products/:id/users` - Get users who bought a specific product
- `GET /products/total-stock` - Get the total stock quantity for all products combined

### **Order Routes**

- `POST /orders` - Create a new order
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get a specific order by ID
- `GET /orders/last7days` - Get orders placed in the last 7 days
- `PUT /orders/:id` - Update a specific order by ID

---

## File Structure

Here’s the general file structure of the project:

```
ecommerce-api/
│
├── src/
│   ├── app.ts                  
│   ├── controllers/            
│   │   ├── UserController.ts   
│   │   ├── ProductController.ts 
│   │   └── OrderController.ts 
│   ├── entities/               
│   │   ├── User.ts             
│   │   ├── Product.ts          
│   │   └── Order.ts            
│   ├── routes/                 
│   │   ├── UserRoutes.ts       
│   │   ├── ProductRoutes.ts    
│   │   └── OrderRoutes.ts      
│   ├── utils/                  
│   │   └── database.ts         
│   └── config/                
│       └── .env                
│
├── package.json                
├── tsconfig.json               
├── .env                        
└── README.md                   
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

