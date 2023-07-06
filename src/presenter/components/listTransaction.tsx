import { StyleSheet, FlatList } from "react-native";
import { MiniCard } from "./miniCard";
import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";

export function ListTransations({data}: {data: TransactionDataTypes[]}) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <MiniCard
          title={item.title}
          amount={item.amount}
          date={item.date}
          category={item.category}
        />
      )}
      keyExtractor={(item) => item.id + item.title}
      style={styles.scrollView}
    />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    height: 600,
  },
});
