import { IUser, UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

const options = { new: true };

export const getUserById = async (userId: string | Types.ObjectId) => {
    try {
        if (userId) {
            return await UserModel.findById(userId);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        if (email) {
            return await UserModel.findOne({ email: email });
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createUser = async (user: IUser | null) => {
    try {
        if (user) {
            user.password = await bcrypt.hash(user.password, 10);
            return await UserModel.create(user);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const editUser = async (id: string | null, user: IUser | null) => {
    try {
        if (id && user) {
            return await UserModel.findByIdAndUpdate(
                { _id: id },
                options,
                user
            );
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteUser = async (id: string | null) => {
    try {
        if (id) {
            return await UserModel.findByIdAndDelete(id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};
