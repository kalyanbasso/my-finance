import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";
export type CardsApiDataType = () => Promise<TransactionDataTypes[]>;

export type cardsType = {
  value: string;
  text: string;
};
export interface ICards {
  income: cardsType;
  outcome: cardsType;
  totalBalance: cardsType;
}
