import EntityRoutes from './EntityRoutes';
import {EventAttributes} from '../models/Event';
import {Request, Response, Router} from 'express';

export default class EventRoutes extends EntityRoutes<EventAttributes> {
    constructor() {
        super('Event');
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            await this.model.destroy({where: {id}});
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
