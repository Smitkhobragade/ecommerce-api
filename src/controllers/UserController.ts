import { Request, Response } from "express";
import { AppDataSource } from "../utils/database";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

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

      // Find the user
      const user = await userRepository.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "User not found" });

      // Update user details
      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.phone = phone ?? user.phone;

      // Save updated user
      await userRepository.save(user);

      return res.status(200).json(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  
}
