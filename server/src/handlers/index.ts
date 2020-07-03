import {Router} from 'express';
import CustomerHandler from './CustomerHandler';
import EventHandler from './EventHandler';

export default () => {
    const router = Router();

    router.use('/customer', new CustomerHandler().getRouter());
    router.use('/event', new EventHandler().getRouter());

    return router;
};
