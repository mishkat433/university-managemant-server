import { z } from "zod";


const createAFacultyZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "title is required"
        })
    })
})

const updateAFacultyZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "title is required"
        })
    })
})


export const academicFacultyValidation = {
    createAFacultyZodSchema,
    updateAFacultyZodSchema
}