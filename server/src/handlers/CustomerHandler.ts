import Joi from '@hapi/joi';
import {CustomerAttributes} from '../models/Customer';
import CustomerService from '../services/CustomerService';
import EntityHandler from './EntityHandler';

const customerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    notes: [Joi.string(), Joi.allow(null)],
    archived: Joi.bool()
})

export default class CustomerHandler extends EntityHandler<CustomerAttributes, CustomerService> {
    constructor() {
        super(CustomerService, customerSchema);
    }
}
