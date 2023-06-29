// Uncomment the code below and write your tests
import * as _ from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(500);
    expect(bankAccount.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(500);
    try {
      bankAccount.withdraw(501);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(500);
    const receiver = getBankAccount(0);
    try {
      bankAccount.transfer(501, receiver);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(500);
    try {
      bankAccount.transfer(15, bankAccount);
    } catch (error) {
      expect(error).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(500);
    bankAccount.deposit(50);
    expect(bankAccount.getBalance()).toBe(550);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(500);
    bankAccount.withdraw(250);
    expect(bankAccount.getBalance()).toBe(250);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(500);
    const receiver = getBankAccount(0);
    bankAccount.transfer(250, receiver);

    expect(receiver.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(500);

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValueOnce(Promise.resolve(5));

    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(5);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(500);

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValueOnce(Promise.resolve(5));

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(5);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(500);

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValueOnce(Promise.resolve(null));

    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
