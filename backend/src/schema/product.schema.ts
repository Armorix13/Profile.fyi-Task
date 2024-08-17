import Joi from "joi";

const validateAddProduct = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required(),
    }),
};

const validateUpdateProduct = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        price: Joi.number().optional(),
        image: Joi.string().optional(),
    }),
};

const validateDeleteProduct = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

const validateGetAllProducts = {
    params: Joi.object({
        id: Joi.string().optional(),
    }),

    query: Joi.object({
        page: Joi.number().min(1).default(1).optional(),
        limit: Joi.number().min(1).default(10).optional(),
    }),
};

const productSchema = {
    validateAddProduct,
    validateUpdateProduct,
    validateDeleteProduct,
    validateGetAllProducts,
}
export default productSchema;
