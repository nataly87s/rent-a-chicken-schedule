import EntityRoutes from './EntityRoutes';
import {EventAttributes} from '../models/Event';

export default class EventRoutes extends EntityRoutes<EventAttributes> {
    constructor() {
        super('Event');
    }
}
