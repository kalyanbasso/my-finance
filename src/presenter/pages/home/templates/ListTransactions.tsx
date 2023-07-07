import { View, Text, StyleSheet } from "react-native";
import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";
import { ListTransactions } from "../../../components/ListTransactions/ListTransactions";

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
      {loading && <Text>Carregando...</Text>}
      <ListTransactions list={list} delete={deleteTransaction} edit={edit} />
    </View>
  );
}

const styles = StyleSheet.create({});
