import {Router} from 'express';
import passport from 'passport';
import CustomerRoutes from './CustomerRoutes';
import EventRoutes from './EventRoutes';

export default () => {
    const router = Router();

    router.use(passport.authenticate('basic', {session: false}));

    router.use('/customer', new CustomerRoutes().router());
    router.use('/event', new EventRoutes().router());

    return router;
};
