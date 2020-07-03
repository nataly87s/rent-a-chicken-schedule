import {CustomerAttributes} from '../models/Customer';
import ModelService from './ModelService';

export default class CustomerService extends ModelService<CustomerAttributes> {
    constructor() {
        super('Customer');
    }
}
