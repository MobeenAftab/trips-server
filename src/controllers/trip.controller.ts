import { TripModel, ITrip } from '../models/trip.model';
import { Types } from 'mongoose';

const options = { new: true };

export const getTripById = async (tripId: string | Types.ObjectId) => {
    try {
        if (tripId) {
            return await TripModel.findById(tripId);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * TODO: update this to return trips by newest trips first and pagination, find options
 */
export const getTrips = async () => {
    try {
        return await TripModel.find({ isActive: true }).exec();
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createTrip = async (trip: ITrip | null) => {
    try {
        if (trip) {
            return await TripModel.create(trip);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const editTrip = async (
    tripId: string | Types.ObjectId,
    trip: ITrip | null
) => {
    try {
        if (tripId && trip) {
            return await TripModel.findByIdAndUpdate(tripId, options, trip);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteTrip = async (tripId: string | Types.ObjectId) => {
    try {
        if (tripId) {
            return await TripModel.findByIdAndDelete(tripId);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const addUserToTrip = async (
    tripId: string | Types.ObjectId,
    userId: string | Types.ObjectId
) => {
    try {
        return await TripModel.findByIdAndUpdate(
            { _id: tripId },
            { $addToSet: { signedUp: userId } },
            options
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

export const removeUserFromTrip = async (
    tripId: string | Types.ObjectId,
    userId: string | Types.ObjectId
) => {
    try {
        return await TripModel.findByIdAndUpdate(
            { _id: tripId },
            { $pull: { signedUp: userId } },
            options
        );
    } catch (error) {
        return Promise.reject(error);
    }
};
