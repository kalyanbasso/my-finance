import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";
import formatLongDate from "../../utils/formatLongDatePtBr";
import formatTwoDates from "../../utils/formatTwoDates";
import { ICards, cardsType, CardsApiDataType } from "./ICards";

export class Cards implements ICards {
  private totalIncoming: number = 0;
  private totalOutcoming: number = 0;
  private total: number = 0;

  private lastIncomingDateTransaction?: Date;
  private lastOutcomingDateTransaction?: Date;

  private firstDateTransaction?: Date;
  private lastDateTransaction?: Date;

  constructor(private readonly cardsApi: CardsApiDataType) {}

  private updateTotalIncoming(transaction: TransactionDataTypes) {
    this.totalIncoming += +transaction.amount;
    if (!this.lastIncomingDateTransaction) {
      this.lastIncomingDateTransaction = new Date(transaction.date);
    } else if (this.lastIncomingDateTransaction < new Date(transaction.date)) {
      this.lastIncomingDateTransaction = new Date(transaction.date);
    }
  }

  private updateTotalOutcoming(transaction: TransactionDataTypes) {
    this.totalOutcoming += +transaction.amount;
    if (!this.lastOutcomingDateTransaction) {
      this.lastOutcomingDateTransaction = new Date(transaction.date);
    } else if (this.lastOutcomingDateTransaction < new Date(transaction.date)) {
      this.lastOutcomingDateTransaction = new Date(transaction.date);
    }
  }

  private updateFirstAndLastDateTransaction(transaction: TransactionDataTypes) {
    if (!this.firstDateTransaction) {
      this.firstDateTransaction = new Date(transaction.date);
    } else if (this.firstDateTransaction > new Date(transaction.date)) {
      this.firstDateTransaction = new Date(transaction.date);
    }

    if (!this.lastDateTransaction) {
      this.lastDateTransaction = new Date(transaction.date);
    } else if (this.lastDateTransaction < new Date(transaction.date)) {
      this.lastDateTransaction = new Date(transaction.date);
    }
  }

  private formatCards(transactions: TransactionDataTypes[]) {
    transactions.forEach((transaction: TransactionDataTypes) => {
      if (transaction.type === "income") {
        this.updateTotalIncoming(transaction);
      } else {
        this.updateTotalOutcoming(transaction);
      }

      this.updateFirstAndLastDateTransaction(transaction);

      this.total += +transaction.amount;
    });
  }

  private resetCards() {
    this.totalIncoming = 0;
    this.totalOutcoming = 0;
    this.total = 0;
    this.lastIncomingDateTransaction = undefined;
    this.lastOutcomingDateTransaction = undefined;
    this.firstDateTransaction = undefined;
    this.lastDateTransaction = undefined;
  }

  async getCards() {
    this.resetCards();

    const response = await this.cardsApi();
    if (!response) return;
    this.formatCards(response);
  }

  get income(): cardsType {
    return {
      value: this.totalIncoming,
      text: `Ultima entrada em ${formatLongDate(
        this.lastIncomingDateTransaction
      )}`,
    };
  }

  get outcome(): cardsType {
    return {
      value: this.totalOutcoming,
      text: `Ultima saída em ${formatLongDate(
        this.lastOutcomingDateTransaction
      )}`,
    };
  }

  get totalBalance(): cardsType {
    return {
      value: this.total,
      text: formatTwoDates(this.firstDateTransaction, this.lastDateTransaction),
    };
  }
}
