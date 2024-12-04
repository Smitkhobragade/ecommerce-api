import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Product, Order],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected to Clever Cloud...");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};
