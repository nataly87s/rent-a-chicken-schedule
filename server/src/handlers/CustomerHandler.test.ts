import CustomerHandler from './CustomerHandler';
import httpMocks from 'node-mocks-http';
const getAllMock = jest.fn();
const getMock = jest.fn();
const insertMock = jest.fn();
const updateMock = jest.fn();

jest.mock('../services/CustomerService', () =>
    jest.fn(() => ({
        getAll: getAllMock,
        get: getMock,
        insert: insertMock,
        update: updateMock,
    })),
);

describe('CustomerHandler', () => {
    let handler: CustomerHandler;

    beforeEach(() => {
        getAllMock.mockClear();
        getMock.mockClear();
        insertMock.mockClear();
        updateMock.mockClear();
        handler = new CustomerHandler();
    });

    describe('getAll', () => {
        test('should return 200 and all customers', async () => {
            //setup
            const expectedResult = [
                {id: 1, firstName: 'winnie', lastName: 'pooh'},
                {id: 2, firstName: 'christopher', lastName: 'robin'},
            ];
            getAllMock.mockResolvedValue(expectedResult);
            const {req, res} = httpMocks.createMocks();

            //act
            await handler.getAll(req, res);

            //assert
            expect(res.statusCode).toEqual(200);
            expect(res._getData()).toEqual(expectedResult);
        });

        test('should return 500 if error is thrown', async () => {
            //setup
            getAllMock.mockRejectedValue(new Error());
            const {req, res} = httpMocks.createMocks();

            //act
            await handler.getAll(req, res);

            //assert
            expect(res.statusCode).toEqual(500);
        });
    });

    describe('get', () => {
        const requestConfig = {params: {id: '1'}};

        test('should return 200 and the customer', async () => {
            //setup
            const expectedResult = {id: 1, firstName: 'winnie', lastName: 'pooh'};
            getMock.mockResolvedValue(expectedResult);
            const {req, res} = httpMocks.createMocks(requestConfig);

            //act
            await handler.get(req, res);

            //assert
            expect(res.statusCode).toEqual(200);
            expect(res._getData()).toEqual(expectedResult);
            expect(getMock).toBeCalledWith(1);
        });

        test('should return 404 if customer is not found', async () => {
            //setup
            getMock.mockResolvedValue(null);
            const {req, res} = httpMocks.createMocks(requestConfig);

            //act
            await handler.get(req, res);

            //assert
            expect(res.statusCode).toEqual(404);
            expect(getMock).toBeCalledWith(1);
        });

        test('should return 500 if error is thrown', async () => {
            //setup
            getMock.mockRejectedValue(new Error());
            const {req, res} = httpMocks.createMocks(requestConfig);

            //act
            await handler.get(req, res);

            //assert
            expect(res.statusCode).toEqual(500);
            expect(getMock).toBeCalledWith(1);
        });
    });

    describe('post', () => {
        test('should return 200 and the new version of the customer', async () => {
            //setup
            const expectedResult = {id: 1, firstName: 'winnie', lastName: 'pooh'};
            insertMock.mockResolvedValue(expectedResult);
            const body = {
                firstName: 'winnie',
                lastName: 'pooh',
                phoneNumber: '555-555-5555',
                email: 'winnie.pooh@disney.com',
            };
            const {req, res} = httpMocks.createMocks({body});

            //act
            await handler.post(req, res);

            //assert
            expect(res.statusCode).toEqual(200);
            expect(res._getData()).toEqual(expectedResult);
            expect(insertMock).toBeCalledWith(body);
        });

        test('should return 400 if missing properties', async () => {
            //setup
            const body = {
                firstName: 'winnie',
                lastName: 'pooh',
                email: 'winnie.pooh@disney.com',
            };
            const {req, res} = httpMocks.createMocks({body});

            //act
            await handler.post(req, res);

            //assert
            expect(res.statusCode).toEqual(400);
            expect(insertMock).not.toHaveBeenCalled();
        });

        test('should return 400 if invalid email', async () => {
            //setup
            const body = {
                firstName: 'winnie',
                lastName: 'pooh',
                phoneNumber: '555-555-5555',
                email: 'winnie.pooh_disney.com',
            };
            const {req, res} = httpMocks.createMocks({body});

            //act
            await handler.post(req, res);

            //assert
            expect(res.statusCode).toEqual(400);
            expect(insertMock).not.toHaveBeenCalled();
        });

        test('should return 500 is error is thrown', async () => {
            //setup
            insertMock.mockRejectedValue(new Error());
            const body = {
                firstName: 'winnie',
                lastName: 'pooh',
                phoneNumber: '555-555-5555',
                email: 'winnie.pooh@disney.com',
            };
            const {req, res} = httpMocks.createMocks({body});

            //act
            await handler.post(req, res);

            //assert
            expect(res.statusCode).toEqual(500);
            expect(insertMock).toBeCalledWith(body);
        });
    });

    describe('put', () => {
        test('should return 200', async () => {
            //setup
            updateMock.mockResolvedValue(undefined);
            const body = {
                firstName: 'winnie',
                lastName: 'pooh',
                phoneNumber: '555-555-5555',
                email: 'winnie.pooh@disney.com',
            };
            const {req, res} = httpMocks.createMocks({params: {id: '1'}, body});

            //act
            await handler.put(req, res);

            //assert
            expect(res.statusCode).toEqual(200);
            expect(updateMock).toBeCalledWith(1, {...body, id: 1});
        });

        test('should return 400 if missing properties', async () => {
            //setup
            const body = {
                firstName: 'winnie',
                lastName: 'pooh',
                email: 'winnie.pooh@disney.com',
            };
            const {req, res} = httpMocks.createMocks({params: {id: '1'}, body});

            //act
            await handler.put(req, res);

            //assert
            expect(res.statusCode).toEqual(400);
            expect(updateMock).not.toHaveBeenCalled();
        });

        test('should return 400 if invalid email', async () => {
            //setup
            const body = {
                firstName: 'winnie',
                lastName: 'pooh',
                phoneNumber: '555-555-5555',
                email: 'winnie.pooh_disney.com',
            };
            const {req, res} = httpMocks.createMocks({params: {id: '1'}, body});

            //act
            await handler.put(req, res);

            //assert
            expect(res.statusCode).toEqual(400);
            expect(updateMock).not.toHaveBeenCalled();
        });

        test('should return 500 is error is thrown', async () => {
            //setup
            updateMock.mockRejectedValue(new Error());
            const body = {
                firstName: 'winnie',
                lastName: 'pooh',
                phoneNumber: '555-555-5555',
                email: 'winnie.pooh@disney.com',
            };
            const {req, res} = httpMocks.createMocks({params: {id: '1'}, body});

            //act
            await handler.put(req, res);

            //assert
            expect(res.statusCode).toEqual(500);
            expect(updateMock).toBeCalledWith(1, {...body, id: 1});
        });
    });
});
