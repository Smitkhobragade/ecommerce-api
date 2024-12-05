import { Router } from "express";
import ProductController from "../controllers/ProductController";

const router = Router();

router.post("/", ProductController.createProduct); 
router.get("/", ProductController.getAllProducts);
router.get("/:id/users", ProductController.getUsersByProduct);
router.get("/:id", ProductController.getProductById); 
router.put("/:id", ProductController.updateProduct); 

export default router;
