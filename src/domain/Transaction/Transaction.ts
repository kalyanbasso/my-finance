import {
  ITransatcion,
  ListType,
  CreateType,
  DeleteType,
  UpdateType,
} from "./interfacesTransatcion";
import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";
import { FactoryTransactionEntity } from "../../entity/Transaction/FactoryTransactionEntity";

export class Transaction implements ITransatcion {
  private listTransaction: TransactionDataTypes[] = [];

  constructor(
    private readonly getListApi: ListType,
    private readonly createTransaction: CreateType,
    private readonly deleteTransaction: DeleteType,
    private readonly updateTransaction: UpdateType
  ) {}

  format = (transaction: TransactionDataTypes) => {
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

  create = async (transaction: TransactionDataTypes) => {
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
      return
    }
    await this.createTransaction(newTransaction);
  };

  delete = async (id: string) => {
    await this.deleteTransaction(id);
  };

  update = async (transaction: TransactionDataTypes) => {
    //TODO arrumar a factory
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
      return
    }
    await this.updateTransaction(editTransaction);
  };

  get getList() {
    return this.listTransaction
  };

  get count() {
    return this.listTransaction.length;
  }
}
