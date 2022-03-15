import { sign, verify } from 'jsonwebtoken';
import { IDecodedToken, Token } from '../models/token.model';
import { Types } from 'mongoose';

const options = {
    new: true,
    upsert: true,
};

export const generateToken = async (
    userId: Types.ObjectId,
    email: string,
    tokenSecret: string,
    expiresIn: string,
    roles?: number[]
) => {
    try {
        return await sign(
            {
                userId,
                email,
                roles,
            },
            tokenSecret,
            {
                expiresIn: expiresIn,
            }
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

export const saveToken = async (token: string) => {
    try {
        const query = {
            token: token,
        };

        return await Token.findOneAndUpdate(query, query, options).exec();
    } catch (error) {
        Promise.reject(error);
    }
};

export const deleteRefreshToken = async (token: JsonWebKey) => {
    try {
        const query = {
            token: token,
        };
        return await Token.findOneAndDelete(query).exec();
    } catch (error) {
        Promise.reject(error);
    }
};

// Might need to handle this better for type checking, maybe add generics?
export const verifyToken = async (token: string, secret: string) => {
    try {
        return Promise.resolve(verify(token, secret) as IDecodedToken);
    } catch (error) {
        Promise.reject(error);
    }
};

export const checkIfRefreshTokenExists = async (
    token: string
): Promise<boolean> => {
    try {
        const query = {
            token: token,
        };
        return await Token.findOne(query).then((doc) => (doc ? true : false));
    } catch (error) {
        Promise.reject(error);
    }
};
