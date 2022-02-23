import { Router } from 'express';
import userRouter from './routes/user.routes';

const router = Router();

// default server test
router.get('', (req, res) => {
    res.status(200).json({
        status: 'success',
    });
});

router.use('/user', userRouter);

export default router;
