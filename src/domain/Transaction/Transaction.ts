import { ITransatcion, ListType, CreateType, DeleteType } from "./ITransatcion";
import { TransactionDataType } from "../../entity/Transaction/TransactionEntity";
import { FactoryTransactionEntity } from "../../entity/Transaction/FactoryTransactionEntity";

export class Transaction implements ITransatcion {
  private listTransaction: TransactionDataType[] = [];

  constructor(
    private readonly getListApi: ListType,
    private readonly createTransaction: CreateType,
    private readonly deleteTransaction: DeleteType,
  ) {}

  format(transaction: TransactionDataType) {
    return {
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: new Date(transaction.date),
    };
  }

  async list() {
    const listTransaction = await this.getListApi();
    const listTransactionFormated = listTransaction.map((transaction) =>
      this.format(transaction)
    );
    this.listTransaction = listTransactionFormated;
    return listTransactionFormated;
  }

  async create(transaction: TransactionDataType) {
    const valueTransaction = new FactoryTransactionEntity(
      transaction.id,
      transaction.title,
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.date
    ).create();
    const newTransaction = valueTransaction.create();
    // todo return error (or not?)
    if (!Object.keys(newTransaction).length){
      throw new Error("Transaction not created");
    }

    await this.createTransaction(newTransaction);
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("Id not found");
    }
    await this.deleteTransaction(id);
  }

  get getList() {
    return this.listTransaction;
  }

  get count() {
    return this.listTransaction.length;
  }
}
