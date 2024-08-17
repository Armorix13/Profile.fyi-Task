import { model, Schema, Document, Types, ObjectId } from "mongoose";

interface IProduct extends Document {
    name: String,
    image: String,
    price: String,
    description: String,
    isDeleted: boolean
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Product = model<IProduct>('product', productSchema);
export default Product;