import React, {createContext, FunctionComponent, useCallback, useContext, useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventsClient, {Event} from '../clients/EventsClient';
import CustomersClient, {Customer} from '../clients/CustomersClient';
import cogoToast from 'cogo-toast';

const customersClient = new CustomersClient();
const eventsClient = new EventsClient();

export type Store = {
    customers: Customer[];
    addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
    updateCustomer: (customer: Customer) => Promise<void>;

    events: Event[];
    addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
    updateEvent: (event: Event) => Promise<void>;
    deleteEvent: (id: number) => Promise<void>;
};

const StoreContext = createContext<Store>({
    customers: [],
    addCustomer: () => Promise.reject(new Error('missing StoreProvider')),
    updateCustomer: () => Promise.reject(new Error('missing StoreProvider')),
    events: [],
    addEvent: () => Promise.reject(new Error('missing StoreProvider')),
    updateEvent: () => Promise.reject(new Error('missing StoreProvider')),
    deleteEvent: () => Promise.reject(new Error('missing StoreProvider')),
});

export const useStore = () => useContext(StoreContext);
export const useCustomers = () => useContext(StoreContext).customers;
export const useEvents = () => useContext(StoreContext).events;

const fixEventDates = ({start, end, ...event}: Event) => ({
    ...event,
    start: new Date(start),
    end: new Date(end),
});

export const StoreProvider: FunctionComponent = ({children}) => {
    const [customers, setCustomers] = useState<Customer[]>();
    const [events, setEvents] = useState<Event[]>();

    const addCustomer = useCallback(async (customer: Omit<Customer, 'id'>) => {
        const newCustomer = await customersClient.put(customer);
        setCustomers((customers) => customers!.concat(newCustomer));
    }, []);

    const updateCustomer = useCallback(async (customer) => {
        await customersClient.post(customer);
        setCustomers((customers) => {
            const index = customers!.findIndex((i) => i.id === customer.id);
            const updatedCustomers = [...customers!];
            updatedCustomers![index] = customer;
            return updatedCustomers;
        });
    }, []);

    const addEvent = useCallback(async (event: Omit<Event, 'id'>) => {
        const newEvent = await eventsClient.put(event);
        setEvents((events) => events!.concat(fixEventDates(newEvent)));
    }, []);

    const updateEvent = useCallback(async (event: Event) => {
        await eventsClient.post(event);
        setEvents((events) => {
            const index = events!.findIndex((i) => i.id === event.id);
            const updatedEvents = [...events!];
            updatedEvents![index] = event;
            return updatedEvents;
        });
    }, []);

    const deleteEvent = useCallback(async (id: number) => {
        await eventsClient.delete(id);
        setEvents((events) => events?.filter((e) => e.id !== id));
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const [customers, events] = await Promise.all([customersClient.getAll(), eventsClient.getAll()]);
                setCustomers(customers);
                setEvents(
                    events.map((event) => {
                        const customer = customers.find((c) => c.id === event.customerId)!;
                        return {...fixEventDates(event), customer};
                    }),
                );
            } catch (e) {
                cogoToast.error('Failed loading schedule', {hideAfter: 0});
                console.error('failed loading store', e);
            }
        })();
    }, []);

    if (!events || !customers) {
        return <CircularProgress />;
    }

    return (
        <StoreContext.Provider
            value={{customers, addCustomer, updateCustomer, events, addEvent, updateEvent, deleteEvent}}
        >
            {children}
        </StoreContext.Provider>
    );
};
