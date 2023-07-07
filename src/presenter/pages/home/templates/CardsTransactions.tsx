import { StyleSheet, ScrollView } from "react-native";

import {
  CardIncoming,
  CardOutcoming,
  CardTotal,
} from "../../../components/Card/Card";

export type CardsTransactionsTypes = {
  income: {
    value: number;
    text: string;
  };
  outcome: {
    value: number;
    text: string;
  };
  total: {
    value: number;
    text: string;
  };
  loading: boolean;
};

export function CardsTransationsUI({
  income,
  outcome,
  total,
}: CardsTransactionsTypes) {
  return (
    <ScrollView horizontal style={styles.containerCards}>
      <CardIncoming {...income} />
      <CardOutcoming {...outcome} />
      <CardTotal {...total} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerCards: {
    marginTop: -90,
    marginLeft: 10,
    height: 150,
  },
});
