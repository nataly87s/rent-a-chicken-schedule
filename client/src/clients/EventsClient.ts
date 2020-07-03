import ApiClient, {Entity} from './ApiClient';

export type Event = Entity & {
    customerId: number;
    address: string;
    start: Date;
    end: Date;
    notes?: string;
};

export default class EventsClient extends ApiClient<Event> {
    constructor() {
        super('event');
    }

    delete = async (id: number) => {
        const response = await fetch(`/api/event/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const message = await response.text()
            throw new Error(message);
        }
    };
}
