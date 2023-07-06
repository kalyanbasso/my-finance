import { View, Text } from "react-native";
import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";

export type ListTransactionsTypes = {
  list: TransactionDataTypes[];
  delete: (id: string) => Promise<void>;
  edit: (data: TransactionDataTypes) => void;
  loading: boolean;
};

export function ListTransactionsUI({
  list,
  delete: deleteTransaction,
  edit,
  loading,
}: ListTransactionsTypes) {
  return (
    <View>
      <Text>asdasd</Text>
    </View>
  );
}
