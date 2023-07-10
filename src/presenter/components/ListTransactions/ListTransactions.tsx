import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";
import formatShortDate from "../../../utils/formatShortDate";
import { useMemo, useState } from "react";
import { EditTransactionForm } from "../../form/editTransaction/editTransactionForm";
import Modal from "react-native-modal";
import formatCurrencyPtBr from "../../../utils/formatCurrencyBRL";

type ListTransactionsTypes = {
  list: TransactionDataTypes[];
  delete: (id: string) => Promise<void>;
  edit: (data: TransactionDataTypes) => void;
};

// todo transformar income e outcome em constantes

const transaction = (
  item: TransactionDataTypes,
  openEditModal: (item: TransactionDataTypes) => void
) => {
  const { title, amount: value, type, category, date } = item;
  const amount = formatCurrencyPtBr(value);

  const dateFormated = formatShortDate(date);

  return (
    <TouchableOpacity testID="edit-button" onPress={() => openEditModal(item)}>
      <View style={styles.miniCard}>
        <View>
          <Text style={styles.miniCardTitle}>{title}</Text>
          {type === "outcome" ? (
            <Text style={styles.miniCardAmountNegative}>{amount}</Text>
          ) : (
            <Text style={styles.miniCardAmountPositive}>{amount}</Text>
          )}
        </View>
        <View style={styles.miniCardBottom}>
          <Text style={styles.miniCardCategory}>{category}</Text>
          <Text style={styles.miniCardDate}>{dateFormated}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export function ListTransactions({
  list,
  delete: deleteTransaction,
  edit,
}: ListTransactionsTypes) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setTransaction] = useState<TransactionDataTypes>({
    id: "",
    title: "",
    amount: 0,
    type: "income",
    category: "",
    date: new Date(),
  });

  const openEditModal = (item: TransactionDataTypes) => {
    setIsOpen(true);
    setTransaction(item);
  };

  const updatedList = useMemo(() => {
    return list;
  }, [deleteTransaction, edit, list]);

  return (
    <View>
      {list.length === 0 && (
        <Text style={styles.empty}>Nenhuma transação cadastrada</Text>
      )}
      <FlatList
        data={updatedList}
        renderItem={({ item }) => transaction(item, openEditModal)}
        keyExtractor={(item) => item.id + item.title}
        style={styles.scrollView}
      />
      <View style={{ flex: 1, borderRadius: 10 }}>
        <Modal
          isVisible={isOpen}
          testID="modal"
          onSwipeComplete={() => setIsOpen(!isOpen)}
          swipeDirection="down"
          style={{ justifyContent: "flex-end", margin: 0, borderRadius: 10 }}
        >
          <EditTransactionForm
            onClose={() => setIsOpen(!isOpen)}
            transaction={selectedTransaction}
            submit={edit}
            deleteTransaction={deleteTransaction}
          />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
  },
  miniCard: {
    height: 120,
    width: 370,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  miniCardTitle: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: "#363F5F",
  },
  miniCardAmountPositive: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
    color: "#12A454",
  },
  miniCardAmountNegative: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "400",
    color: "#E52E4D",
  },
  miniCardBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  miniCardCategory: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: "#969CB2",
  },
  miniCardDate: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "400",
    color: "#969CB2",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
  },
});
