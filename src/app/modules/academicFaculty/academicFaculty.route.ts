import express from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFacultyValidation";

const router = express.Router();

router.post('/create-faculty', validateRequest(academicFacultyValidation.createAFacultyZodSchema), academicFacultyController.createFaculty)

router.get('/', academicFacultyController.getAllFaculty)

router.get('/:id', academicFacultyController.getSingleFaculty)

router.patch('/update-faculty/:id', validateRequest(academicFacultyValidation.updateAFacultyZodSchema), academicFacultyController.updateFaculty)

router.delete('/delete-faculty/:id', academicFacultyController.deleteFaculty)


export const AcademicFacultyRoutes = router;

