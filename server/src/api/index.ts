import {Router} from 'express';
import CustomerRoutes from './CustomerRoutes';
import EventRoutes from './EventRoutes';

export default () => {
    const router = Router();

    router.use('/customer', new CustomerRoutes().router());
    router.use('/event', new EventRoutes().router());

    return router;
};
