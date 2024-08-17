//error response and success response function
import { Response } from "express";

// Success response function
export const sendSuccessResponse = (
    res: Response,
    statusCode: number,
    data: any | null,
    message: string = "Request was successful"
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

// Error response function
export const sendErrorResponse = (
    res: Response,
    statusCode: number,
    message: string,
    details: any = null
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        details,
    });
};