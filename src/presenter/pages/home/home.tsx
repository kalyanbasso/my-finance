import { useState, useCallback, useEffect } from "react";
import { FactoryTransaction } from "../../../domain/Transaction/FactoryTransaction";
import { FactoryCards } from "../../../domain/Cards/FactoryCards";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";
import { FormTypes } from "../../form/createTransaction/createTransactionForm";
import { HomeTemplateTypes, HomeTemplateUI } from "./templates/HomeTemplateUI";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [transaction] = useState(new FactoryTransaction().execute());
  const [cards] = useState(new FactoryCards().execute());

  const listTransactions = useCallback(async () => {
    console.log("listTransactions");
    setLoading(true);
    await cards.getCards();
    await transaction.list();
    setLoading(false);
  }, [cards, transaction]);

  const handleCreateTransaction = async (data: FormTypes) => {
    setLoading(true);
    console.log("handleCreateTransaction");
    // const transactionData = {
    //   title: data.title,
    //   amount: data.amount,
    //   type: data.type,
    //   category: data.category,
    //   date: new Date(),
    // };

    // await transaction.create(transactionData as TransactionDataTypes);
    // await cards.getCards();
    setLoading(false);
  };

  const handleEditTransaction = async (data: TransactionDataTypes) => {
    setLoading(true);
    console.log("handleEditTransaction");
    // await transaction.update(data);
    // await cards.getCards();
    setLoading(false);
  };

  const handleDeleteTransaction = async (id: string) => {
    setLoading(true);
    console.log("handleDeleteTransaction");
    // await transaction.delete(id);
    // await cards.getCards();
    setLoading(false);
  };

  useEffect(() => {
    listTransactions();
  }, [listTransactions]);

  const dataHomeTemplate: HomeTemplateTypes = {
    header: {
      submit: handleCreateTransaction,
    },
    cardsTransactions: {
      income: {
        value: 123,
        text: "asdasd",
      },
      outcome: {
        value: 123,
        text: "asdasd",
      },
      total: {
        value: 123,
        text: "asdasd",
      },
      loading,
    },
    listTransactions: {
      list: transaction.getList(), // todo corrigir
      delete: handleDeleteTransaction,
      edit: handleEditTransaction,
      loading,
    },
  };

  return <HomeTemplateUI {...dataHomeTemplate} />;
}
