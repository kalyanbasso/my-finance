import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "long",
  });
}

function formatDateShort(date: Date) {
  return date.toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const slides = {
  totalCard: require("../../../assets/totalCard.png"),
  income: require("../../../assets/income.png"),
  outcome: require("../../../assets/outcome.png"),
};

function Card({
  title,
  amount,
  date,
  icon,
}: {
  title: string;
  amount: number;
  date: Date;
  icon: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Image
          source={slides[icon as keyof typeof slides]}
          style={{ width: 30, height: 30 }}
        />
      </View>

      <Text style={styles.cardAmount}>{formatCurrency(amount)}</Text>
      <Text style={styles.cardDate}>{`Última entrada dia ${formatDate(
        date
      )}`}</Text>
    </View>
  );
}

function MiniCard({
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

export function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContainerLogo}>
            <View style={styles.headerLogo}>
              <Image
                source={require("../../../assets/total.png")}
                style={styles.logo}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.headerButtonNewTransaction}>
              Nova transação
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal style={styles.containerCards}>
        <Card
          title="Entradas"
          amount={21335}
          date={new Date()}
          icon="income"
        />
        <Card title="Saídas" amount={1235} date={new Date()} icon="outcome" />
        <Card title="Total" amount={5} date={new Date()} icon="totalCard" />
      </ScrollView>

      <View style={styles.countItens}>
        <Text style={styles.countText}>4 itens</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <MiniCard
          title="Aluguel"
          amount={-1200}
          date={new Date()}
          category="Casa"
        />
        <MiniCard
          title="Salario"
          amount={10000}
          date={new Date()}
          category="Salario"
        />
        <MiniCard
          title="Internet"
          amount={-100}
          date={new Date()}
          category="Casa"
        />
        <MiniCard
          title="Bonus"
          amount={2200}
          date={new Date()}
          category="Bonus"
        />
        <MiniCard
          title="Comida"
          amount={-200}
          date={new Date()}
          category="Alimentação"
        />
        <MiniCard
          title="Outro bonus"
          amount={2300}
          date={new Date()}
          category="Bonus"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    paddingBottom: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#33CC95",
    padding: 20,
    paddingTop: 50,
    height: 300,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 30,
  },
  headerContainerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#21E79F",
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerLogoText: {
    fontSize: 20,
    color: "#fff",
  },
  headerButtonNewTransaction: {
    marginLeft: "auto",
    backgroundColor: "#21E79F",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  logo: {
    width: 20,
    height: 20,
  },
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
  scrollView: {
    paddingHorizontal: 20,
    height: 600,
  },
  countItens: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginLeft: "auto",
  },
  countText: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
    color: "#969CB2",
  },
});
