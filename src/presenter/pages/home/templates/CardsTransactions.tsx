import { Text, View } from "react-native";

export type CardsTransactionsTypes = {
  income: {
    value: number;
    lastTransaction: string;
  };
  outcome: {
    value: number;
    lastTransaction: string;
  };
  total: {
    value: number;
    rangeOfDates: string;
  };
  loading: boolean;
};

export function CardsTransationsUI({}: CardsTransactionsTypes) {
  return (
    <View>
      <Text>asdasd</Text>
    </View>
  );
}
