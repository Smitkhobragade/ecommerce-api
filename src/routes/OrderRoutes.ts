import { Router } from "express";
import OrderController from "../controllers/OrderController";

const router = Router();

router.post("/", OrderController.createOrder); 
router.get("/", OrderController.getAllOrders); 
router.get("/last7days", OrderController.getOrdersLast7Days);
router.get("/:id", OrderController.getOrderById); 
router.put("/:id", OrderController.editOrder); 
export default router;
