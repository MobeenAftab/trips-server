import { Schema, model, Model, Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    password: string;
    mobilenumber?: number;
    homePhone?: number;
    emergencyContactName?: string;
    emergencyContactnumber?: number;
    canDrive?: boolean;
    trips: Types.ObjectId[] | Array<Record<string, Types.ObjectId>>;
    isAdmin: boolean;
    createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, required: false, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    mobilenumber: { type: Number, required: false, trim: true },
    homePhone: { type: Number, required: false, trim: true },
    emergencyContactName: { type: String, required: false, trim: true },
    emergencyContactnumber: { type: Number, required: false, trim: true },
    canDrive: { type: Boolean, required: true, default: false },
    trips: { type: [Schema.Types.ObjectId], default: [], required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
});

export const UserModel: Model<IUser> = model('User', UserSchema);
// export type UsersModel = Array<typeof UserModel>;
export type UsersModel = Array<IUser>;
