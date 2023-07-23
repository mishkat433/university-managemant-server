import { Model } from "mongoose";

export type IAcademicSemesterMonths =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';


export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
    title: IAcademicSemesterTitles;
    year: string;
    code: IAcademicSemesterCode;
    startMonth: IAcademicSemesterMonths;
    endMonth: IAcademicSemesterMonths;
}

export type IAcademicSemesterFilters = {
    searchTerm?: string
}


export type AcademicSemesterModel = Model<IAcademicSemester>;