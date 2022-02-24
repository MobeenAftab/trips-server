import { Schema, model, Model, Types } from 'mongoose';

export interface ITrip {
    _id: Types.ObjectId;
    name: string;
    destination: string;
    noOfAvalibleSpaces: number;
    startDate: Date;
    returnDate: Date;
    signedUp: Types.ObjectId[] | Array<Record<string, Types.ObjectId>>;
    tripCreatedOn: Date;
    isActive: boolean;
}

const TripSchema: Schema<ITrip> = new Schema({
    name: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    noOfAvalibleSpaces: { type: Number, required: true },
    startDate: { type: Date, default: Date.now, required: true, trim: true },
    returnDate: { type: Date, default: Date.now, required: true, trim: true },
    signedUp: { type: [Schema.Types.ObjectId], default: [], required: true },
    tripCreatedOn: { type: Date, default: Date.now, required: true },
    isActive: { type: Boolean, required: true, default: true },
});

export const TripModel: Model<ITrip> = model('Trip', TripSchema);
// export type TripsModel = Array<typeof TripModel>;
export type TripsModel = Array<ITrip>;
