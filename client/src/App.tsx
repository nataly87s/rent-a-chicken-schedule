import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CustomersPage from './components/CustomersPage';
import EventsPage from './components/EventsPage';
import ReportsPage from './components/ReportsPage';
import {StoreProvider} from './context/StoreContext';

const App = () => {
    const [tab, setTab] = useState(0);

    return (
        <>
            <CssBaseline />
            <Container>
                <AppBar position="static">
                    <Tabs value={tab} onChange={(_, tab) => setTab(tab)}>
                        <Tab label="Customers" />
                        <Tab label="Events" />
                        <Tab label="Reports" />
                    </Tabs>
                </AppBar>
                <StoreProvider>
                    {tab === 0 && <CustomersPage />}
                    {tab === 1 && <EventsPage />}
                    {tab === 2 && <ReportsPage />}
                </StoreProvider>
            </Container>
        </>
    );
};

export default App;
