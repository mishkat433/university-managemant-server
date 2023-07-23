import { Schema, model } from "mongoose";
import { AcademicFacultyModel, IAcademicFaculty } from "./academicFaculty.interface";
import ApiError from "../../../Errors/ApiError";
import httpStatus from "http-status";


const academicFacultySchema = new Schema<IAcademicFaculty>({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
})

academicFacultySchema.pre('save', async function (next) {
    const isExist = await AcademicFaculty.findOne({ title: this.title, });
    if (isExist) {
        throw new ApiError(httpStatus.CONFLICT, `${isExist.title} is already exist`);
    }
    next()
})


export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>('AcademicFaculty', academicFacultySchema)