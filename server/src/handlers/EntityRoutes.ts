import {Request, Response, Router} from 'express';
import Joi from '@hapi/joi';
import {ModelAttributes, ModelCreationAttributes} from '../models';
import ModelService from '../services/ModelService';

export default class EntityRoutes<T extends ModelAttributes, U extends ModelService<T>> {
    private readonly _service: U;

    constructor(factory: new () => U, private readonly _schema: Joi.ObjectSchema<ModelCreationAttributes<T>>) {
        this._service = new factory();
    }

    get service() {
        return this._service;
    }

    get schema() {
        return this._schema;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.service.getAll();
            res.send(result);
        } catch (err) {
            console.error(`failed getting all`, err);
            res.status(500).send(err.message);
        }
    };

    get = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const model = await this.service.get(Number(id));
            if (!model) {
                res.sendStatus(404);
                return;
            }
            res.send(model);
        } catch (err) {
            console.error(`failed getting`, err);
            res.status(500).send(err.message);
        }
    };

    post = async (req: Request, res: Response) => {
        const {value, error} = this.schema.validate(req.body, {allowUnknown: true});
        if (error) {
            res.status(400).send(error.message);
            return;
        }

        try {
            const model = await this.service.insert(value);
            res.send(model);
        } catch (err) {
            console.error(`failed creating`, req.body, err);
            res.status(500).send(err.message);
        }
    };

    put = async (req: Request, res: Response) => {
        const {value, error} = this.schema
            .append({id: Joi.number()})
            .validate({...req.body, id: req.params.id}, {allowUnknown: true});
        if (error) {
            res.status(400).send(error.message);
            return;
        }

        try {
            await this.service.update(value.id, value);
            res.sendStatus(200);
        } catch (err) {
            console.error(`failed updating`, req.body, err);
            res.status(500).send(err.message);
        }
    };

    router() {
        const router = Router();
        router.get('/', this.getAll);
        router.get('/:id', this.get);
        router.post('/', this.post);
        router.put('/:id', this.put);
        return router;
    }
}
