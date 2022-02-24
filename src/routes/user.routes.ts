import { Router, Request, Response, NextFunction } from 'express';
import { checkIfUserExists } from '../middleware/user.middleware';
import { IUser, UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';

const userRouter = Router();
const options = { new: true };

userRouter.get('', (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            status: 'user router success',
        });
    } catch (error) {
        return res.status(400).json({
            msg: `User router connection failed:\n ${error}`,
        });
    }
});

userRouter.get('/:id', (req: Request, res: Response) => {
    console.log('GET: user profile details');

    const userId = req?.params?.id;
    try {
        if (!userId) {
            return res.status(400).json({
                msg: `Invalid userId:\n ${userId}`,
            });
        }

        UserModel.findById(userId)
            .then((user) => {
                return res.status(200).json({
                    msg: `User Found`,
                    user: user,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    msg: `Cannot find user with ID ${userId} :\n ${error}`,
                });
            });
    } catch (error) {
        throw new Error(`Error finding a user by ID: ${userId} \n ${error}`);
    }
});

userRouter.post(
    '/create',
    checkIfUserExists,
    async (req: Request, res: Response) => {
        console.log('POST: create user profile');
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);

            const userReq: IUser = req.body;
            const newUser = new UserModel(userReq);

            console.log(newUser);

            newUser
                .save()
                .then(() => {
                    return res.status(201).json({
                        msg: 'New user account created',
                        userId: newUser.id,
                        user: newUser,
                    });
                })
                .catch((error) => {
                    return res.status(400).json({
                        msg: `New user not created due to error:\n ${error}`,
                    });
                });
        } catch (error) {
            throw new Error(`Error creating a user: \n ${error}`);
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
    const userId = req?.params?.id;

    try {
        UserModel.findByIdAndUpdate({ _id: userId }, options, req.body)
            .then((doc) => {
                return res.status(200).json({
                    msg: `User profile changed`,
                    user: doc,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `User $${userId} not edited due to error:\n ${error}`,
                });
            });
    } catch (error) {
        if (error) {
            throw new Error(
                `User ${userId} profile changes not accepted due to error:\n ${error}`
            );
        }
    }
});

userRouter.post('/delete/:id', (req: Request, res: Response) => {
    console.log('POST: Delete user profile');

    const userId = req?.params?.id;
    try {
        UserModel.findByIdAndDelete({ _id: userId })
            .then(() => {
                return res.status(200).json({
                    msg: `User profile deleted`,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    msg: `User ${userId} profile not deleted due to error:\n ${error}`,
                });
            });
    } catch (error) {
        if (error) {
            throw new Error(
                `User ${userId} profile not deleted due to error:\n ${error}`
            );
        }
    }
});

/**
 * TODO:
 * Edit Password
 * Reset Password
 *
 * Admin Routes
 * Get Users
 */

export default userRouter;
