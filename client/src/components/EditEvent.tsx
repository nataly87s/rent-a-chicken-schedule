import EventsClient, {Event} from '../clients/EventsClient';
import React, {Dispatch, SetStateAction, useState} from 'react';
import format from 'date-fns/format';
const eventsClient = new EventsClient();

type EventEditorProps = Omit<Event, 'id'> & {
    setCustomerId: Dispatch<SetStateAction<number>>;
    setAddress: Dispatch<SetStateAction<string>>;
    setStart: Dispatch<SetStateAction<Date>>;
    setEnd: Dispatch<SetStateAction<Date>>;
    setNotes: Dispatch<SetStateAction<string>>;
    onSave: () => void;
};

const EventEditor = ({
    customerId,
    address,
    start,
    end,
    notes,
    setCustomerId,
    setAddress,
    setStart,
    setEnd,
    setNotes,
    onSave,
}: EventEditorProps) => (
    <div style={{border: '1px solid black'}}>
        <p>
            <label>Customer</label>
            <input onChange={(e) => setCustomerId(Number(e.target.value))} value={customerId} />
        </p>
        <p>
            <label>Address</label>
            <input onChange={(e) => setAddress(e.target.value)} value={address} />
        </p>
        <p>
            <label>Start Time</label>
            <input
                type="datetime-local"
                onChange={(e) => setStart(new Date(e.target.value))}
                value={format(start, "yyyy-MM-dd'T'HH:mm")}
            />
        </p>
        <p>
            <label>End Time</label>
            <input
                type="datetime-local"
                onChange={(e) => setEnd(new Date(e.target.value))}
                value={format(end, "yyyy-MM-dd'T'HH:mm")}
            />
        </p>
        <p>
            <label>Notes</label>
            <textarea onChange={(e) => setNotes(e.target.value)} value={notes} />
        </p>
        <p>
            <button onClick={onSave}>Save</button>
        </p>
    </div>
);

export type AddEventProps = {
    // customers: Customer[];
    onSave: (event: Event) => void;
};

export const AddEvent = ({onSave}: AddEventProps) => {
    const [customerId, setCustomerId] = useState(-1);
    const [address, setAddress] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [notes, setNotes] = useState('');

    const performSave = async () => {
        const event = await eventsClient.put({customerId, address, start, end, notes});
        setCustomerId(-1);
        setAddress('');
        setStart(new Date());
        setEnd(new Date());
        setNotes('');
        onSave(event);
    };

    return (
        <EventEditor
            customerId={customerId}
            address={address}
            start={start}
            end={end}
            notes={notes}
            setCustomerId={setCustomerId}
            setAddress={setAddress}
            setStart={setStart}
            setEnd={setEnd}
            setNotes={setNotes}
            onSave={performSave}
        />
    );
};
