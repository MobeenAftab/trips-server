import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IDecodedToken } from '../models/token.model';

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('authenticateToken');
    try {
        const authHeader =
            req.headers['authorization'] ||
            req.headers['Authorization'].toString();
        if (!authHeader?.startsWith('Bearer ')) {
            return res.send(401).json({ msg: 'Malfomed token' });
        }
        const token = authHeader && authHeader.split(' ')[1];
        console.log('Bearer: ', token);
        if (token === null) {
            return res
                .send(401)
                .json({ msg: 'token not found in request body' });
        }

        verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded: IDecodedToken) => {
                if (err) {
                    next(err);
                }
                console.log('decoded: ', decoded);
                req.body.userId = decoded.userId;
                req.body.roles = decoded.roles;
                next();
            }
        );
    } catch (error) {
        next(error);
    }
};
