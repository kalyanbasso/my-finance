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
  countItens = 0,
  listTransactions,
}: HomeTemplateTypes) {
  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <HeaderUI {...header} />
      <CardsTransationsUI {...cardsTransactions} />
      <View style={styles.countItens}>
        <Text style={styles.countText}>{countItens} itens</Text>
      </View>
      <ListTransactionsUI {...listTransactions} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // todo verificar css
  countItens: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginLeft: "auto",
  },
  countText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 20,
    color: "#969CB2",
  },
});
