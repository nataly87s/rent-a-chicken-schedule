import React, {useEffect, useState} from 'react';
import isEqual from 'lodash/isEqual';
import format from 'date-fns/format';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {useStore} from '../context/StoreContext';
import {Customer} from '../clients/CustomersClient';
import {Event} from '../clients/EventsClient';

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'auto',
        gridGap: '12px 20px',
    },
    title: {
        gridColumnEnd: 'span 2',
    },
    textArea: {
        gridColumnEnd: 'span 2',
    },
    buttons: {
        justifyContent: 'flex-end',
    },
});

export type EventCardProps = {
    customer: Customer;
    event?: Event;
    onClose?: () => void;
};

const emptyEvent: Event = {
    id: 0,
    customerId: 0,
    address: '',
    start: new Date(),
    end: new Date(),
};

const EventCard = ({event: initialEvent, customer, onClose}: EventCardProps) => {
    const [event, setEvent] = useState(initialEvent || emptyEvent);
    const {addEvent, updateEvent} = useStore();
    const classes = useStyles();

    useEffect(() => {
        setEvent(initialEvent || emptyEvent);
    }, [initialEvent]);

    const onSave = async () => {
        if (initialEvent) {
            await updateEvent(event);
        } else {
            event.customerId = customer.id;
            await addEvent(event);
            setEvent(emptyEvent);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <Card>
            <CardContent className={classes.container}>
                <Typography className={classes.title} variant="body1" component="p">
                    {customer.firstName} {customer.lastName}
                </Typography>

                <TextField
                    label="Start Time"
                    type="datetime-local"
                    value={format(event.start, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => {
                        const start = new Date(e.target.value);
                        setEvent((e) => ({...e, start}));
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="End Time"
                    type="datetime-local"
                    value={format(event.end, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => {
                        const end = new Date(e.target.value);
                        setEvent((e) => ({...e, end}));
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextareaAutosize
                    className={classes.textArea}
                    placeholder="Notes"
                    rowsMin={5}
                    rowsMax={5}
                    value={event.notes || ''}
                    onChange={(e) => {
                        const notes = e.target.value;
                        setEvent((e) => ({...e, notes}));
                    }}
                />
            </CardContent>
            <CardActions className={classes.buttons}>
                {onClose && (
                    <Button size="small" onClick={onClose}>
                        Cancel
                    </Button>
                )}
                <Button size="small" disabled={isEqual(initialEvent, event)} onClick={onSave}>
                    {initialEvent ? 'Save' : 'Create Event'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;
