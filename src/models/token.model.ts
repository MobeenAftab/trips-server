import { Schema, model, Model, Types } from 'mongoose';

export interface IToken {
    _id: Types.ObjectId;
    token: { type: string; required: true; trim: true };
}

const TokenSchema: Schema<IToken> = new Schema({
    token: { type: String, required: true, trim: true },
});

export const TokenModel: Model<IToken> = model('Token', TokenSchema);
