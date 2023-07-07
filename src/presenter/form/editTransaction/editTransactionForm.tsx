import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  TransactionDataTypes,
  TransactionType,
} from "../../../entity/Transaction/TransactionEntity";

export function EditTransactionForm({
  onClose,
  transaction,
  submit,
  deleteTransaction,
}: {
  onClose: () => void;
  transaction: TransactionDataTypes;
  submit: (data: TransactionDataTypes) => void;
  deleteTransaction: (id: string) => void;
}) {
  const [title, setNome] = useState(transaction.title);
  const [amount, setPreco] = useState(transaction.amount.toString());
  const [type, setType] = useState<TransactionType>(transaction.type);
  const [category, setCategory] = useState(transaction.category);

  const handleTypeSelection = (selectedType: TransactionType) => {
    setType(selectedType);
  };

  const handlePrice = (price: string) => {
    const priceFormatted = price.replace(/\D/g, "");
    setPreco(priceFormatted);
  };

  const handleEditTransaction = async () => {
    const obj = {
      id: transaction.id,
      title: title,
      amount: Number(amount),
      type: type,
      category: category,
      date: transaction.date,
    };
    submit(obj);
    onClose();
  };

  const handleDeleteTransaction = async () => {
    const id = transaction.id;
    if (!id) {
      throw new Error("Transaction id is undefined");
    }
    deleteTransaction(id);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar transação</Text>
        <TouchableOpacity onPress={() => onClose()}>
          <Image
            style={styles.closeButton}
            source={require("../../../../assets/close.png")}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={title}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Preco"
        value={amount}
        onChangeText={handlePrice}
      />
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "income" && styles.selectedIncomeButton,
          ]}
          onPress={() => handleTypeSelection("income")}
        >
          <Image
            style={styles.typeImage}
            source={require("../../../../assets/income.png")}
          />
          <Text style={styles.type}>Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "outcome" && styles.selectedOutcomeButton,
          ]}
          onPress={() => handleTypeSelection("outcome")}
        >
          <Image
            style={styles.typeImage}
            source={require("../../../../assets/outcome.png")}
          />
          <Text style={styles.type}>Saida</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.button} onPress={handleEditTransaction}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteTransaction}
      >
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#363F5F",
  },
  input: {
    height: 50,
    borderColor: "#D7D7D7",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    backgroundColor: "#E7E9EE",
    color: "#969CB2",
  },
  button: {
    backgroundColor: "#33CC95",
    borderRadius: 5,
    padding: 15,
    textAlign: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 21,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    height: 60,
    borderColor: "#D7D7D7",
    borderWidth: 1.5,
    borderRadius: 5,
    width: "48%",
  },
  selectedIncomeButton: {
    borderColor: "#33CC95",
  },
  selectedOutcomeButton: {
    borderColor: "#E52E4D",
  },
  type: {
    fontSize: 16,
    fontWeight: "600",
    color: "#363F5F",
  },
  typeImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
  },
  deleteButton: {
    backgroundColor: "#E52E4D",
    marginTop: 10,
  },
});
