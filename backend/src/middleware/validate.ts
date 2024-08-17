import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendErrorResponse } from "../utils/response";

interface ValidationSchemas {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}

const validateSchema = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationErrors: string[] = [];

    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, { abortEarly: false });
      if (error) {
        validationErrors.push(...error.details.map((detail) => detail.message));
      }
    }

    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, {
        abortEarly: false,
      });
      if (error) {
        validationErrors.push(...error.details.map((detail) => detail.message));
      }
    }

    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, {
        abortEarly: false,
      });
      if (error) {
        validationErrors.push(...error.details.map((detail) => detail.message));
      }
    }
    
    if (validationErrors.length > 0) {
      return sendErrorResponse(res, 400, "Validation error", validationErrors);
    }
    next();
  };
};

export default validateSchema;
