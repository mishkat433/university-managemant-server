/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { IAcademicFaculty } from "./academicFaculty.interface"
import { academicFacultyService } from "./academicFaculty.services"
import { NextFunction, Request, RequestHandler, Response } from "express"
import pick from "../../../shared/pick"
import { academicFacultyFilterableFields } from "./academicFacultyConstance"
import { paginationField } from "../../../constance/pagination"


const createFaculty: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { ...academicFacultyData } = req.body

    const result = await academicFacultyService.createFaculty(academicFacultyData)

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    })
})


const getAllFaculty: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, academicFacultyFilterableFields)

    const paginationOptions = pick(req.query, paginationField)

    const result = await academicFacultyService.getAllFaculty(paginationOptions, filters)

    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty fetched successfully',
        meta: result.meta,
        data: result.data
    })
})


const getSingleFaculty: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await academicFacultyService.getSingleFaculty(id)

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty retrieved successfully',
        data: result === null ? [] : result
    })
})


const updateFaculty: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id
    const updateData = req.body

    const result = await academicFacultyService.updateFaculty(id, updateData)

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty update successfully',
        data: result === null ? [] : result
    })
})




const deleteFaculty: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await academicFacultyService.deleteFaculty(id)

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty delete successfully',
        data: result === null ? [] : result
    })

})

export const academicFacultyController = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty
}