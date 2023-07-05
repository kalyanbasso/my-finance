import { StyleSheet, Text, View, Image } from "react-native";
import formatCurrency from "../../utils/formatCurrencyBRL";
import formatDate from "../../utils/formatLongDatePtBr";

const slides = {
  totalCard: require("../../../assets/totalCard.png"),
  income: require("../../../assets/income.png"),
  outcome: require("../../../assets/outcome.png"),
};

export function Card({
  title,
  amount,
  date,
  icon,
}: {
  title: string;
  amount: number;
  date?: Date;
  icon: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Image
          source={slides[icon as keyof typeof slides]}
          style={styles.cardIcon}
        />
      </View>

      <Text style={styles.cardAmount}>{formatCurrency(amount)}</Text>
      <Text style={styles.cardDate}>{`Última entrada dia ${formatDate(
        date
      )}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 180,
    borderRadius: 5,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: "#363F5F",
  },
  cardAmount: {
    fontSize: 30,
    color: "#363F5F",
    fontWeight: "500",
    lineHeight: 45,
  },
  cardStrongAmount: {
    color: "red",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 45,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardDate: {
    fontSize: 12,
    color: "#969CB2",
    lineHeight: 18,
  },
  cardIcon: { width: 30, height: 30 },
});
