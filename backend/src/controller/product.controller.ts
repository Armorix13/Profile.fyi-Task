import { NextFunction, Request, Response } from "express";
import productService from "../services/product.service";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";


//craete function to upload file give url 
const fileUpload = (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Construct the file URL
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        sendSuccessResponse(res, 201, "File uploaded successfully", fileUrl)
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 400, "error in upload file", error)
    }
}

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.addProduct(req);
        sendSuccessResponse(
            res,
            201,
            data,
            "Product created successfully"
        )
    } catch (error) {
        next(error);
    }
}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { message, products, currentPage, totalPages, totalProduct } = await productService.getProduct(req);
        sendSuccessResponse(
            res,
            200,
            {
                message,
                products,
                currentPage,
                totalPages,
                totalProduct,
            },
            "Products fetched successfully"
        )
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.deleteProduct(req);
        sendSuccessResponse(
            res,
            200,
            data,
            "Product deleted successfully"
        )
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.updateProduct(req);
        sendSuccessResponse(
            res,
            200,
            data,
            "Product updated successfully"
        )
    } catch (error) {
        next(error);
    }
}

const productController = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    fileUpload
}


export default productController;