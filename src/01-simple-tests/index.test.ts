// Uncomment the code below and write your tests
import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const addNums = { a: 2, b: 3, action: '+' };
    expect(simpleCalculator(addNums)).toBe(5);
  });

  test('should subtract two numbers', () => {
    const subtractNums = { a: 2, b: 3, action: '-' };
    expect(simpleCalculator(subtractNums)).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const multiplyNums = { a: 2, b: 3, action: '*' };
    expect(simpleCalculator(multiplyNums)).toBe(6);
  });

  test('should divide two numbers', () => {
    const divideNums = { a: 6, b: 6, action: '/' };
    expect(simpleCalculator(divideNums)).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const divideNums = { a: 2, b: 3, action: '^' };
    expect(simpleCalculator(divideNums)).toBe(8);
  });

  test('should return null for invalid action', () => {
    const divideNums = { a: 2, b: 3, action: 'invalid action' };
    expect(simpleCalculator(divideNums)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const divideNums = { a: 2, b: 'invalid', action: '^' };
    expect(simpleCalculator(divideNums)).toBeNull();
  });
});
