import { UserModel, IUser } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { TokenModel } from '../models/token.model';
import { Types } from 'mongoose';

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);

        verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.body.user = user;
            next();
        });
    } catch (error) {
        throw new Error(`Unable to authenticate token: \n ${error}`);
    }
};

export const generateAccessToken = async (
    _id: Types.ObjectId,
    email: string,
    isAdmin: boolean
) => {
    try {
        return await sign(
            {
                _id,
                email,
                isAdmin,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '15m',
            }
        );
    } catch (error) {
        throw new Error(`Unable to generate access token: \n ${error}`);
    }
};

export const generateRefreshToken = async (refreshToken) => {
    try {
        return await sign({ refreshToken }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '2h',
        });
    } catch (error) {
        throw new Error(`Unable to generate refresh token: \n ${error}`);
    }
};

export const saveRefreshToken = async (refreshToken): Promise<boolean> => {
    try {
        const query = {
            token: refreshToken,
        };
        const options = {
            new: true,
            upsert: true,
        };
        return await TokenModel.findOneAndUpdate(query, query, options)
            .then((doc) => {
                return doc ? true : false;
            })
            .catch((error) => {
                console.log('saveRefreshToken: ', error);
                return false;
            });
    } catch (error) {
        throw new Error(`Unable to save refresh token: \n ${error}`);
    }
};

export const deleteRefreshToken = async (
    refreshToken: JsonWebKey
): Promise<boolean> => {
    try {
        const query = {
            token: refreshToken,
        };
        return await TokenModel.findOne(query)
            .then((doc) => {
                return doc ? true : false;
            })
            .catch((error) => {
                console.log('deleteRefreshToken: ', error);
                return false;
            });
    } catch (error) {
        throw new Error(`Unable to delete refresh token: \n ${error}`);
    }
};

export const checkIfRefreshTokenExists = async (
    refreshToken: JsonWebKey
): Promise<boolean> => {
    try {
        const query = {
            token: refreshToken,
        };
        return await TokenModel.findOne(query, (err, doc) => {
            if (err) return err;
            return doc ? true : false;
        });
    } catch (error) {
        throw new Error(`Unable to check if refresh token exists: \n ${error}`);
    }
};
