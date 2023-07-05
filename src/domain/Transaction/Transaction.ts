import { ITransatcion, ListType } from "./ITransatcion";
import { TransactionDataType } from "../../entity/Transaction/TransactionEntity";

export class Transaction implements ITransatcion {
  private listTransaction: TransactionDataType[] = [];

  constructor(private readonly getListApi: ListType) {}

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

  get getList() {
    return this.listTransaction;
  }

  get count() {
    return this.listTransaction.length;
  }
}
