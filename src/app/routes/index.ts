import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { semesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";


const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/academicSemester',
        route: semesterRoutes,
    },
    {
        path: '/academicFaculty',
        route: AcademicFacultyRoutes,
    }
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));



export default router;



