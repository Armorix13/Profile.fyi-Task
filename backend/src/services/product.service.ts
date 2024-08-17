import Product from "../model/product.model";
import { Request } from "express";

const addProduct = async (req: Request) => {
    try {
        const product = await Product.create(req.body);
        await product.save();
        return product;
    } catch (error: any) {
        throw new Error(`Error adding product: ${error.message}`);
    }
};

const updateProduct = async (req: Request) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) throw new Error('Product not found');
        return product;
    } catch (error: any) {
        throw new Error(`Error updating product: ${error.message}`);
    }
};

const deleteProduct = async (req: Request) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!product) throw new Error('Product not found');
        return product;
    } catch (error: any) {
        throw new Error(`Error deleting product: ${error.message}`);
    }
};

const getProduct = async (req: Request) => {
    try {
        const { id } = req.params;
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;

        if (id) {
            const products = await Product.findById(id);
            if (!products) throw new Error('Product not found');
            return { message: 'Product found', products };
        }

        const totalProduct = await Product.countDocuments({ isDeleted: false });
        const totalPages = Math.ceil(totalProduct / limit);
        const products = await Product.find({ isDeleted: false })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const message = products.length > 0 ? 'Products found' : 'No products found';
        return { message, products, currentPage: page, totalPages, totalProduct };
    } catch (error: any) {
        throw new Error(`Error retrieving products: ${error.message}`);
    }
};

const productService = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
}
export default productService;