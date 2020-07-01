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
}
