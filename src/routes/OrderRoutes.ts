import { Router } from "express";
import OrderController from "../controllers/OrderController";

const router = Router();

router.post("/", OrderController.createOrder); // Create a new order
router.get("/", OrderController.getAllOrders); // Get all orders
router.get("/:id", OrderController.getOrderById); // Get order by ID
router.put("/:id", OrderController.editOrder); // Edit an existing order

export default router;
