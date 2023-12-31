import { Schema, model } from 'mongoose';
import { AcademicSemesterModel, IAcademicSemester } from './academicSemester.interface';
import { academicSemesterCode, academicSemesterMonths, academicSemesterTitles } from './academicSemesterConstants';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';



const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: {
        type: String,
        required: true,
        enum: academicSemesterTitles
    },
    year: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        enum: academicSemesterCode
    },
    startMonth: {
        type: String,
        required: true,
        enum: academicSemesterMonths
    },

    endMonth: {
        type: String,
        required: true,
        enum: academicSemesterMonths
    }

}, { timestamps: true });

academicSemesterSchema.pre('save', async function (next) {
    const isExist = await AcademicSemester.findOne({ title: this.title, year: this.year });
    if (isExist) {
        throw new ApiError(httpStatus.CONFLICT, 'Academic Semester is already exist');
    }
    next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema);


// same title && same year check

