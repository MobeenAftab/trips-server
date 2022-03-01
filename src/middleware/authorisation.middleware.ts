import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { IAccessToken } from '../models/token.model';

export const isUserAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('middleware authoriseToken');
    try {
        const refreshToken = req?.body?.refreshToken;
        verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (error, token: { refreshToken: string }) => {
                if (error) {
                    return res.status(400).json({
                        msg: `Failed to verify refresh token :\n ${error}`,
                    });
                } else {
                    console.log('token ', token);
                    await verify(
                        token.refreshToken,
                        process.env.ACCESS_TOKEN_SECRET,
                        async (error, decodedToken: IAccessToken) => {
                            console.log('decodedToken', decodedToken);
                            if (error) {
                                return res.status(400).json({
                                    msg: `Failed to verify access token :\n ${error}`,
                                });
                            } else if (decodedToken.isAdmin === true) {
                                next();
                            } else {
                                return res.status(400).json({
                                    msg: `User is not admin :\n ${error}`,
                                });
                            }
                        }
                    );
                }
            }
        );
    } catch (error) {
        throw new Error(`Unable to authorise token: \n ${error}`);
    }
};

export const verifyRefreshToken = async (refreshToken: string) => {
    return verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, token: { refreshToken: string }) => {
            if (error) {
                return error;
            } else {
                console.log('verifyRefreshToken', token);
                return token;
            }
        }
    );
};

export const verifyAccessToken = async (accessToken: string) => {
    return verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (error, token: IAccessToken) => {
            if (error) {
                return error;
            } else {
                console.log('verifyAccessToken', token);
                return token;
            }
        }
    );
};
