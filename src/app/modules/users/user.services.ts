import config from "../../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateUserId } from "./user.utils";


const createUser = async (user: IUser): Promise<IUser | null> => {

    const id = await generateUserId()
    user.id = id;

    if (!user.password) {
        user.password = config.DEFAULT_USER_PASSWORD as string
    }

    const createUser = await User.create(user)
    if (!createUser) {
        throw new Error("failed to create user")
    }
    return createUser
}

export default {
    createUser,
}