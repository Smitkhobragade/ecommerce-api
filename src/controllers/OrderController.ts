import { Request, Response } from "express";
import { AppDataSource } from "../utils/database";
import { Order } from "../entities/Order";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Between } from "typeorm";

const orderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);
const productRepository = AppDataSource.getRepository(Product);

export default class OrderController {
  static async createOrder(req: Request, res: Response): Promise<any> {
    try {
      const { userId, productId, orderDate, quantity } = req.body;

      const user = await userRepository.findOneBy({ id: userId });
      if (!user) return res.status(404).json({ message: "User not found" });

      const product = await productRepository.findOneBy({ id: productId });
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (product.stockQuantity < quantity) {
        return res.status(400).json({
          message: `Insufficient stock. Only ${product.stockQuantity} items available.`,
        });
      }

      product.stockQuantity -= quantity;
      await productRepository.save(product);

      const order = new Order(user, product, orderDate, quantity);
      await orderRepository.save(order);

      return res.status(201).json(order);
    } catch (error) {
      return res
        .status(500)
        .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  }

  static async getAllOrders(req: Request, res: Response): Promise<any> {
    try {
      const orders = await orderRepository.find({ relations: ["user", "product"] });
      return res.json(orders);
    } catch (error) {
      return res
        .status(500)
        .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  }

  static async getOrderById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const order = await orderRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["user", "product"],
      });

      if (!order) return res.status(404).json({ message: "Order not found" });
      return res.json(order);
    } catch (error) {
      return res
        .status(500)
        .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  }

  static async editOrder(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { productId, userId, orderDate, quantity } = req.body;
  
      const order = await orderRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["user", "product"],
      });
  
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      if (productId && productId !== order.product.id) {
        const newProduct = await productRepository.findOneBy({ id: productId });
        if (!newProduct) return res.status(404).json({ message: "New product not found" });
  
        order.product.stockQuantity += order.quantity;
        await productRepository.save(order.product);
  
        if (newProduct.stockQuantity < quantity) {
          return res.status(400).json({
            message: `Insufficient stock in new product. Only ${newProduct.stockQuantity} items available.`,
          });
        }
  
        newProduct.stockQuantity -= quantity;
        await productRepository.save(newProduct);
  
        order.product = newProduct;
      } else if (quantity && quantity !== order.quantity) {
        const currentProduct = order.product;
  
        currentProduct.stockQuantity += order.quantity;
  
        if (currentProduct.stockQuantity < quantity) {
          return res.status(400).json({
            message: `Insufficient stock for product. Only ${currentProduct.stockQuantity} items available.`,
          });
        }
  
        currentProduct.stockQuantity -= quantity;
        await productRepository.save(currentProduct);
  
        order.quantity = quantity;
      }
  
      if (userId && userId !== order.user.id) {
        const newUser = await userRepository.findOneBy({ id: userId });
        if (!newUser) return res.status(404).json({ message: "New user not found" });
        order.user = newUser;
      }
  
      order.orderDate = orderDate || order.orderDate;
  
      await orderRepository.save(order);
  
      return res.json(order);
    } catch (error) {
      return res
        .status(500)
        .json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  }
  
  static async getOrdersLast7Days(req: Request, res: Response): Promise<any> {
    console.log("getOrdersLast7Days function is called");
    try {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7); // Subtract 7 days from today's date
      
      console.log("Today: ", today);
      console.log("7 Days Ago: ", sevenDaysAgo);
  
      if (isNaN(today.getTime()) || isNaN(sevenDaysAgo.getTime())) {
        return res.status(400).json({ message: "Invalid date values" });
      }
  
      const orders = await orderRepository.find({
        where: {
          orderDate: Between(sevenDaysAgo, today),
        },
        relations: ["user", "product"],
      });
  
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
  
}

