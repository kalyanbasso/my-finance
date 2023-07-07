import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { FactoryTransaction } from "../../../domain/Transaction/FactoryTransaction";
import { TransactionType } from "../../../entity/Transaction/TransactionEntity";

export type FormTypes = {
  title: string;
  amount: number;
  category: string;
  type: TransactionType;
}


export function CreateTransactionForm({
  onClose,
  setLoading,
}: {
  onClose: () => void;
  setLoading: (loading: boolean) => void;
}) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [type, setType] = useState<TransactionType | undefined>(undefined);
  const [category, setCategory] = useState("");
  const factoryTransaction = new FactoryTransaction().execute();

  const handleTypeSelection = (selectedType: TransactionType) => {
    setType(selectedType);
  };

  const handlePrice = (price: string) => {
    const priceFormatted = price.replace(/\D/g, "");
    setPreco(priceFormatted);
  };

  const handleCreateTransaction = async () => {
    setLoading(true);

    const validate = validateForm();

    if (!validate) {
      return;
    }

    if (!type) {
      alert("Tipo é obrigatório");
      return;
    }

    await factoryTransaction.create({
      id: undefined,
      title: nome,
      amount: Number(preco),
      type,
      category,
      date: new Date(),
    });
    setLoading(false);
    onClose();
  };

  const validateForm = () => {
    if (!nome) {
      alert("Nome é obrigatório");
      return false;
    }

    if (!preco) {
      alert("Preço é obrigatório");
      return false;
    }

    if (!type) {
      alert("Tipo é obrigatório");
      return false;
    }

    if (!category) {
      alert("Categoria é obrigatório");
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastrar transacao</Text>
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
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Preco"
        value={preco}
        onChangeText={handlePrice}
      />
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "income" && styles.selectedTypeButton,
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
            type === "outcome" && styles.selectedTypeButton,
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

      <TouchableOpacity style={styles.button} onPress={handleCreateTransaction}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  selectedTypeButton: {
    borderColor: "#33CC95",
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
});
