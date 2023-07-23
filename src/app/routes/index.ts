import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { semesterRoutes } from "../modules/academicSemester/academicSemester.route";


const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/academicSemester',
        route: semesterRoutes,
    }
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));



export default router;



