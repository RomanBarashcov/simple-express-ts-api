import { Router } from 'express';
import UserRouter from './users';
import ImageRouter from './images';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/images', ImageRouter);

// Export the base-router
export default router;
