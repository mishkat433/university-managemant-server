import httpStatus from "http-status";
import ApiError from "../../../Errors/ApiError";
import { IAcademicSemester, IAcademicSemesterFilters } from "./academicSemester.interface";
import { academicSemesterSearchableFields, academicSemesterTitleCodeMapper } from "./academicSemesterConstants";
import { AcademicSemester } from "./academicSemesterModel";
import { IPaginationOptions } from "../../../globalInterfaces/pagination";
import { IGenericResponse } from "../../../globalInterfaces/common";
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helper/paginationHepler";

const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {

    if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
    }

    const result = await AcademicSemester.create(payload);

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Academic Semester is not created');
    }
    return result
}



const getAllSemester = async (paginationOptions: IPaginationOptions, filters: IAcademicSemesterFilters): Promise<IGenericResponse<IAcademicSemester[]>> => {

    const { searchTerm, ...filtersData } = filters

    const andCondition = []

    if (searchTerm) {
        andCondition.push({
            $or: academicSemesterSearchableFields.map((field) => ({
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

    const result = await AcademicSemester.find(whereCondition).sort(sortConditions).skip(skip).limit(limit)

    const count = await AcademicSemester.find(whereCondition).countDocuments()

    const prevPage = page - 1 > 0 ? page - 1 : null
    const nextPages = page + 1 <= Math.ceil(count / limit) ? page + 1 : null

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


const getSingleSemester = async (id: string): Promise<IAcademicSemester | null> => {
    const result = await AcademicSemester.findById({ _id: id })
    return result
}

export const academicSemesterServices = {
    createSemester,
    getAllSemester,
    getSingleSemester
}