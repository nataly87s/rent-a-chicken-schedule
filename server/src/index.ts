import path from 'path';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import dotenv from 'dotenv';
dotenv.config();
import handlers from './handlers';
import User from './models/User';

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

passport.use(
    new BasicStrategy(function (username, password, done) {
        User.findOne({where: {userName: username}})
            .then((user) => {
                if (!user || user.password !== password) {
                    return done(null, false);
                }

                return done(null, user);
            })
            .catch((err) => done(err));
    }),
);

app.use(passport.authenticate('basic', {session: false}));

app.use('/api', handlers());

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
