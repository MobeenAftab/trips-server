import { UserModel } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

export const checkIfUserExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        return res.status(303).json({
            msg: 'Account with that email already exists',
            userId: user._id,
            user: user,
        });
    } else {
        next();
    }
};
