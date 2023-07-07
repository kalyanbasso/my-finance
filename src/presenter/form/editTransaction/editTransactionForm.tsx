import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  TransactionDataTypes,
  TransactionType,
} from "../../../entity/Transaction/TransactionEntity";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export type FormTypes = {
  title: string;
  amount: number;
  category: string;
  type: TransactionType;
};

type errorsTypes = {
  title?: string[] | undefined;
  amount?: string[] | undefined;
  category?: string[] | undefined;
};

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
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [type, setType] = useState<TransactionType>(transaction.type);
  const [errors, setErrors] = useState({} as errorsTypes);



  const schema = zod.object({
    title: zod
      .string()
      .min(3, "O título deve ter no mínimo 3 caracteres")
      .max(255, "O título deve ter no máximo 255 caracteres"),
    type: zod
      .enum(["income", "outcome"])
      .describe('O tipo deve ser "income" ou "outcome"'),
    amount: zod.number().refine(
      (value: number) => {
        if (type === "income") {
          return value > 0;
        } else if (type === "outcome") {
          return value < 0;
        }
        return false;
      },
      {
        message:
          'O valor deve ser maior que 0 para "Entrada" ou menor que 0 para "Saida"',
      }
    ),
    category: zod
      .string()
      .min(3, "A categoria deve ter no mínimo 3 caracteres")
      .max(255, "A categoria deve ter no máximo 255 caracteres"),
  });

  const method = useForm<FormTypes>({
    defaultValues: {
      title,
      amount: Number(amount),
      category,
      type,
    },
    resolver: zodResolver(schema),
  });

  const handleTypeSelection = (selectedType: TransactionType) => {
    setType(selectedType);
  };

  const handleAmount = (text: string) => {
    const amount = text.replace(/[^0-9.-]/g, "");
    setAmount(amount);
  };

  const handleEditTransaction = (data: FormTypes) => {
    setErrors({} as errorsTypes);

    const isValid = schema.safeParse(data);
    if (!isValid.success) {
      const errors = isValid.error.flatten();
      setErrors(errors.fieldErrors);
      return;
    }
    const obj = {
      ...data,
      date: transaction.date,
      id: transaction.id,
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
      <ScrollView>
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
          onChangeText={(text) => {
            setTitle(text);
            method.setValue("title", text);
          }}
        />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Preco"
          value={amount}
          onChangeText={(text) => {
            handleAmount(text);
            method.setValue("amount", Number(text));
          }}
        />
        {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
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
          onChangeText={(text) => {
            setCategory(text);
            method.setValue("category", text);
          }}
        />
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}
        <TouchableOpacity style={styles.button} onPress={() => handleEditTransaction(method.getValues())}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDeleteTransaction}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </ScrollView>
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
  error: {
    color: "red",
    marginBottom: 10,
  },
});
