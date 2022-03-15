import { getUserByEmail } from './user.controller';
import bcrypt from 'bcrypt';
import { generateToken, saveToken } from './token.controller';
import { IUser } from '../models/user.model';

export const login = async (
    email: string,
    password: string
): Promise<{ user: IUser; accessToken: string; refreshToken: string }> => {
    try {
        if (email && password) {
            const user = await getUserByEmail(email).catch((error) =>
                Promise.reject(error)
            );
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const roles = Object.values(user.roles);

                const { _id, email } = user;
                const accessToken = await generateToken(
                    _id,
                    email,
                    process.env.ACCESS_TOKEN_SECRET,
                    '30m',
                    roles
                );

                const refreshToken = await generateToken(
                    _id,
                    email,
                    process.env.REFRESH_TOKEN_SECRET,
                    '1d'
                );

                await saveToken(refreshToken);

                return { user, accessToken, refreshToken };
            }
        }
    } catch (error) {
        Promise.reject(error);
    }
};
