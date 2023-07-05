import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import formatCurrency from "../../utils/formatCurrencyBRL";
import formatDate from "../../utils/formatLongDatePtBr";
import formatTwoDates from "../../utils/formatTwoDates";

export function Cards({ data }: { data: any }) {
  return (
    <ScrollView horizontal style={styles.containerCards}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Entradas</Text>
          <Image
            source={require("../../../assets/income.png")}
            style={styles.cardIcon}
          />
        </View>

        <Text style={styles.cardAmount}>
          {formatCurrency(data.totalCards.totalIncoming)}
        </Text>
        <Text style={styles.cardDate}>{`Última entrada dia ${formatDate(
          data.lastIncomingDateTransaction
        )}`}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Saidas</Text>
          <Image
            source={require("../../../assets/outcome.png")}
            style={styles.cardIcon}
          />
        </View>

        <Text style={styles.cardAmount}>
          {formatCurrency(data.totalCards.totalOutcoming)}
        </Text>
        <Text style={styles.cardDate}>{`Última saída dia ${formatDate(
          data.lastOutcomingDateTransaction
        )}`}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Total</Text>
          <Image
            source={require("../../../assets/totalCard.png")}
            style={styles.cardIcon}
          />
        </View>

        <Text style={styles.cardAmount}>
          {formatCurrency(data.totalCards.total)}
        </Text>
        <Text style={styles.cardDate}>
          {formatTwoDates(data.firstDateTransaction, data.lastDateTransaction)}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerCards: {
    marginTop: -90,
    marginLeft: 10,
    height: 350,
  },
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
