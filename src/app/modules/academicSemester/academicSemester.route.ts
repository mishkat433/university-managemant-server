import express from 'express';
import { academicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';


const router = express.Router();

router.get('/', academicSemesterController.getAllSemester);

router.get('/:id', academicSemesterController.getSingleSemester);

router.patch('/update-semester/:id', validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema), academicSemesterController.updateSemester);

router.post('/create-semester', validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema), academicSemesterController.createSemester);

router.delete('/delete-semester/:id', academicSemesterController.deleteSemester);

export const semesterRoutes = router;