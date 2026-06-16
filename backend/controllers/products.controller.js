import { productModel } from "../models/product.model.js"
import { userModel } from "../models/user.model.js"
import { cacheInstance } from "../services/cache.service.js"
import { Imagekitsend } from "../services/storage.service.js"

export const createProductController = async (req, res) => {
    try {

        if (!req.files) {
            return res.status(400).json({ message: "upload image" })
        }

        let { productName, description, brand, stock, category } = req.body

        const price = JSON.parse(req.body.price)
        const specifications = JSON.parse(req.body.specifications)

        if (!productName || !description || !price?.amount || !brand || !category) {
            return res.status(400).json({ message: "all fields require" })
        }

        let imageArr = await Promise.all(
            req.files.map(async (elem) =>
                await Imagekitsend(elem.buffer, elem.originalname)
            )
        )

        const newProduct = await productModel.create({
            productName,
            description,
            brand,
            stock,
            category,
            specifications,
            price,
            images: imageArr.map((elem) => elem.url),
            owner_id: req.user._id
        })

        await userModel.findByIdAndUpdate(req.user._id, {
            $push: { products: newProduct._id }
        })

        // Redis delete  
         await cacheInstance.del("products")

        return res.status(201).json({
            success: true,
            message: "product created",
            products: newProduct
        })

    } catch (error) {
        console.log("error in create product---->", error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
}



export const getAllProductController = async (req, res) => {
    try {

        const pro = await cacheInstance.get("products");

        if (pro) {
            const cacheProduct = JSON.parse(pro);

            return res.status(200).json({
                success: true,
                message: "products fetched from cache",
                products: cacheProduct,
            });
        }

        console.log("cache miss for products");

        const allproduct = await productModel.find();

        if (!allproduct || allproduct.length === 0) {
            return res.status(400).json({
                success: false,
                message: "no product added yet"
            });
        }

        await cacheInstance.set("products", JSON.stringify(allproduct));

        return res.status(200).json({
            success: true,
            message: "All products fetched",
            products: allproduct
        });

    } catch (error) {
        console.log("error in get all product---->", error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        });
    }
};


export const getSingleProductController = async (req, res) => {
    try {

        let { productId } = req.params

        if (!productId) return res.status(400).json({
            message: "product id not found"
        })

        let product = await productModel.findById(productId)

        if (!product) return res.status(404).json({
            message: "product not found"
        })

        return res.status(200).json({
            success: true,
            message: "product fetched",
            product
        })

    } catch (error) {
        console.log("error in get single product---->", error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
}


export const updateProductController = async (req, res) => {
    try {
        let { productId } = req.params

        if (!productId) return res.status(400).json({
            message: "product id not found"
        })

        let { productName, description, amount, currency, brand, stock, caseMaterial,caseDiameter,category } = req.body
        if (!productName || !description || !amount || !brand || !category) return res.status(400).json({
            message: "all fields require"
        })

        const updateProduct = await productModel.findByIdAndUpdate(productId, {
            productName,
            description,
            brand,
            stock,
            specifications:{
                caseMaterial,
                caseDiameter
            },
            price: {
                amount,
                currency,
            }
        }, { new: true, runValidators: true })

// delete redis data 
        await cacheInstance.del("products")

        return res.status(200).json({
            success: true,
            message: "product updated",
            products: updateProduct
        })

    } catch (error) {
        console.log("error in update product---->", error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
}


export const updateSingleValueProductController = async (req, res) => {
    try {

        let { productId } = req.params

        if (!productId) return res.status(400).json({
            message: "product id not found"
        })

        let update = req.body
console.log("update--->",update)

        if (!update) return res.status(400).json({
            message: "At least one field required"
        })

        const singleUpdate = await productModel.findByIdAndUpdate(productId, {
            $set: { products: update }
        }, { new: true, runValidators: true })

// delete redis data 

        await cacheInstance.del("products")


        return res.status(200).json({
            success: true,
            message: "single entity updated",
            product: singleUpdate
        })

    } catch (error) {
        console.log("error in single value update product---->", error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
}


export const deleteProductController = async (req, res) => {

    try {
        let { productId } = req.params

        if (!productId) return res.status(400).json({
            message: "product id not found"
        })

        const deleteProduct = await productModel.findByIdAndDelete(productId)
        if (!deleteProduct) return res.status(404).json({
            message: "unable to delete product"
        })

        const user = await userModel.findById(req.user._id)

        const updateproduct = user.products.filter((elem) => elem !== deleteProduct._id)
        user.products = updateproduct
        await user.save()
// delete redis data 
        await cacheInstance.del("products")


        return res.status(200).json({
            success: true,
            message: "product deleted"
        })
    } catch (error) {
        console.log("error in create product---->", error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })

    }
}