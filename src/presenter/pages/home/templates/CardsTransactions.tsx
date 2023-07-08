import { StyleSheet, ScrollView, View } from "react-native";

import {
  CardIncoming,
  CardOutcoming,
  CardTotal,
} from "../../../components/Card/Card";

export type CardsTransactionsTypes = {
  income: {
    value: string;
    text: string;
  };
  outcome: {
    value: string;
    text: string;
  };
  total: {
    value: string;
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
    <View style={styles.relative}>
      <ScrollView horizontal style={styles.containerCards} showsHorizontalScrollIndicator={false} >
        <CardIncoming {...income} />
        <CardOutcoming {...outcome} />
        <CardTotal {...total} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  relative: {
    position: "relative",
    top: -100,
  },
  containerCards: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  
});