import {Request, Response} from 'express';
import Joi from '@hapi/joi';
import {EventAttributes} from '../models/Event';
import EventService from '../services/EventService';
import EntityRoutes from './EntityRoutes';

const eventSchema = Joi.object({
    customerId: Joi.number().required(),
    address: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    notes: [Joi.string(), Joi.allow(null)],
});

export default class EventRoutes extends EntityRoutes<EventAttributes, EventService> {
    constructor() {
        super(EventService, eventSchema);
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            await this.service.delete(Number(id));
            res.sendStatus(200);
        } catch (err) {
            console.error(`failed deleting Event with id ${id}`, req.body, err);
            res.sendStatus(500);
        }
    };

    router() {
        const router = super.router();
        router.delete('/:id', this.delete);
        return router;
    }
}
