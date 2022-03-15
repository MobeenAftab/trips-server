import { Schema, model, Model, Types } from 'mongoose';

/**
 * Interface for a decoded token.
 * Token is saved as a string in mongodb.
 */
export interface IDecodedToken {
    _id: Types.ObjectId;
    userId?: string | Types.ObjectId;
    email?: string;
    roles?: number[];
    token: string;
}

/**
 * Interface for a token represented in mongodb.
 * Verify token to retrieve IDecodedToken values.
 */
export interface IToken {
    _id: Types.ObjectId;
    token: string;
}

const TokenSchema: Schema<IToken> = new Schema({
    token: { type: String, required: true, trim: true },
});

export const Token: Model<IToken> = model('Token', TokenSchema);
