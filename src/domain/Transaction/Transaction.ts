import {
  ITransatcion,
  ListType,
  CreateType,
  DeleteType,
  UpdateType,
} from "./ITransatcion";
import { TransactionDataType } from "../../entity/Transaction/TransactionEntity";
import { FactoryTransactionEntity } from "../../entity/Transaction/FactoryTransactionEntity";

export class Transaction implements ITransatcion {
  private listTransaction: TransactionDataType[] = [];

  constructor(
    private readonly getListApi: ListType,
    private readonly createTransaction: CreateType,
    private readonly deleteTransaction: DeleteType,
    private readonly updateTransaction: UpdateType
  ) {}

  format = (transaction: TransactionDataType) => {
    const { id, title, amount, type, category, date } = transaction;
    return {
      id,
      title,
      amount,
      type,
      category,
      date: new Date(date),
    };
  };

  list = async () => {
    const listTransaction = await this.getListApi();
    const listTransactionFormated = listTransaction.map(this.format);
    this.listTransaction = listTransactionFormated;
    return listTransactionFormated;
  };

  create = async (transaction: TransactionDataType) => {
    const valueTransaction = new FactoryTransactionEntity(
      transaction.id,
      transaction.title,
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.date
    ).create();
    const newTransaction = valueTransaction.create();
    if (!Object.keys(newTransaction).length) {
      throw new Error("Transaction not created");
    }
    await this.createTransaction(newTransaction);
  };

  delete = async (id: string) => {
    if (!id) {
      throw new Error("Id not found");
    }
    await this.deleteTransaction(id);
  };

  update = async (transaction: TransactionDataType) => {
    const valueTransaction = new FactoryTransactionEntity(
      transaction.id,
      transaction.title,
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.date
    ).create();
    const editTransaction = valueTransaction.create();
    if (!Object.keys(editTransaction).length) {
      throw new Error("Transaction not updated");
    }
    await this.updateTransaction(editTransaction);
  };

  getList = () => this.listTransaction;

  get count() {
    return this.listTransaction.length;
  }
}
