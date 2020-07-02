import React from 'react';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {useStore} from '../context/StoreContext';

const useStyles = makeStyles({
    box: {
        padding: '2em 3em',
        flexDirection: 'column',
    },
    table: {
        marginTop: '2em',
    },
});

export type ReportsPageProps = {
    customerId?: number;
};

const ReportsPage = ({customerId}: ReportsPageProps) => {
    const {customers, events} = useStore();
    const classes = useStyles();
    const customer = customers.find((c) => c.id === customerId);
    let filteredEvents = events.filter((e) => isBefore(e.end, Date.now()));
    if (customer) {
        filteredEvents = filteredEvents.filter((e) => e.customerId === customer.id);
    }

    return (
        <Box className={classes.box}>
            {customer && (
                <Typography variant={'h4'} component={'h1'}>
                    {customer.firstName} {customer.lastName}
                </Typography>
            )}
            <TableContainer component={Paper} className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEvents.map((e) => {
                            const customer = customers.find((c) => c.id === e.customerId)!;
                            return (
                                <TableRow key={e.id}>
                                    <TableCell component="th" scope="row">
                                        {customer.firstName} {customer.lastName}
                                    </TableCell>
                                    <TableCell>{format(e.start, 'PP p')}</TableCell>
                                    <TableCell>{format(e.end, 'PP p')}</TableCell>
                                    <TableCell>{e.address}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReportsPage;
