import { Router } from 'express';
import tripRouter from './routes/trip.routes';
import userRouter from './routes/user.routes';
import authenticationRouter from './routes/authentication.routes';
const router = Router();

// default server test
router.get('', (req, res) => {
    res.status(200).json({
        status: 'success',
    });
});

router.use('/user', userRouter);
router.use('/trip', tripRouter);
router.use('/authentication', authenticationRouter);

export default router;
