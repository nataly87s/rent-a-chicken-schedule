import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useCustomers} from '../context/StoreContext';
import CustomerCard from './CustomerCard';

const useStyles = makeStyles({
    box: {
        padding: '3em',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gridAutoColumns: 'auto',
        gridGap: '8px',
    },
});

const CustomersPage = () => {
    const customers = useCustomers();
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <CustomerCard />
            {customers.map((c) => (
                <CustomerCard key={c.id} customer={c} />
            ))}
        </Box>
    );
};

export default CustomersPage;
