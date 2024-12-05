import { Request, Response } from "express";
import { AppDataSource } from "../utils/database";
import { User } from "../entities/User";
import { Between } from "typeorm";
import { Order } from "../entities/Order";

const userRepository = AppDataSource.getRepository(User);
const orderRepository = AppDataSource.getRepository(Order);

export default class UserController {
  static async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { name, email, phone } = req.body;
      const user = new User(name, email, phone);
      await userRepository.save(user);
      return res.status(201).json(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<any> {
    try {
      const users = await userRepository.find();
      return res.json(users);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await userRepository.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      const user = await userRepository.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "User not found" });

      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.phone = phone ?? user.phone;

      await userRepository.save(user);

      return res.status(200).json(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  static async getOrdersByUser(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      console.log(req.params)

      const parsedUserId = parseInt(id);
      if (isNaN(parsedUserId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const orders = await orderRepository.find({
        where: {
          user: { id: parsedUserId },
        },
        relations: ["user", "product"],
      });

      if (!orders.length) {
        return res.status(404).json({ message: "No orders found for this user" });
      }

      return res.json(orders);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }


}
