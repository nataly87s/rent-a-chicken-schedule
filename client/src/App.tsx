import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    RouteChildrenProps,
    RouteComponentProps,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CustomersPage from './components/CustomersPage';
import EventsPage from './components/EventsPage';
import ReportsPage from './components/ReportsPage';
import {StoreProvider} from './context/StoreContext';

const tabRoutes = ['/customers', '/events', '/reports'];

const App = () => (
    <Router>
        <CssBaseline />
        <Container>
            <AppBar position="static">
                <Route path={tabRoutes}>
                    {({match, history}: RouteChildrenProps) => (
                        <Tabs value={tabRoutes.indexOf(match?.path || '')}>
                            <Tab label="Customers" onClick={() => history.push('/customers')} />
                            <Tab label="Events" onClick={() => history.push('/events')} />
                            <Tab label="Reports" onClick={() => history.push('/reports')} />
                        </Tabs>
                    )}
                </Route>
            </AppBar>
            <StoreProvider>
                <Switch>
                    <Route path="/customers" render={() => <CustomersPage />} />
                    <Route
                        path="/events/:customerId?"
                        render={({
                            match: {
                                params: {customerId},
                            },
                        }: RouteComponentProps<{customerId?: string}>) => (
                            <EventsPage customerId={customerId ? Number(customerId) : undefined} />
                        )}
                    />
                    <Route
                        path="/reports/:customerId?"
                        render={({
                            match: {
                                params: {customerId},
                            },
                        }: RouteComponentProps<{customerId?: string}>) => (
                            <ReportsPage customerId={customerId ? Number(customerId) : undefined} />
                        )}
                    />
                    <Route render={() => <Redirect to="/customers" />} />
                </Switch>
            </StoreProvider>
        </Container>
    </Router>
);

export default App;
