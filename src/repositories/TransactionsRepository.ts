import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.map(item =>
      item.type === 'income' ? item.value : 0,
    );

    const income = incomes.length
      ? incomes.reduce((total, value) => total + value)
      : 0;

    const outcomes = this.transactions.map(item =>
      item.type === 'outcome' ? item.value : 0,
    );

    const outcome = incomes.length
      ? outcomes.reduce((total, value) => total + value)
      : 0;

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type,
    };
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
