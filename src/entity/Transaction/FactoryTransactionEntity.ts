import { AdapterZodTransaction } from "./AdapterZodTransaction";
import { TransactionType, TransactionEntity } from "./TransactionEntity";

export class FactoryTransactionEntity {
  adapterValidationTransaction = new AdapterZodTransaction();

  constructor(
    private readonly id: string | undefined,
    private readonly title: string,
    private readonly amount: number,
    private readonly type: TransactionType,
    private readonly category: string,
    private readonly date: Date
  ) {}

  create(): TransactionEntity {
    return new TransactionEntity(
      this.id,
      this.title,
      this.amount,
      this.type,
      this.category,
      this.date,
      this.adapterValidationTransaction
    );
  }
}
