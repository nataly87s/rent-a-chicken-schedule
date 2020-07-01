import React, {useEffect, useState} from 'react';
import './App.css';
import CustomersClient, {Customer} from './clients/CustomersClient';
import EventsClient, {Event} from './clients/EventsClient';
import {AddCustomer} from './components/EditCustomer';
import {AddEvent} from './components/EditEvent';

const customersClient = new CustomersClient();
const eventsClient = new EventsClient();

const App = () => {
    const [customers, setCustomers] = useState<Customer[]>();
    const [events, setEvents] = useState<Event[]>();

    useEffect(() => {
        customersClient.getAll().then(setCustomers).catch(console.error); // todo handle error
        eventsClient.getAll().then(setEvents).catch(console.error); // todo handle error
    }, []);

    return (
        <div className="App">
            <div>{customers ? customers.map((c) => <p key={c.id}>{JSON.stringify(c)}</p>) : 'loading customers'}</div>
            <div>{events ? events.map((e) => <p key={e.id}>{JSON.stringify(e)}</p>) : 'loading events'}</div>
            <AddCustomer onSave={(customer) => setCustomers((c) => c?.concat(customer))} />
            <AddEvent onSave={(event) => setEvents((e) => e?.concat(event))} />
        </div>
    );
};

export default App;
