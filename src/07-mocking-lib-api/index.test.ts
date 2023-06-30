// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(() => Promise.resolve({ data: 'test' }));

    await throttledGetDataFromApi('baseUrl');
    jest.runOnlyPendingTimers();

    expect(createSpy).toBeCalledWith(
      expect.objectContaining({
        baseURL: 'https://jsonplaceholder.typicode.com',
      }),
    );
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(() => Promise.resolve({ data: 'test2' }));

    await throttledGetDataFromApi('/todos/1');
    jest.runOnlyPendingTimers();

    expect(getSpy).toBeCalledWith('/todos/1');
    expect(getSpy).toHaveReturnedWith(Promise.resolve({ data: 'test2' }));
  });

  test('should return response data', async () => {
    const articles = [
      { id: 1, title: 'article1' },
      { id: 2, title: 'article2' },
    ];

    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(() => Promise.resolve({ data: articles }));

    const data = await throttledGetDataFromApi('random-url');
    jest.runOnlyPendingTimers();

    expect(data[0].title).toBe('article1');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
});
