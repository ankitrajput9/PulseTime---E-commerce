import express from "express"
import {
    createProductController,
    deleteProductController,
    getAllProductController,
    getSingleProductController,
    updateProductController,
    updateSingleValueProductController
} from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../services/multer.service.js";


const router = express.Router()

router.post("/create", authMiddleware,upload.array("images",5), createProductController)
router.get("/",getAllProductController)
router.get("/:productId", getSingleProductController)
router.put("/update/:productId", authMiddleware, updateProductController)
router.patch("/update-single/:productId", authMiddleware, updateSingleValueProductController)
router.delete("/delete/:productId", authMiddleware, deleteProductController)

export default router;