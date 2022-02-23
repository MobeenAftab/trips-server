import { UserModel } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

export const checkIfUserExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const duplicateEmail = await UserModel.findOne({ email: req.body.email });
    if (duplicateEmail) {
        return res.status(303).json({
            msg: 'Account with that email already exists',
        });
    } else {
        next();
    }
};
