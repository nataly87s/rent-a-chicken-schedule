import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useStore} from '../context/StoreContext';
import EventCard from './EventCard';

const useStyles = makeStyles({
    box: {
        padding: '3em',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoColumns: 'auto',
        gridGap: '8px',
    },
});

export type EventsPageProps = {
    customerId?: number;
};

const EventsPage = ({customerId}: EventsPageProps) => {
    const {events, customers} = useStore();
    const classes = useStyles();
    const filterByCustomer = typeof customerId === 'number';
    return (
        <Box className={classes.box}>
            {filterByCustomer && <EventCard customer={customers.find((c) => c.id === customerId)!} />}

            {events
                .filter((e) => !filterByCustomer || customerId == e.customerId)
                .map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        customer={customers.find((c) => c.id === event.customerId)!}
                    />
                ))}
        </Box>
    );
};

export default EventsPage;
