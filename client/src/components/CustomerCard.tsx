import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import cogoToast from 'cogo-toast';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {makeStyles} from '@material-ui/core/styles';
import {Customer} from '../clients/CustomersClient';
import {useStore} from '../context/StoreContext';

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

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

const CustomerCard = ({customer: initialCustomer}: CustomerCardProps) => {
    const [customer, setCustomer] = useState(initialCustomer || emptyCustomer);
    const [isSaving, setIsSaving] = useState(false);
    const {addCustomer, updateCustomer} = useStore();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => setCustomer(initialCustomer || emptyCustomer), [initialCustomer]);

    const onSave = async () => {
        if (isSaving) {
            return;
        }
        setIsSaving(true);
        const {hide} = cogoToast.loading('Saving customer');
        try {
            if (initialCustomer) {
                await updateCustomer(customer);
            } else {
                await addCustomer(customer);
                setCustomer(emptyCustomer);
            }
            cogoToast.success('Customer saved successfully', {hideAfter: 15});
        } catch (e) {
            cogoToast.error('Failed to save customer', {hideAfter: 15});
        } finally {
            setIsSaving(false);
            hide!();
        }
    };

    return (
        <Card>
            <CardContent className={classes.container}>
                <TextField
                    label="First Name"
                    value={customer.firstName}
                    onChange={(e) => {
                        const firstName = e.target.value;
                        setCustomer((c) => ({...c, firstName}));
                    }}
                    error={!customer.firstName}
                />
                <TextField
                    label="Last Name"
                    value={customer.lastName}
                    onChange={(e) => {
                        const lastName = e.target.value;
                        setCustomer((c) => ({...c, lastName}));
                    }}
                    error={!customer.lastName}
                />
                <TextField
                    label="Phone Number"
                    value={customer.phoneNumber}
                    onChange={(e) => {
                        const phoneNumber = e.target.value;
                        setCustomer((c) => ({...c, phoneNumber}));
                    }}
                    error={!customer.phoneNumber || !phoneRegex.test(customer.phoneNumber)}
                />
                <TextField
                    label="Email"
                    value={customer.email}
                    onChange={(e) => {
                        const email = e.target.value;
                        setCustomer((c) => ({...c, email}));
                    }}
                    error={!customer.email || !emailRegex.test(customer.email)}
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
                {initialCustomer && (
                    <>
                        <Button size="small" onClick={() => history.push(`/reports/${customer.id}`)}>
                            Report
                        </Button>
                        <Button size="small" onClick={() => history.push(`/events/${customer.id}`)}>
                            Events
                        </Button>
                        <Button size="small" onClick={() => updateCustomer({...customer, archived: true})}>
                            Archive
                        </Button>
                    </>
                )}
                {!initialCustomer && (
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
                    disabled={
                        isSaving ||
                        !customer.firstName ||
                        !customer.lastName ||
                        !customer.phoneNumber ||
                        !phoneRegex.test(customer.phoneNumber) ||
                        !customer.email ||
                        !emailRegex.test(customer.email) ||
                        isEqual(initialCustomer || emptyCustomer, customer)
                    }
                    onClick={onSave}
                >
                    {initialCustomer ? 'Save' : 'Create Customer'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default CustomerCard;
