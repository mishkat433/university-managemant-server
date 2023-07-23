import { NextFunction, Request, RequestHandler, Response } from "express";
import { academicSemesterServices } from "./academicSemester.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAcademicSemester } from "./academicSemester.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constance/pagination";
import { academicSemesterFilterableFields } from "./academicSemesterConstants";



const createSemester: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { ...academicSemesterData } = req.body
    const result = await academicSemesterServices.createSemester(academicSemesterData)

    sendResponse<IAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'academicSemester created successfully',
        data: result
    })
    next()
})


const getAllSemester: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const filters = pick(req.query, academicSemesterFilterableFields)

    const paginationOptions = pick(req.query, paginationField)


    const result = await academicSemesterServices.getAllSemester(paginationOptions, filters)

    sendResponse<IAcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester retrieved successfully',
        meta: result.meta,
        data: result.data
    })
    next()

})

const getSingleSemester: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await academicSemesterServices.getSingleSemester(id)
    sendResponse<IAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester retrieved successfully',
        data: result
    })
    next()
})



export const academicSemesterController = {
    createSemester,
    getAllSemester,
    getSingleSemester
};