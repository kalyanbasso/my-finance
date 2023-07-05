export type TransactionType = 'income' | 'outcome';
export type TransactionDataType = {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: Date;
}