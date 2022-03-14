import { CorsOptions } from 'cors';
import allowedOrigins from './allowedOrigins';

const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
};

export default corsOptions;
