import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useCustomers} from '../context/StoreContext';
import CustomerCard from './CustomerCard';
import TextField from '@material-ui/core/TextField';
import {Customer} from '../clients/CustomersClient';

const useStyles = makeStyles({
    box: {
        padding: '2em 3em',
        flexDirection: 'column',
    },
    cards: {
        marginTop: '2em',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gridAutoColumns: 'auto',
        gridGap: '8px',
    },
    search: {
        width: '75%',
    },
});

const filterCustomer = (customer: Customer, search: string) => {
    if (customer.archived) {
        return false;
    }
    if (!search) {
        return true;
    }
    const words = search.toLowerCase().split(' ').filter(Boolean);
    return words.some(
        (word) => customer.firstName.toLowerCase().includes(word) || customer.lastName.toLowerCase().includes(word),
    );
};

const CustomersPage = () => {
    const [search, setSearch] = useState('');
    const customers = useCustomers();
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <TextField
                className={classes.search}
                variant="outlined"
                label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Box className={classes.cards}>
                {!search && <CustomerCard />}
                {customers
                    .filter((c) => filterCustomer(c, search))
                    .map((c) => (
                        <CustomerCard key={c.id} customer={c} />
                    ))}
            </Box>
        </Box>
    );
};

export default CustomersPage;
