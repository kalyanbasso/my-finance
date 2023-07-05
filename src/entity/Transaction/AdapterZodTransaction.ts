import zod from "zod";
import { TransactionDataType} from "./TransactionEntity"

export class AdapterZodTransaction {
  private readonly schema = zod.object({
    title: zod.string(),
    amount: zod.number(),
    type: zod.string(),
    category: zod.string(),
    date: zod.date(),
  });

  private execute<T>(data: T): boolean {
    const result = this.schema.safeParse(data);
    if (result.success) return true;
    return false;
  }

  public validateNewTransaction(data: TransactionDataType): boolean {
    return this.execute(data);
  }

  get getSchema() {
    return this.schema;
  }
}
