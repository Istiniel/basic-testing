// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = [1, 2];
    const expected = {
      next: { next: { next: null, value: null }, value: 2 },
      value: 1,
    };

    expect(expected).toStrictEqual(generateLinkedList(list));
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = [5, 7];
    const expected = {
      next: { next: { next: null, value: null }, value: 7 },
      value: 5,
    };

    expect(expected).toMatchSnapshot(generateLinkedList(list));
  });
});
