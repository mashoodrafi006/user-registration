import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import OrderRepository from '../../../app/repositories/orders';
import { getAllOrderRepositoryFunctionName, getSingleOrderDetail } from '../../fixtures/Order';

describe('Repo:  Order', () => {
    test('functions exists or not in order repository', async () => {
        const methods = Object.keys(OrderRepository);
        const functionNames = getAllOrderRepositoryFunctionName();
        functionNames.forEach((name) => {
            expect(methods).toContain(name);
        });
        // eslint-disable-next-line no-undef
    });
    test('it should return order detail in success case', async () => {
        // eslint-disable-next-line no-undef
        const orderMockData = getSingleOrderDetail();
        const mock = new MockAdapter(axios);
        mock.onGet().reply(200, {
            order: orderMockData,
        });
        const response = await OrderRepository.getOrderDetail(223);
        expect(typeof response).toBe('object');
        expect(response).toEqual(orderMockData);

        mock.restore();
    });
    test('it should return null when it did not get order detail', async () => {
        // eslint-disable-next-line no-undef
        const mock = new MockAdapter(axios);
        mock.onGet().reply(200, {
            order: null,
        });
        const response = await OrderRepository.getOrderDetail(223);
        expect(response).toBeNull();

        mock.restore();
    });
    test('it should return null when it did not get order detail', async () => {
        // eslint-disable-next-line no-undef
        const mock = new MockAdapter(axios);
        mock.onGet().reply(200, {
            order: null,
        });

        const response = await OrderRepository.getOrderDetail(223);
        expect(response).toBeNull();

        mock.restore();
    });
});
