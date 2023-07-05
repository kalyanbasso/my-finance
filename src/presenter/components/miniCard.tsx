import { StyleSheet, Text, View } from "react-native";
import formatCurrency from "../../utils/formatCurrencyBRL";
import formatDateShort from "../../utils/formatShortDate";

export function MiniCard({
  title,
  amount,
  date,
  category,
}: {
  title: string;
  amount: number;
  date: Date;
  category: string;
}) {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.miniCardTitle}>{title}</Text>
      {amount < 0 ? (
        <Text style={styles.miniCardAmountNegative}>
          {formatCurrency(amount)}
        </Text>
      ) : (
        <Text style={styles.miniCardAmountPositive}>
          {formatCurrency(amount)}
        </Text>
      )}
      <View style={styles.miniCardBottom}>
        <Text style={styles.miniCardCategory}>{category}</Text>
        <Text style={styles.miniCardDate}>{formatDateShort(date)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
