import {Router} from 'express';
import passport from 'passport';

export default () => {
    const router = Router();

    router.use(passport.authenticate('basic', {session: false}));

    router.get('/test', (req, res) => res.send(req.user));

    return router;
};
