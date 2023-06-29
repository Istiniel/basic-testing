// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  ...jest.requireActual<typeof import('./index')>('./index'),
  mockOne: () => {
    return;
  },
  mockTwo: () => {
    return;
  },
  mockThree: () => {
    return;
  },
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    console.log = jest.fn();
    mockOne();
    mockTwo();
    mockThree();
    expect(console.log).toBeCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    console.log = jest.fn();
    unmockedFunction();
    expect(console.log).toBeCalledWith('I am not mocked');
  });
});
