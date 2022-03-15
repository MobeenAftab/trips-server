import { Router, Request, Response } from 'express';
import { login } from '../controllers/authentication.controller';
import {
    checkIfRefreshTokenExists,
    deleteRefreshToken,
    generateToken,
    verifyToken,
} from '../controllers/token.controller';
import { getUserById } from '../controllers/user.controller';

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
    const { email, password } = req.body;

    try {
        login(email, password)
            .then(({ user, accessToken, refreshToken }) => {
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                }); //secure: true,

                return res.status(200).json({
                    msg: `User logged in`,
                    user,
                    accessToken,
                    refreshToken,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Cannot login because`,
                    error,
                });
            });
    } catch (error) {
        throw new Error(`Unable to login: \n ${error}`);
    }
});

authenticationRouter.post('/logout', async (req: Request, res: Response) => {
    console.log('POST: user logout');
    const cookies = req.cookies;

    try {
        if (!cookies?.jwt) {
            return res.status(401).json({
                msg: 'Invalid Credentials',
            });
        }
        const refreshToken = cookies.jwt;
        deleteRefreshToken(refreshToken).then(() => {
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
                .status(200)
                .json({
                    msg: 'Refresh token deleted, user has logged out',
                });
        });
    } catch (error) {
        throw new Error(`Unable to logout: \n ${error}`);
    }
});

/**
 * Check if refresh token exists in db
 * @returns a new token if refresh token does not exist
 *
 */
authenticationRouter.post(
    '/refreshtoken',
    async (req: Request, res: Response) => {
        console.log('POST: token');
        const refreshToken = req?.body?.refreshToken ?? null;
        const cookies = req.cookies;

        try {
            if (refreshToken == null || !cookies?.jwt) {
                return res.status(401).json({
                    msg: 'Invalid Credentials',
                    refreshToken,
                });
            }

            if ((await checkIfRefreshTokenExists(refreshToken)) === false) {
                return res.status(403).json({
                    msg: 'refreshToken not in database',
                    refreshToken,
                });
            }

            const decodedToken = await verifyToken(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
            const user = await getUserById(decodedToken.userId);
            const accessToken = await generateToken(
                user._id,
                user.email,
                process.env.ACCESS_TOKEN_SECRET,
                '15m',
                user.roles
            );

            return res.status(200).json({
                msg: `New access token`,
                accessToken,
                refreshToken,
            });
        } catch (error) {
            throw new Error(`Unable to generate new access token: \n ${error}`);
        }
    }
);

export default authenticationRouter;
