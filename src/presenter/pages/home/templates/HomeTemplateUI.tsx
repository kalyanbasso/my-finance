import React from "react";
import { SafeAreaView, View } from "react-native";
import {
  CardsTransactionsTypes,
  CardsTransationsUI,
} from "./CardsTransactions";
import { HeaderUI, HeaderTypes } from "./Header";
import { ListTransactionsUI, ListTransactionsTypes } from "./ListTransactions";

export type HomeTemplateTypes = {
  header: HeaderTypes;
  cardsTransactions: CardsTransactionsTypes;
  listTransactions: ListTransactionsTypes;
};

export function HomeTemplateUI({
  header,
  cardsTransactions,
  listTransactions,
}: HomeTemplateTypes) {
  return (
    <SafeAreaView>
      <HeaderUI {...header}/>
      <View>
        <CardsTransationsUI {...cardsTransactions} />
        <ListTransactionsUI {...listTransactions}/>
      </View>
    </SafeAreaView>
  );
}
