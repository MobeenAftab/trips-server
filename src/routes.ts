import { Router } from 'express';
import tripRouter from './routes/trip.routes';
import userRouter from './routes/user.routes';
import authenticationRouter from './routes/authentication.routes';

const router = Router();

router.get('status', (req, res) => {
    try {
        res.status(200).json({
            msg: 'API Server connection success',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'API Server connection failed',
        });
    }
});

router.use('/user', userRouter);
router.use('/trip', tripRouter);
router.use('/authentication', authenticationRouter);

export default router;
