import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";
export type CardsApiDataType = () => Promise<TransactionDataTypes[]>;

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