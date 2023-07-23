import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { IAcademicFaculty, IAcademicFacultyFilters } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { academicFacultySearchableFields } from "./academicFacultyConstance";
import { paginationHelper } from "../../../helper/paginationHepler";
import { SortOrder } from "mongoose";
import paginationNextPrevHelper from "../../../helper/paginationNextPrevHelper";
import { IGenericResponse } from "../../../globalInterfaces/common";


const createFaculty = async (payload: IAcademicFaculty): Promise<IAcademicFaculty | null> => {

    const result = await AcademicFaculty.create(payload)

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "academicFaculty create failed")
    }

    return result

}

const getAllFaculty = async (paginationOptions: IPaginationOptions, filters: IAcademicFacultyFilters): Promise<IGenericResponse<IAcademicFaculty[]>> => {

    const { searchTerm, ...filtersData } = filters


    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            $or: academicFacultySearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }

    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }


    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(paginationOptions)

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}

    const result = await AcademicFaculty.find(whereCondition).sort(sortConditions).skip(skip).limit(limit)

    const count = await AcademicFaculty.find(whereCondition).countDocuments()

    const { nextPages, prevPage } = paginationNextPrevHelper(paginationOptions, count)

    return {
        meta: {
            page,
            limit,
            total: count,
            prevPage,
            nextPages
        },
        data: result
    }

}

const getSingleFaculty = async (id: string): Promise<IAcademicFaculty | null> => {

    const result = await AcademicFaculty.findById(id)

    return result

}

const updateFaculty = async (id: string, payload: Partial<IAcademicFaculty>): Promise<IAcademicFaculty | null> => {

    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true });

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Faculty not found")
    }


    return result

}


const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {

    const result = await AcademicFaculty.findOneAndDelete({ _id: id })

    // if (!result) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, "academicFaculty delete failed")
    // }

    return result

}

export const academicFacultyService = {
    createFaculty,
    getSingleFaculty,
    getAllFaculty,
    deleteFaculty,
    updateFaculty
}