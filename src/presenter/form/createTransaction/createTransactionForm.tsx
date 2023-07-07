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
import { TransactionType } from "../../../entity/Transaction/TransactionEntity";
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

export function CreateTransactionForm({
  onClose,
  submit,
}: {
  onClose: () => void;
  submit: (data: FormTypes) => void;
}) {
  const [amount, setPreco] = useState("");
  const [type, setType] = useState<TransactionType>("income");
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
      title: "",
      amount: 0,
      category: "",
      type: "income",
    },
    resolver: zodResolver(schema),
  });

  const handleAmount = (text: string) => {
    const amount = text.replace(/[^0-9.-]/g, "");
    setPreco(amount);
  };

  const handleCreateTransaction = (data: FormTypes) => {
    setErrors({} as errorsTypes);

    const isValid = schema.safeParse(data);

    if (!isValid.success) {
      const errors = isValid.error.flatten();
      setErrors(errors.fieldErrors);
      return;
    }
    submit(data);
    onClose();
  };

  const handleTypeSelection = (type: TransactionType) => {
    setType(type);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
          style={[styles.input, !!errors.title && styles.inputError]}
          placeholder="Nome"
          onChangeText={(text) => method.setValue("title", text)}
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
          onChangeText={(text) => method.setValue("category", text)}
        />
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCreateTransaction(method.getValues())}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
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
  inputError: {
    borderColor: "#FF0000",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
