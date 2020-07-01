import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Event} from '../clients/EventsClient';
import {Customer} from '../clients/CustomersClient';
import format from 'date-fns/format';

const useStyles = makeStyles({
    card: {
      maxWidth: '20em',
    },
    pos: {
        margin: '1em',
    },
});

export type EventCardProps = Event & {
    customer: Customer;
};

const EventCard = ({customer, address, start, end, notes}: EventCardProps) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.pos} variant="h5" component="h1">
                    {format(new Date(start), 'p')} - {format(new Date(end), 'p')}
                </Typography>
                <Typography className={classes.pos} variant="body1" component="p">
                    {customer.firstName} {customer.lastName}
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    {address}
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    {notes}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;
