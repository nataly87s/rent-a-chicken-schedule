import ApiClient, {Entity} from './ApiClient';

export type Customer = Entity & {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    notes?: string;
};

export default class CustomersClient extends ApiClient<Customer> {
    constructor() {
        super('customer');
    }
}
