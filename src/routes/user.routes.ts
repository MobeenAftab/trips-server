import { Router, Request, Response, NextFunction } from 'express';
import { checkIfUserExists } from '../middleware/user.middleware';
import { IUser, UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';

const userRouter = Router();

userRouter.get('', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'user router success',
    });
});

userRouter.get('/:id', (req: Request, res: Response) => {
    console.log('GET: user profile details');

    try {
        UserModel.findById(req.params.id).then((user) => {
            res.status(200).json({
                msg: `User Found`,
                user: user,
            });
        });
    } catch (error) {
        console.log(`Error finding a user by ID:\n ${error}`);
    }
});

userRouter.post(
    '/create',
    checkIfUserExists,
    async (req: Request, res: Response) => {
        try {
            console.log('POST: create user profile');
            req.body.password = await bcrypt.hash(req.body.password, 10);

            const userReq: IUser = req.body;
            const newUser = new UserModel(userReq);

            console.log(newUser);

            newUser
                .save()
                .then(() => {
                    res.status(201).json({
                        msg: 'New user account created',
                    });
                })
                .catch((error) => {
                    res.status(400).json({
                        msg: `New user not created due to error:\n ${error}`,
                    });
                });
        } catch (err) {
            console.log(`Error creating a user: \n ${err}`);
        }
    }
);

/**
 * Edit user profile
 * params:
 *      Mongodb ID of user to edit
 *      Expects a JSON valid object with User schema properties
 * returns: Edited user object
 */
userRouter.patch('/edit/:id', (req: Request, res: Response) => {
    console.log('PATCH: Edit user profile details');

    try {
        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            (error, doc) => {
                if (error) {
                    return error;
                }
                res.status(200).json({
                    msg: `User profile changed`,
                    user: doc,
                });
            }
        );
    } catch (error) {
        if (error) {
            res.status(400).json({
                msg: `User profile changes not accepted due to error:\n ${error}`,
            });
        }
    }
});

userRouter.post('/delete/:id', (req: Request, res: Response) => {
    console.log('POST: Delete user profile');

    try {
        UserModel.findOneAndDelete({ _id: req.params.id }, (error) => {
            if (error) {
                return error;
            }
            res.status(200).json({
                msg: `User profile deleted`,
            });
        });
    } catch (error) {
        if (error) {
            res.status(400).json({
                msg: `User profile not deleted due to error:\n ${error}`,
            });
        }
    }
});

/**
 * TODO:
 * Edit Password
 * Reset Password
 *
 * Admin Routes
 * Get USers
 */

export default userRouter;
