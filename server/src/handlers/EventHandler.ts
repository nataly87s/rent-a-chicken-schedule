import {Request, Response} from 'express';
import Joi from '@hapi/joi';
import {EventAttributes} from '../models/Event';
import EventService from '../services/EventService';
import EntityHandler from './EntityHandler';

const eventSchema = Joi.object({
    customerId: Joi.number().required(),
    address: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    notes: [Joi.string(), Joi.allow(null)],
});

export default class EventHandler extends EntityHandler<EventAttributes, EventService> {
    constructor() {
        super(EventService, eventSchema);
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await this.service.delete(Number(id));
            res.sendStatus(200);
        } catch (err) {
            console.error(`failed deleting Event with id ${id}`, req.body, err);
            res.sendStatus(500);
        }
    }

    getRouter() {
        const router = super.getRouter();
        router.delete('/:id', this.delete.bind(this));
        return router;
    }
}
