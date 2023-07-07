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
    <View style={styles.teste}>
      {loading && <Text style={styles.loading}>Carregando...</Text>}
      <ListTransactions list={list} delete={deleteTransaction} edit={edit} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    textAlign: "center",
    marginTop: 20,
  },
  teste: {
  }
});
