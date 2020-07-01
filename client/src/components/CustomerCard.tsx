import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Customer} from '../clients/CustomersClient';

const useStyles = makeStyles({
    pos: {
        margin: '1em',
    },
});

const CustomerCard = ({firstName, lastName, phoneNumber, email, notes}: Customer) => {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography className={classes.pos} variant="h5" component="h1">
                    {firstName} {lastName}
                </Typography>
                <Typography className={classes.pos} variant="body1" component="p">
                    {phoneNumber}
                    <br />
                    {email}
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    {notes}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">Events</Button>
            </CardActions>
        </Card>
    );
};

export default CustomerCard;
