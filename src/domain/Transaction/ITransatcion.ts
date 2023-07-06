import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";

export type ListType = () => Promise<TransactionDataTypes[]>;
export type CreateType = (transaction: TransactionDataTypes) => Promise<void>;
export type DeleteType = (id: string) => Promise<void>;
export type UpdateType = (transaction: TransactionDataTypes) => Promise<void>;

export interface ITransatcion {
  list: (getTransactionListApi: ListType) => Promise<TransactionDataTypes[]>;
  create: (
    transaction: TransactionDataTypes,
    createTransactionApi: CreateType
  ) => Promise<void>;
  delete: (id: string, deleteTransactionApi: DeleteType) => Promise<void>;
  update: (
    transaction: TransactionDataTypes,
    updateTransactionApi: UpdateType
  ) => Promise<void>;
  getList: any;
  count: number;
}
