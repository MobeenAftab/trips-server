import { Router, Request, Response, NextFunction } from 'express';
import { TripModel, TripsModel, ITrip } from '../models/trip.model';

const tripRouter = Router();

tripRouter.get('', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'trip router success',
    });
});

// Get active trips, Return in asc order
tripRouter.get('/trips', async (req: Request, res: Response) => {
    console.log('GET: get active trips');

    try {
        TripModel.find({ isActive: true })
            .then((docs) => {
                res.status(201).json({
                    msg: 'Get active trips',
                    trips: docs,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    msg: `Get active trips error ${error}`,
                });
            });
    } catch (error) {
        console.log(`Error get trips:\n ${error}`);
    }
});

// Get trip by id
tripRouter.get('/:id', async (req: Request, res: Response) => {
    console.log('GET: get single trip');

    try {
        TripModel.findOne({ _id: req.params.id })
            .then((doc) => {
                console.log(doc);
                res.status(200).json({
                    msg: 'Got trip by id',
                    trip: doc,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    msg: `Unable to find Trip because: ${error}`,
                });
            });
    } catch (error) {
        console.log(`Error get trip by id: \n ${error}`);
    }
});

// Update trip details
tripRouter.patch('/edit/:id', async (req: Request, res: Response) => {
    console.log('PATCH: update trip details');

    try {
        TripModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then((doc) => {
                res.status(200).json({
                    msg: 'Trip details changed',
                    trip: doc,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    msg: `Could not update trip details because: ${err}`,
                });
            });
    } catch (error) {
        console.log(`Error edit a trip: \n ${error}`);
    }
});

// Delete Trip
tripRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    console.log('POST: Delete trip');

    try {
        TripModel.findByIdAndDelete({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    msg: `Trip has been marked for delection`,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    msg: `Trip cannot be deleted because: ${err}`,
                });
            });
    } catch (error) {
        console.log(`Error deleting a trip: \n  ${error}`);
    }
});

// Add user to trip
tripRouter.patch('/signup/:id', async (req: Request, res: Response) => {
    console.log('POST: Delete trip');

    try {
        TripModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
            .then((doc) => {
                res.status(200).json({
                    msg: 'User added to trip',
                    trip: doc,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    msg: `Could not add user to trip because: ${err}`,
                });
            });
    } catch (error) {
        console.log(`Error adding a user to trip: ${error}`);
    }
});

// Remove user from trip

// Admin Routes

// TODO: middleware to check if user is admin
tripRouter.post('/create', async (req: Request, res: Response) => {
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
        console.log(`Error creating a trip:\n  ${error}`);
    }
});

export default tripRouter;
