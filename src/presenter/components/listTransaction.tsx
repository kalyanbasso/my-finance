import { StyleSheet, FlatList } from "react-native";
import { MiniCard } from "./miniCard";
import { TransactionDataType } from "../../entity/Transaction/TransactionEntity";

export function ListTransations({data}: {data: TransactionDataType[]}) {
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
      keyExtractor={(item) => item.id}
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
