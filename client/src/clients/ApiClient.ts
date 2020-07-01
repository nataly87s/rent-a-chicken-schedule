export type Entity = {
    id: number;
};

export default class ApiClient<T extends Entity> {
    constructor(private readonly entityName: string) {}

    getAll = async (): Promise<T[]> => {
        const response = await fetch(`/api/${this.entityName}`);
        if (!response.ok) {
            throw new Error(`failed getting all ${this.entityName}`);
        }
        return await response.json();
    };

    get = async (id: string): Promise<T | null> => {
        const response = await fetch(`/api/${this.entityName}/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`failed getting ${this.entityName} with id ${id}`);
        }
        return await response.json();
    };

    put = async (entity: Omit<T, 'id'>): Promise<T> => {
        const response = await fetch(`/api/${this.entityName}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity),
        });

        if (!response.ok) {
            throw new Error(`failed creating ${this.entityName}`);
        }

        return await response.json();
    };

    post = async (entity: T): Promise<T> => {
        const response = await fetch(`/api/${this.entityName}/${entity.id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity),
        });

        if (!response.ok) {
            throw new Error(`failed updating ${this.entityName}`);
        }

        return await response.json();
    };
}
