import { Model } from "mongoose";


export type UserModel = Model<IUser, object>;

export type IUser = {
    id: string;
    role: string;
    password?: string;
}
