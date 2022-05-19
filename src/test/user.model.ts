// eslint-disable-next-line node/no-unpublished-import
import faker from 'faker';
import { IUser } from '../models/user.model';
import { Types } from 'mongoose';
import PERMISSION_ROLES from '../config/permissionRoles';

export const generateRandomUser = (): IUser => {
    return {
        _id: faker.datatype.uuid(),
        email: faker.datatype.uuid(),
        firstName: faker.datatype.uuid(),
        middleName: faker.datatype.uuid(),
        lastName: faker.datatype.uuid(),
        password: faker.datatype.uuid(),
        mobilenumber: faker.datatype.number(),
        homePhone: faker.datatype.number(),
        emergencyContactName: faker.datatype.uuid(),
        emergencyContactnumber: faker.datatype.number(),
        canDrive: faker.random.boolean(),
        // trips: Types.ObjectId[] | Array<Record<string, Types.ObjectId>>;
        // roles: number[];
        createdAt: faker.date.recent(),
    } as IUser;
};
