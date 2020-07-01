import {Request, Response, Router} from 'express';
import {ModelAttributes, ModelClass, sequelize} from '../models';
import {ModelCtor} from 'sequelize';

export default class EntityRoutes<T extends ModelAttributes> {
    constructor(private readonly modelName: string) {}

    get model(): ModelCtor<ModelClass<T>> {
        return sequelize.model(this.modelName) as ModelCtor<ModelClass<T>>;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.model.findAll();
            res.send(result);
        } catch (err) {
            console.error(`failed getting all ${this.modelName}`, err);
            res.sendStatus(500);
        }
    };

    get = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const model = await this.model.findOne({where: {id}});
            if (!model) {
                res.sendStatus(404);
                return;
            }
            res.send(model);
        } catch (err) {
            console.error(`failed getting ${this.modelName} with id ${id}`, err);
            res.sendStatus(500);
        }
    };

    put = async (req: Request, res: Response) => {
        try {
            const body = req.body as T;
            body.createdAt = new Date();
            body.updatedAt = new Date();
            const model = await this.model.create(body);

            res.send(model);
        } catch (err) {
            console.error(`failed creating ${this.modelName}`, req.body, err);
            res.sendStatus(500);
        }
    };

    post = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const body = req.body as T;
            body.updatedAt = new Date();
            const model = await this.model.update(body, {where: {id}});
            res.send(model);
        } catch (err) {
            console.error(`failed updating ${this.modelName} with id ${id}`, req.body, err);
            res.sendStatus(500);
        }
    };

    router() {
        const router = Router();
        router.get('/', this.getAll);
        router.get('/:id', this.get);
        router.put('/', this.put);
        router.post('/:id', this.post);
        return router;
    }
}
