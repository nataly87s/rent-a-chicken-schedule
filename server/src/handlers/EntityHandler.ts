import {Request, Response, Router} from 'express';
import Joi from '@hapi/joi';
import {ModelAttributes, ModelCreationAttributes} from '../models';
import ModelService from '../services/ModelService';

export default class EntityHandler<T extends ModelAttributes, U extends ModelService<T>> {
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

    async getAll(req: Request, res: Response) {
        try {
            const result = await this.service.getAll();
            res.send(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async get(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const model = await this.service.get(Number(id));
            if (!model) {
                res.sendStatus(404);
                return;
            }
            res.send(model);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async post(req: Request, res: Response) {
        const {value, error} = this.schema.validate(req.body, {allowUnknown: true});
        if (error) {
            res.status(400).send(error.message);
            return;
        }

        try {
            const model = await this.service.insert(value);
            res.send(model);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async put(req: Request, res: Response) {
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
            res.status(500).send(err.message);
        }
    }

    getRouter() {
        const router = Router();
        router.get('/', this.getAll.bind(this));
        router.get('/:id', this.get.bind(this));
        router.post('/', this.post.bind(this));
        router.put('/:id', this.put.bind(this));
        return router;
    }
}
