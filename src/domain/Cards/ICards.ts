import { TransactionDataType } from "../../entity/Transaction/TransactionEntity";
export type CardsApiDataType = () => Promise<TransactionDataType[]>;

export interface ICards {
    totalCards: {
        totalIncoming: number;
        totalOutcoming: number;
        total: number;
    };
    lastIncomingDateTransaction?: Date;
    lastOutcomingDateTransaction?: Date;
    firstDateTransaction?: Date;
    lastDateTransaction?: Date;
}