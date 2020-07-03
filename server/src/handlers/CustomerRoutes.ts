import Joi from '@hapi/joi';
import {CustomerAttributes} from '../models/Customer';
import CustomerService from '../services/CustomerService';
import EntityRoutes from './EntityRoutes';

const customerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    notes: [Joi.string(), Joi.allow(null)],
    archived: Joi.bool()
})

export default class CustomerRoutes extends EntityRoutes<CustomerAttributes, CustomerService> {
    constructor() {
        super(CustomerService, customerSchema);
    }
}
