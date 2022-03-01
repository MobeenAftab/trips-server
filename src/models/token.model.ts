import { Schema, model, Model, Types } from 'mongoose';

export interface IToken {
    _id: Types.ObjectId;
    token: string;
}

const TokenSchema: Schema<IToken> = new Schema({
    token: { type: String, required: true, trim: true },
});

export const TokenModel: Model<IToken> = model('Token', TokenSchema);

export interface IAccessToken {
    _id: Types.ObjectId;
    email: string;
    isAdmin: boolean;
}
