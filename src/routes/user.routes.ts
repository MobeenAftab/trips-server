import { Router, Request, Response } from 'express';
import { checkIfUserExists } from '../middleware/user.middleware';
import { IUser } from '../models/user.model';
import {
    createUser,
    deleteUser,
    editUser,
    getUserById,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('', (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            status: 'user router success',
        });
    } catch (error) {
        return res.status(400).json({
            msg: `User router connection failed`,
            error,
        });
    }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    console.log('GET: user profile details');

    const userId = req?.params?.id ?? null;
    try {
        if (!userId) {
            return res.status(400).json({
                msg: `User ID not found in body`,
            });
        }

        await getUserById(userId)
            .then((doc) => {
                return res.status(200).json({
                    msg: `User Found`,
                    userId: doc._id,
                    user: doc,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Cannot find user with ID ${error}`,
                    userId,
                    error,
                });
            });
    } catch (error) {
        throw new Error(`Error finding a user with ID: ${userId} \n ${error}`);
    }
});

userRouter.post(
    '/create',
    checkIfUserExists,
    async (req: Request, res: Response) => {
        console.log('POST: create user');
        try {
            const user = req?.body ?? null;

            await createUser(user)
                .then((doc) => {
                    return res.status(201).json({
                        msg: 'New user account created',
                        userId: doc.id,
                        user: doc,
                    });
                })
                .catch((error) => {
                    return res.status(400).json({
                        msg: `New user not created due to errors`,
                        error,
                    });
                });
        } catch (error) {
            throw new Error(`Error creating a user: \n ${error}`);
        }
    }
);

userRouter.patch('/edit/:id', async (req: Request, res: Response) => {
    console.log('PATCH: Edit user profile details');
    const id = req?.params?.id ?? null;
    try {
        const user: IUser = req?.body?.id ?? null;
        await editUser(id, user)
            .then((doc) => {
                return res.status(200).json({
                    msg: `User profile changed`,
                    user: doc,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Cannot edit user due to error`,
                    id,
                    error,
                });
            });
    } catch (error) {
        throw new Error(`Cannot edit user ${id} due to error:\n ${error}`);
    }
});

userRouter.post('/delete/:id', async (req: Request, res: Response) => {
    console.log('POST: Delete user profile');

    const id = req?.params?.id ?? null;
    try {
        await deleteUser(id)
            .then(() => {
                return res.status(200).json({
                    msg: `User profile deleted`,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    msg: `Cannot delete user ${id} due to error`,
                    id,
                    error,
                });
            });
    } catch (error) {
        if (error) {
            throw new Error(
                `Cannot delete user ${id} due to error:\n ${error}`
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
