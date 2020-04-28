import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/logger';

class App {

    public express: any;

    constructor() {

        this.express = express();
        this.baseSetup();
        this.setupRoute();
        this.setupLogger();

    }

    public baseSetup(): void {

        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(cookieParser());

        // Show routes called in console during development
        if (process.env.NODE_ENV === 'development') {
            this.express.use(morgan('dev'));
        }

        // Security
        if (process.env.NODE_ENV === 'production') {
            this.express.use(helmet());
        }
    }

    public setupRoute(): void {
        this.express.use('/api', BaseRouter);
    }

    public setupLogger(): void {

        this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        });

    }
}

// Export express instance
export default new App().express;
