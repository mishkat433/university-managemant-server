import express from 'express';
import { academicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';


const router = express.Router();

router.get('/get-semester', academicSemesterController.getAllSemester);

router.get('/:id', academicSemesterController.getSingleSemester);

router.post('/create-semester', validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema), academicSemesterController.createSemester);

export const semesterRoutes = router;