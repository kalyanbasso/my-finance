import { TransactionDataType } from "../../entity/Transaction/TransactionEntity";

export type ListType = () => Promise<TransactionDataType[]>;

export interface ITransatcion {
  list: (getTransactionListApi: ListType) => Promise<TransactionDataType[]>;
  getList: any;
  count: number;
}
