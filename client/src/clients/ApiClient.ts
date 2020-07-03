export type Entity = {
    id: number;
};

export default class ApiClient<T extends Entity> {
    constructor(private readonly entityName: string) {}

    getAll = async (): Promise<T[]> => {
        const response = await fetch(`/api/${this.entityName}`);
        if (!response.ok) {
            const message = await response.text()
            throw new Error(message);
        }
        return await response.json();
    };

    get = async (id: string): Promise<T | null> => {
        const response = await fetch(`/api/${this.entityName}/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            const message = await response.text()
            throw new Error(message);
        }

        return await response.json();
    };

    post = async (entity: Omit<T, 'id'>): Promise<T> => {
        const response = await fetch(`/api/${this.entityName}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity),
        });

        if (!response.ok) {
            const message = await response.text()
            throw new Error(message);
        }

        return await response.json();
    };

    put = async (entity: T): Promise<void> => {
        const response = await fetch(`/api/${this.entityName}/${entity.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entity),
        });

        if (!response.ok) {
            const message = await response.text()
            throw new Error(message);
        }
    };
}
