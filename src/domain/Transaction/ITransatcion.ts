import { TransactionDataType } from "../../entity/Transaction/TransactionEntity";

export type ListType = () => Promise<TransactionDataType[]>;
export type CreateType = (transaction: TransactionDataType) => Promise<void>;
export type DeleteType = (id: string) => Promise<void>;

export interface ITransatcion {
  list: (getTransactionListApi: ListType) => Promise<TransactionDataType[]>;
  create: (
    transaction: TransactionDataType,
    createTransactionApi: CreateType    
  ) => Promise<void>;
  getList: any;
  count: number;
}
