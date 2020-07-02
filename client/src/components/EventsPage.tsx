import React, {useState} from 'react';
import add from 'date-fns/add';
import isBefore from 'date-fns/isBefore';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useStore} from '../context/StoreContext';
import EventCard from './EventCard';

const useStyles = makeStyles({
    box: {
        padding: '2em 3em',
        flexDirection: 'column',
    },
    cards: {
        marginTop: '2em',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoColumns: 'auto',
        gridGap: '8px',
    },
    radioGroup: {
        flexDirection: 'row',
    },
});

enum ViewType {
    all,
    week,
    month,
}

export type EventsPageProps = {
    customerId?: number;
};

const nextMonth = add(Date.now(), {months: 1});
const nextWeek = add(Date.now(), {weeks: 1});

const EventsPage = ({customerId}: EventsPageProps) => {
    const [viewType, setViewType] = useState(ViewType.all);
    const {events, customers} = useStore();
    const classes = useStyles();
    const filterByCustomer = customers.find((c) => c.id === customerId);

    let filteredEvents = events.filter(e => e.start >= new Date());
    if (filterByCustomer) {
        filteredEvents = filteredEvents.filter((e) => e.customerId === customerId);
    }

    switch (viewType) {
        case ViewType.month:
            filteredEvents = filteredEvents.filter((e) => isBefore(e.start, nextMonth));
            break;
        case ViewType.week:
            filteredEvents = filteredEvents.filter((e) => isBefore(e.start, nextWeek));
            break;
    }

    return (
        <Box className={classes.box}>
            {filterByCustomer && (
                <Typography variant={'h4'} component={'h1'}>
                    {filterByCustomer.firstName} {filterByCustomer.lastName}
                </Typography>
            )}
            <FormControl component="fieldset">
                <RadioGroup
                    className={classes.radioGroup}
                    value={viewType}
                    onChange={(e) => setViewType(Number(e.target.value))}
                >
                    <FormControlLabel value={ViewType.all} control={<Radio />} label="View All" />
                    <FormControlLabel value={ViewType.week} control={<Radio />} label="View Week" />
                    <FormControlLabel value={ViewType.month} control={<Radio />} label="View Month" />
                </RadioGroup>
            </FormControl>
            <Box className={classes.cards}>
                {filterByCustomer && <EventCard customer={filterByCustomer} />}

                {filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        customer={customers.find((c) => c.id === event.customerId)!}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default EventsPage;
