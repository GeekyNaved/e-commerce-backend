import { Router } from "express";
import cartController from "../controllers/cartController.js"

const router = Router();

router.get('/', cartController.getAllCartItems);
router.post('/', cartController.addToCart);
router.patch('/:id', cartController.updateCartItem);
router.delete('/:id', cartController.deleteItem);

export default router;