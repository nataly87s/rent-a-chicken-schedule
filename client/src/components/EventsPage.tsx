import React from 'react';
import Grid from '@material-ui/core/Grid';
import {useEvents} from '../context/StoreContext';
import EventCard from './EventCard';

const EventsPage = () => {
    const events = useEvents();
    return (
        <>
            <Grid container justify="center" spacing={2}>
                {events.map((e) => (
                    <Grid key={e.id} item>
                        <EventCard {...e} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default EventsPage;
