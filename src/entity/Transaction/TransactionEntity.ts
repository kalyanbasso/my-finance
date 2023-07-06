import { AdapterZodTransaction } from "./AdapterZodTransaction";

export type TransactionType = "income" | "outcome";
export type TransactionDataTypes = {
  id: string | undefined;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
};

export class TransactionEntity {
  constructor(
    private readonly id: string | undefined,
    private readonly title: string,
    private readonly amount: number,
    private readonly type: TransactionType,
    private readonly category: string,
    private readonly date: Date,
    private readonly adapterValidationTransaction: AdapterZodTransaction
  ) {}

  validate(): boolean {
    const result = this.adapterValidationTransaction.validateNewTransaction({
        title: this.title,
        amount: this.amount,
        type: this.type,
        category: this.category,
        date: this.date,
        id: undefined
    });
    return result;
  }

  create(): TransactionDataTypes {
    if (!this.validate()) return {} as TransactionDataTypes;
    return {
      id: this.id,
      title: this.title,
      amount: this.amount,
      type: this.type,
      category: this.category,
      date: this.date,
    };
  }
}
