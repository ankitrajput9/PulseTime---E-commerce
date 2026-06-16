import express from 'express';
import { addtoCartController, decrementProductController, getcartProductcontroller, incrementProductController, removeProductFromCartController } from '../controllers/cart.controller.js';

const router = express.Router()

router.post("/add/:productId",addtoCartController)
router.get("/",getcartProductcontroller)
router.post("increment/:productId/:cartId",incrementProductController)
router.post("decrement/:productId/:cartId",decrementProductController)
router.delete("/delete/:productId/",removeProductFromCartController)

export default router;