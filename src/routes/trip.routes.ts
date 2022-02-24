import { Router, Request, Response, NextFunction } from 'express';
import { TripModel, TripsModel, ITrip } from '../models/trip.model';

const tripRouter = Router();

tripRouter.get('', (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            status: 'trip router success',
        });
    } catch (error) {
        throw new Error(`Unable to connect to trip: \n ${error}`);
    }
});

// Get active trips, Return in asc order
tripRouter.get('/trips', (req: Request, res: Response) => {
    console.log('GET: get active trips');
    try {
        TripModel.find({ isActive: true })
            .then((docs: TripsModel) => {
                return res.status(201).json({
                    msg: 'Get active trips',
                    trips: docs,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Get active trips error ${error}`,
                });
            });
    } catch (error) {
        throw new Error(`Error get trips:\n ${error}`);
    }
});

// Get trip by id
tripRouter.get('/:id', (req: Request, res: Response) => {
    console.log('GET: get single trip');
    const tripId = req?.params?.id;

    try {
        TripModel.findById<ITrip>({ _id: tripId })
            .then((doc) => {
                console.log(doc);
                return res.status(200).json({
                    msg: 'Got trip by id',
                    trip: doc,
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    msg: `Unable to find Trip ${tripId} because: ${error}`,
                });
            });
    } catch (error) {
        throw new Error(`Error get trip by id: ${tripId} \n ${error}`);
    }
});

// Update trip details
tripRouter.patch('/edit/:id', (req: Request, res: Response) => {
    console.log('PATCH: update trip details');
    const tripId = req?.params?.id;

    try {
        TripModel.findByIdAndUpdate({ _id: tripId }, req.body)
            .then((doc) => {
                return res.status(200).json({
                    msg: 'Trip details changed',
                    trip: doc,
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: `Could not update trip ${tripId} details because: ${err}`,
                });
            });
    } catch (error) {
        throw new Error(`Error edit trip by id: ${tripId} \n ${error}`);
    }
});

// Delete Trip
tripRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    console.log('POST: Delete trip');
    const tripId = req?.params?.id;

    try {
        TripModel.findByIdAndDelete({ _id: tripId })
            .then(() => {
                return res.status(200).json({
                    msg: `Trip has been marked for delection`,
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: `Trip ${tripId} cannot be deleted because: ${err}`,
                });
            });
    } catch (error) {
        throw new Error(`Error delete trip by id: ${tripId} \n ${error}`);
    }
});

// Add user to trip
tripRouter.patch('/signup/:id', async (req: Request, res: Response) => {
    console.log('POST: Delete trip');

    try {
        TripModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then((doc) => {
                return res.status(200).json({
                    msg: 'User added to trip',
                    trip: doc,
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    msg: `Could not add user to trip because: ${err}`,
                });
            });
    } catch (error) {
        throw new Error(` \n ${error}`);
    }
});

// Remove user from trip

// Admin Routes

// TODO: middleware to check if user is admin
tripRouter.post('/create', (req: Request, res: Response) => {
    console.log('POST: create trip');

    try {
        const newTrip = new TripModel(req.body);
        console.log(newTrip);

        newTrip
            .save()
            .then((doc) => {
                res.status(201).json({
                    msg: 'New trip created',
                    tripId: doc.id,
                    trip: doc,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    msg: `New trip not created due to error:\n ${error}`,
                });
            });
    } catch (error) {
        throw new Error(`Error creating a trip \n ${error}`);
    }
});

export default tripRouter;
