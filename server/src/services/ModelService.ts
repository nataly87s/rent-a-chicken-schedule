import {ModelCtor} from 'sequelize';
import {ModelAttributes, ModelClass, ModelCreationAttributes, sequelize} from '../models';

export default class ModelService<T extends ModelAttributes> {
    constructor(private readonly modelName: string) {}

    get model(): ModelCtor<ModelClass<T>> {
        return sequelize.model(this.modelName) as ModelCtor<ModelClass<T>>;
    }

    getAll = () => this.model.findAll();

    get = (id: number) => this.model.findOne({where: {id}});

    insert = (entity: ModelCreationAttributes<T>) => {
        entity.createdAt = new Date();
        entity.updatedAt = new Date();
        return this.model.create(entity);
    };

    update = async (id: number, entity: T) => {
        entity.updatedAt = new Date();
        await this.model.update(entity, {where: {id}});
    };
}
