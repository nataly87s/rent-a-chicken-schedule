import EntityRoutes from './EntityRoutes';
import {CustomerAttributes} from '../models/Customer';

export default class CustomerRoutes extends EntityRoutes<CustomerAttributes> {
    constructor() {
        super('Customer');
    }
}
