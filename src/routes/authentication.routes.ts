import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from '../models/user.model';
import { sign, Jwt, verify } from 'jsonwebtoken';
import { TokenModel } from '../models/token.model';
import {
    checkIfRefreshTokenExists,
    deleteRefreshToken,
    generateAccessToken,
    generateRefreshToken,
    saveRefreshToken,
} from '../middleware/authentication.middleware';

const authenticationRouter = Router();

authenticationRouter.get('', (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            status: 'authentication router success',
        });
    } catch (error) {
        throw new Error(`Unable to connect to authenticate: \n ${error}`);
    }
});

authenticationRouter.get('/login', async (req: Request, res: Response) => {
    console.log('POST: user login');

    try {
        await UserModel.findOne({
            email: req?.body?.email,
        })
            .then(async (doc: IUser) => {
                const validPassword = await bcrypt.compare(
                    req?.body?.password,
                    doc.password
                );

                if (validPassword) {
                    const { _id, email, isAdmin } = doc;
                    console.log(email);

                    const accessToken = await generateAccessToken(
                        _id,
                        email,
                        isAdmin
                    );
                    const refreshToken = await generateRefreshToken(
                        accessToken
                    );

                    await saveRefreshToken(refreshToken);

                    return res.status(200).json({
                        msg: `User logged in`,
                        user: doc,
                        accessToken,
                        refreshToken,
                    });
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Cannot login because: ${error}`,
                });
            });
    } catch (error) {
        throw new Error(`Unable to login: \n ${error}`);
    }
});

authenticationRouter.post('/logout', async (req: Request, res: Response) => {
    console.log('POST: user logout');
    const refreshToken = req?.body?.refreshToken;

    try {
        if (refreshToken == null) {
            return res.status(401).json({
                msg: 'refreshToken not found',
                refreshToken: refreshToken,
            });
        }
        if ((await deleteRefreshToken(refreshToken)) === true) {
            return res.status(200).json({
                msg: 'Refresh token deleted, user has logged out',
            });
        }
    } catch (error) {
        throw new Error(`Unable to logout: \n ${error}`);
    }
});

/**
 * Check if refresh token exists in db
 * @returns a new token if refresh token does not exist
 *
 */
authenticationRouter.post('/token', async (req: Request, res: Response) => {
    console.log('POST: token');
    const refreshToken = req?.body?.refreshToken;
    try {
        if (refreshToken == null) {
            return res.status(401).json({
                msg: 'refreshToken not found in request',
                refreshToken: refreshToken,
            });
        }

        if ((await checkIfRefreshTokenExists(refreshToken)) === false) {
            return res.status(403).json({
                msg: 'refreshToken not in database',
                refreshToken: refreshToken,
            });
        }

        verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, doc) => {
                if (err) {
                    return err;
                }
                const token = await generateRefreshToken(doc);
                return res.status(200).json({
                    msg: 'Created new refresh token',
                    refreshToken: token,
                });
            }
        );
    } catch (error) {
        throw new Error(`Unable to logout: \n ${error}`);
    }
});
export default authenticationRouter;
