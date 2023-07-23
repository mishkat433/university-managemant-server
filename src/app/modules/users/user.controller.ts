import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";



const createUser: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await userServices.createUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })
    next()
})


export const userController = { createUser };