import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import { Cards } from "../../components/cards";
import { useState, useEffect } from "react";
import { MiniCard } from "../../components/miniCard";

import base from "../../../services/base";
import { FactoryCards } from "../../../domain/Cards/FactoryCards";
import { FactoryTransaction } from "../../../domain/Transaction/FactoryTransaction";
import Modal from "react-native-modal";
import { CreateTransactionForm } from "../../form/createTransaction/createTransactionForm";
import { EditTransactionForm } from "../../form/editTransaction/editTransactionForm";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";

export function Home() {
  const [cards] = useState(new FactoryCards().execute());
  const [transactions] = useState(new FactoryTransaction().execute());
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState(
    {} as TransactionDataTypes
  );

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


  const openEditModal = (item: TransactionDataTypes) => {
    setTransactionSelected(item);
    setEditOpen(true);
  };

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
          <TouchableOpacity onPress={() => setOpen(!isOpen)}>
            <Text style={styles.headerButtonNewTransaction}>
              Nova transação
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Cards data={cards} />

      <View style={styles.countItens}>
        <Text style={styles.countText}>{transactions.count} itens</Text>
      </View>

      <FlatList
        data={transactions.getList()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openEditModal(item)}>
            <MiniCard
              title={item.title}
              amount={item.amount}
              category={item.category}
              date={item.date}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id + item.title}
        style={styles.scrollView}
      />

      <View style={{ flex: 1, borderRadius: 10 }}>
        <Modal
          isVisible={isOpen}
          onSwipeComplete={() => setOpen(!isOpen)}
          swipeDirection="down"
          style={{ justifyContent: "flex-end", margin: 0, borderRadius: 10 }}
        >
          <CreateTransactionForm
            setLoading={setLoading}
            onClose={() => setOpen(!isOpen)}
          />
        </Modal>
      </View>

      <View style={{ flex: 1, borderRadius: 10 }}>
        <Modal
          isVisible={isEditOpen}
          onSwipeComplete={() => setEditOpen(!isEditOpen)}
          swipeDirection="down"
          style={{ justifyContent: "flex-end", margin: 0, borderRadius: 10 }}
        >
          <EditTransactionForm
            setLoading={setLoading}
            onClose={() => setEditOpen(!isEditOpen)}
            transaction={transactionSelected}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    height: 600,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
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
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 20,
    color: "#969CB2",
  },
});
