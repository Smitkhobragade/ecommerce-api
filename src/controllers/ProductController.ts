import { Request, Response } from "express";
import { AppDataSource } from "../utils/database";
import { Product } from "../entities/Product";

const productRepository = AppDataSource.getRepository(Product);

export default class ProductController {
  static async createProduct(req: Request, res: Response): Promise<any> {
    try {
      const { name, category, price, stockQuantity } = req.body;
      const product = new Product(name, category, price, stockQuantity);
      await productRepository.save(product);
      return res.status(201).json(product);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  static async getAllProducts(req: Request, res: Response): Promise<any> {
    try {
      const products = await productRepository.find();
      return res.json(products);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  static async getProductById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const product = await productRepository.findOneBy({ id: parseInt(id) });
      if (!product) return res.status(404).json({ message: "Product not found" });
      return res.json(product);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { name, category, price, stockQuantity } = req.body;

      const product = await productRepository.findOneBy({ id: parseInt(id) });
      if (!product) return res.status(404).json({ message: "Product not found" });

      product.name = name ?? product.name;
      product.category = category ?? product.category;
      product.price = price ?? product.price;
      product.stockQuantity = stockQuantity ?? product.stockQuantity;
      await productRepository.save(product);

      return res.status(200).json(product);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ message: errorMessage });
    }
  }
}
