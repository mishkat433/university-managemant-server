import { RequestHandler } from "express";
import userServices from "./users.services";


const createUser: RequestHandler = async (req, res, next) => {

    try {
        const result = await userServices.createUser(req.body)
        res.status(200).json({
            success: true,
            message: 'user created successfully',
            data: result
        })

    } catch (error) {
        next(error)
    }

}

export default { createUser };