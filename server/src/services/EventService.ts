import {EventAttributes} from '../models/Event';
import ModelService from './ModelService';

export default class EventService extends ModelService<EventAttributes> {
    constructor() {
        super('Event');
    }

    delete = (id: number) => this.model.destroy({where: {id}});
}
