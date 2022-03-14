import { Router, Request, Response } from 'express';
import { TripModel, TripsModel } from '../models/trip.model';
import { isUserAdmin } from '../middleware/authorisation.middleware';
import {
    addUserToTrip,
    createTrip,
    deleteTrip,
    editTrip,
    getTripById,
    getTrips,
    removeUserFromTrip,
} from '../controllers/trip.controller';

const tripRouter = Router();

tripRouter.get('', (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            status: 'Trip router success',
        });
    } catch (error) {
        return res.status(400).json({
            msg: `Trip router connection failed`,
            error,
        });
    }
});

tripRouter.get('/trips', async (req: Request, res: Response) => {
    console.log('GET: get active trips');

    try {
        getTrips()
            .then((docs: TripsModel) => {
                return res.status(201).json({
                    msg: 'Get active trips',
                    trips: docs,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Get active trips error`,
                    error,
                });
            });
    } catch (error) {
        throw new Error(`Error get trips:\n ${error}`);
    }
});

// Get trip by id
tripRouter.get('/:id', (req: Request, res: Response) => {
    console.log('GET: get single trip');
    const tripId = req?.params?.id ?? null;

    try {
        if (!tripId) {
            return res.status(400).json({
                msg: `Trip ID not found in body`,
            });
        }

        getTripById(tripId)
            .then((doc) => {
                return res.status(200).json({
                    msg: 'Got trip by id',
                    tripId,
                    trip: doc,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Unable to find Trip ${tripId}`,
                    error,
                });
            });
    } catch (error) {
        throw new Error(`Error get trip by id: ${tripId} \n ${error}`);
    }
});

tripRouter.patch('/adduser/:id', async (req: Request, res: Response) => {
    console.log('PATCH: Add user to trip');
    const tripId = req?.params?.id ?? null;
    const userId = req?.body?.userId ?? null;

    try {
        addUserToTrip(tripId, userId)
            .then((doc) => {
                return res.status(200).json({
                    msg: 'User added to trip',
                    trip: doc,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Could not add user ${userId} to trip`,
                    userId,
                    error,
                });
            });
    } catch (error) {
        throw new Error(
            `Could not add user ${userId} to trip because:\n ${error}`
        );
    }
});

tripRouter.patch('/removeuser/:id', async (req: Request, res: Response) => {
    console.log('PATCH: Remove user from trip');

    const tripId = req?.params?.id ?? null;
    const userId = req?.body?.userId ?? null;

    try {
        removeUserFromTrip(tripId, userId)
            .then((doc) => {
                return res.status(200).json({
                    msg: 'User removed from trip',
                    tripId,
                    userId,
                    trip: doc,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Could not remove user ${userId} from trip ${tripId}`,
                    tripId,
                    userId,
                    error,
                });
            });
    } catch (error) {
        throw new Error(
            `Could not remove user ${userId} from trip ${tripId} because: \n ${error}`
        );
    }
});

// Admin Routes

tripRouter.post('/create', isUserAdmin, async (req: Request, res: Response) => {
    console.log('POST: create trip');

    try {
        const trip = new TripModel(req.body);

        createTrip(trip)
            .then((doc) => {
                res.status(201).json({
                    msg: 'New trip created',
                    tripId: doc.id,
                    trip: doc,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    msg: `New trip not created due to error`,
                    error,
                });
            });
    } catch (error) {
        throw new Error(`Error creating a trip \n ${error}`);
    }
});

tripRouter.patch('/edit/:id', isUserAdmin, (req: Request, res: Response) => {
    console.log('PATCH: update trip details');
    const tripId = req?.params?.id ?? null;
    const trip = new TripModel(req.body);

    try {
        editTrip(tripId, trip)
            .then((doc) => {
                return res.status(200).json({
                    msg: 'Trip details changed',
                    tripId,
                    trip: doc,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Could not update trip ${tripId} details`,
                    tripId,
                    error,
                });
            });
    } catch (error) {
        throw new Error(`Error edit trip by id: ${tripId} \n ${error}`);
    }
});

// Delete Trip
tripRouter.delete(
    '/delete/:id',
    isUserAdmin,
    async (req: Request, res: Response) => {
        console.log('POST: Delete trip');
        const tripId = req?.params?.id ?? null;

        try {
            deleteTrip(tripId)
                .then(() => {
                    return res.status(200).json({
                        msg: `Trip has been marked for delection`,
                        tripId,
                    });
                })
                .catch((error) => {
                    return res.status(400).json({
                        msg: `Trip ${tripId} cannot be deleted`,
                        tripId,
                        error,
                    });
                });
        } catch (error) {
            throw new Error(`Error delete trip by id: ${tripId} \n ${error}`);
        }
    }
);

export default tripRouter;
