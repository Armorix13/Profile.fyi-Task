import express from "express";
import validateSchema from "../middleware/validate";
import validate from "../schema/product.schema";
import productController from "../controller/product.controller";
import { upload } from "../middleware/upload";
const router = express.Router();


// Multer middleware to upload product
router.post('/upload', upload.single('file'), productController.fileUpload)


// Add new product

router.post("/product", validateSchema(validate.validateAddProduct), productController.addProduct);

// Update product

router.put("/product/:id", validateSchema(validate.validateUpdateProduct), productController.updateProduct);

// Delete product

router.delete("/product/:id", validateSchema(validate.validateDeleteProduct), productController.deleteProduct);

// Get all products

router.get("/product", validateSchema(validate.validateGetAllProducts), productController.getProducts);

// Get product by id

router.get("/product/:id", validateSchema(validate.validateGetAllProducts), productController.getProducts);


export default router;