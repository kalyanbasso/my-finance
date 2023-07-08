import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

type CardTypes = {
  value: string;
  text: string;
};

const Card = ({
  title,
  iconSource,
  value,
  text,
}: CardTypes & { title: string; iconSource: any }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Image source={iconSource} style={styles.cardIcon} />
      </View>
      <View style={styles.cardLine} >
        <Text style={styles.cardAmount}>{value}</Text>
        <Text style={styles.cardDate}>{text}</Text>
      </View>
    </View>
  );
};

export function CardIncoming({ value = "0", text = "" }: CardTypes) {
  return (
    <Card
      title="Entradas"
      iconSource={require("../../../../assets/income.png")}
      value={value}
      text={text}
    />
  );
}

export function CardOutcoming({ value = "0", text = "" }: CardTypes) {
  return (
    <Card
      title="Saidas"
      iconSource={require("../../../../assets/outcome.png")}
      value={value}
      text={text}
    />
  );
}

export function CardTotal({ value = "0", text = "" }: CardTypes) {
  return (
    <Card
      title="Total"
      iconSource={require("../../../../assets/totalCard.png")}
      value={value}
      text={text}
    />
  );
}

const styles = StyleSheet.create({
  //todo verificar css
  card: {
    width: 300,
    height: 200,
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
  cardIcon: { width: 40, height: 40 },
  cardLine: {
    marginBottom: 10,
  },
});
