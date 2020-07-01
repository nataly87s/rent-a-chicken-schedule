import React from 'react';
import Grid from '@material-ui/core/Grid';
import {useCustomers} from '../context/StoreContext';
import CustomerCard from './CustomerCard';

const CustomersPage = () => {
    const customers = useCustomers();
    return (
        <Grid container justify="center" spacing={2}>
            {customers.map((c) => (
                <Grid key={c.id} item>
                    <CustomerCard {...c} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CustomersPage;
