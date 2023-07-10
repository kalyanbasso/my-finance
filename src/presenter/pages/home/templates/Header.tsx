import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FormTypes } from "../../../form/transactionForm/transactionForm";
import { CreateTransactionForm } from "../../../form/createTransaction/createTransactionForm";
import { useState } from "react";
import Modal from "react-native-modal";

export type HeaderTypes = {
  submit: (data: FormTypes) => Promise<void>;
};

export function HeaderUI({ submit }: HeaderTypes) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContainerLogo}>
          <View style={styles.headerLogo}>
            <Image
              source={require("../../../../../assets/total.png")}
              style={styles.logo}
            />
          </View>
        </View>
        <TouchableOpacity testID="new-transaction-button" onPress={() => setIsOpen(true)}>
          <Text style={styles.headerButtonNewTransaction}>Nova transação</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, borderRadius: 10 }}>
        <Modal
          isVisible={isOpen}
          onSwipeComplete={() => setIsOpen(!isOpen)}
          swipeDirection="down"
          style={{ justifyContent: "flex-end", margin: 0, borderRadius: 10 }}
        >
          <CreateTransactionForm
            onClose={() => setIsOpen(!isOpen)}
            submit={submit}
          />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //todo verificar css
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#33CC95",
    padding: 20,
    paddingTop: 50,
    height: 235,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
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
});
