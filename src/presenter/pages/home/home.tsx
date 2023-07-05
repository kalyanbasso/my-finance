import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { Card } from "../../components/card";
import { ListTransations } from "../../components/listTransaction";
import { useState, useEffect } from "react";

import base from "../../../services/base";
import { FactoryCards } from "../../../domain/Cards/FactoryCards";
import { FactoryTransaction } from "../../../domain/Transaction/FactoryTransaction";

export function Home() {
  const [cards] = useState(new FactoryCards().execute());
  const [transactions] = useState(new FactoryTransaction().execute());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      setLoading(true);
      try {
        await cards.getCards();
        await transactions.list();
      } catch (error) {
        throw new Error("loadTransactions: ", error as Error);
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContainerLogo}>
            <View style={styles.headerLogo}>
              <Image
                source={require("../../../../assets/total.png")}
                style={styles.logo}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => base()}>
            <Text style={styles.headerButtonNewTransaction}>
              Nova transação
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal style={styles.containerCards}>
        <Card
          title="Entradas"
          amount={cards.totalCards.totalIncoming}
          date={cards.lastIncomeTransaction}
          icon="income"
        />
        <Card
          title="Saídas"
          amount={cards.totalCards.totalOutcoming}
          date={cards.lastOutcomingTransaction}
          icon="outcome"
        />
        <Card
          title="Total"
          amount={cards.totalCards.total}
          date={new Date()}
          icon="totalCard"
        />
      </ScrollView>

      <View style={styles.countItens}>
        <Text style={styles.countText}>{transactions.count} itens</Text>
      </View>

      <ListTransations data={transactions.getList} />
    </SafeAreaView>
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
