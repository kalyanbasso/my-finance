import { TransactionDataType } from "../../entity/Transaction/TransactionEntity";
import { ICards, CardsApiDataType } from "./ICards";

export class Cards implements ICards {
  private totalIncoming: number = 0;
  private totalOutcoming: number = 0;
  private total: number = 0;

  public lastIncomingDateTransaction?: Date;
  public lastOutcomingDateTransaction?: Date;

  public firstDateTransaction?: Date;
  public lastDateTransaction?: Date;

  constructor(private readonly cardsApi: CardsApiDataType) {}

  private updateTotalIncoming(transaction: TransactionDataType) {
    this.totalIncoming += +transaction.amount;
    if (!this.lastIncomingDateTransaction) {
      this.lastIncomingDateTransaction = new Date(transaction.date);
    } else if (this.lastIncomingDateTransaction < new Date(transaction.date)) {
      this.lastIncomingDateTransaction = new Date(transaction.date);
    }
  }

  private updateTotalOutcoming(transaction: TransactionDataType) {
    this.totalOutcoming += +transaction.amount;
    if (!this.lastOutcomingDateTransaction) {
      this.lastOutcomingDateTransaction = new Date(transaction.date);
    } else if (this.lastOutcomingDateTransaction < new Date(transaction.date)) {
      this.lastOutcomingDateTransaction = new Date(transaction.date);
    }
  }

  private updateFirstAndLastDateTransaction(transaction: TransactionDataType) {
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

  private formatCards(transactions: TransactionDataType[]) {
    transactions.forEach((transaction: TransactionDataType) => {
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
    if (!response) {
      this.totalIncoming = 0;
      this.totalOutcoming = 0;
      this.total = 0;
      return;
    }

    this.formatCards(response);
  }

  get totalCards() {
    return {
      totalIncoming: this.totalIncoming,
      totalOutcoming: this.totalOutcoming,
      total: this.total,
    };
  }

  get lastIncomeTransaction(): Date | undefined {
    return this.lastIncomingDateTransaction;
  }

  get lastOutcomingTransaction(): Date | undefined {
    return this.lastOutcomingDateTransaction;
  }

  get rangeOfDatesTransactions(): {
    firstDateTransaction?: Date;
    lastDateTransaction?: Date;
  } {
    return {
      firstDateTransaction: this.firstDateTransaction,
      lastDateTransaction: this.lastDateTransaction,
    };
  }
}
