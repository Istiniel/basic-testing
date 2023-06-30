// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);
    jest.runOnlyPendingTimers();

    expect(timeoutSpy).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(550);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);
    jest.runOnlyPendingTimers();

    expect(intervalSpy).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(intervalSpy).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const fileName = 'random_file';

    await readFileAsynchronously(fileName);

    expect(joinSpy).toBeCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    const fileName = 'random_file';

    const result = await readFileAsynchronously(fileName);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileName = 'existedFile.rnd';
    jest.spyOn(fsSync, 'existsSync').mockImplementationOnce(() => true);

    jest
      .spyOn(fs, 'readFile')
      .mockImplementationOnce(() => Promise.resolve('VeryLongString'));

    const result = await readFileAsynchronously(fileName);

    expect(result?.length).toBeGreaterThan(5);
    expect(result).toBe('VeryLongString');
  });
});
