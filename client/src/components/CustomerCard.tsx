import React, {useEffect, useState} from 'react';
import isEqual from 'lodash/isEqual';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from '@material-ui/core/styles';
import {Customer} from '../clients/CustomersClient';
import {useStore} from '../context/StoreContext';
import EventCard from './EventCard';

export type CustomerCardProps = {
    customer?: Customer;
};

const emptyCustomer: Customer = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
};

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'auto',
        gridGap: '12px 20px',
    },
    textArea: {
        gridColumnEnd: 'span 2',
    },
    buttons: {
        justifyContent: 'flex-end',
    },
});

const CustomerCard = ({customer: initialCustomer}: CustomerCardProps) => {
    const [customer, setCustomer] = useState(initialCustomer || emptyCustomer);
    const [addEvent, setAddEvent] = useState(false);

    const {addCustomer, updateCustomer} = useStore();

    useEffect(() => setCustomer(initialCustomer || emptyCustomer), [initialCustomer]);

    const classes = useStyles();

    const onSave = async () => {
        if (initialCustomer) {
            await updateCustomer(customer);
        } else {
            await addCustomer(customer);
            setCustomer(emptyCustomer);
        }
    };

    return (
        <>
            <Card>
                <CardContent className={classes.container}>
                    <TextField
                        label="First Name"
                        value={customer.firstName}
                        onChange={(e) => {
                            const firstName = e.target.value;
                            setCustomer((c) => ({...c, firstName}));
                        }}
                    />
                    <TextField
                        label="Last Name"
                        value={customer.lastName}
                        onChange={(e) => {
                            const lastName = e.target.value;
                            setCustomer((c) => ({...c, lastName}));
                        }}
                    />
                    <TextField
                        label="Phone Number"
                        value={customer.phoneNumber}
                        onChange={(e) => {
                            const phoneNumber = e.target.value;
                            setCustomer((c) => ({...c, phoneNumber}));
                        }}
                    />
                    <TextField
                        label="Email"
                        value={customer.email}
                        onChange={(e) => {
                            const email = e.target.value;
                            setCustomer((c) => ({...c, email}));
                        }}
                    />
                    <TextareaAutosize
                        className={classes.textArea}
                        placeholder="Notes"
                        rowsMin={5}
                        rowsMax={5}
                        value={customer.notes || ''}
                        onChange={(e) => {
                            const notes = e.target.value;
                            setCustomer((c) => ({...c, notes}));
                        }}
                    />
                </CardContent>
                <CardActions className={classes.buttons}>
                    {initialCustomer ? (
                        <Button size="small" onClick={() => setAddEvent(true)}>
                            Add Event
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            disabled={isEqual(emptyCustomer, customer)}
                            onClick={() => setCustomer(emptyCustomer)}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        size="small"
                        disabled={isEqual(initialCustomer || emptyCustomer, customer)}
                        onClick={onSave}
                    >
                        {initialCustomer ? 'Save' : 'Create Customer'}
                    </Button>
                </CardActions>
            </Card>
            <Dialog open={addEvent} onClose={() => setAddEvent(false)}>
                <EventCard customer={customer} onClose={() => setAddEvent(false)} />
            </Dialog>
        </>
    );
};

export default CustomerCard;
