import { FlatList, View, Text, Image, StyleSheet } from "react-native";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";

type ListTransactionsTypes = {
  list: TransactionDataTypes[];
  delete: (id: string) => Promise<void>;
  edit: (data: TransactionDataTypes) => void;
};

type Transaction = {
  id: string;
  title: string;
  value: number;
  type: string;
  category: string;
  date: string;
};

const data = [
  {
    id: "1",
    title: "Almoço",
    value: 20,
    type: "outcome",
    category: "Alimentação",
    date: "2021-03-20",
  },
  {
    id: "2",
    title: "Salario",
    value: 2000,
    type: "income",
    category: "Salario",
    date: "2021-04-20",
  },
  {
    id: "3",
    title: "Almoço",
    value: 20,
    type: "outcome",
    category: "Alimentação",
    date: "2021-03-20",
  },
  {
    id: "4",
    title: "Salario",
    value: 2000,
    type: "income",
    category: "Salario",
    date: "2021-04-20",
  },
  {
    id: "5",
    title: "Almoço",
    value: 20,
    type: "outcome",
    category: "Alimentação",
    date: "2021-03-20",
  },
];

// todo transformar income e outcome em constantes

const transaction = ({ title, value, type, category, date }: Transaction) => {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.miniCardTitle}>{title}</Text>
      {type === "income" ? (
        <Text style={styles.miniCardAmountNegative}>{value}</Text>
      ) : (
        <Text style={styles.miniCardAmountPositive}>{value}</Text>
      )}
      <View style={styles.miniCardBottom}>
        <Text style={styles.miniCardCategory}>{category}</Text>
        <Text style={styles.miniCardDate}>{date}</Text>
      </View>
    </View>
  );
};

export function ListTransactions({
  list,
  delete: deleteTransaction,
  edit,
}: ListTransactionsTypes) {
  // todo aqui vai ter o form de editar tmb

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => transaction(item)}
      keyExtractor={(item) => item.id}
      style={styles.scrollView}
    />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    height: 300,
  },
  miniCard: {
    height: 120,
    width: 370,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  miniCardTitle: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: "#363F5F",
  },
  miniCardAmountPositive: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
    color: "#12A454",
  },
  miniCardAmountNegative: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
    color: "#E52E4D",
  },
  miniCardBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  miniCardCategory: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: "#969CB2",
  },
  miniCardDate: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: "#969CB2",
  },
});
