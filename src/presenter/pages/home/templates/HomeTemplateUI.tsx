import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import {
  CardsTransactionsTypes,
  CardsTransationsUI,
} from "./CardsTransactions";
import { HeaderUI, HeaderTypes } from "./Header";
import { ListTransactionsUI, ListTransactionsTypes } from "./ListTransactions";

export type HomeTemplateTypes = {
  header: HeaderTypes;
  cardsTransactions: CardsTransactionsTypes;
  countItens: number;
  listTransactions: ListTransactionsTypes;
};

export function HomeTemplateUI({
  header,
  cardsTransactions,
  countItens,
  listTransactions,
}: HomeTemplateTypes) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="auto" />
      <HeaderUI {...header} />
      <CardsTransationsUI {...cardsTransactions} />
      <View style={styles.countItens}>
        <Text style={styles.countText}>{countItens} itens</Text>
      </View>
      <View style={styles.listTransactions}>
        <ListTransactionsUI {...listTransactions} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  countItens: {
    marginLeft: "auto",
    marginTop: -70,
    marginRight: 20,
  },
  countText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 20,
    color: "#969CB2",
  },
  safeAreaView: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#F0F2F5"
  },
  listTransactions: {
    flex: 1,
  },
});
