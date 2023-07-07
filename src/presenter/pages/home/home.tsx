import { useState, useCallback, useEffect } from "react";
import { FactoryTransaction } from "../../../domain/Transaction/FactoryTransaction";
import { FactoryCards } from "../../../domain/Cards/FactoryCards";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";
import { FormTypes } from "../../form/transactionForm/transactionForm";
import { HomeTemplateTypes, HomeTemplateUI } from "./templates/HomeTemplateUI";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [transaction] = useState(new FactoryTransaction().execute());
  const [cards] = useState(new FactoryCards().execute());

  const listTransactions = useCallback(async () => {
    setLoading(true);
    await cards.getCards();
    await transaction.list();
    setLoading(false);
  }, [cards, transaction]);

  const handleCreateTransaction = async (data: FormTypes) => {
    setLoading(true);
    const transactionData = {
      title: data.title,
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: new Date(),
    };

    await transaction.create(transactionData as TransactionDataTypes);
    await cards.getCards();
    await transaction.list();
    setLoading(false);
  };

  const handleEditTransaction = async (data: TransactionDataTypes) => {
    setLoading(true);
    await transaction.update(data);
    await cards.getCards();
    await transaction.list();
    setLoading(false);
  };

  const handleDeleteTransaction = async (id: string) => {
    setLoading(true);
    await transaction.delete(id);
    await cards.getCards();
    await transaction.list();
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
      income: cards.income,
      outcome: cards.outcome,
      total: cards.totalBalance,
      loading,
    },
    countItens: transaction.count,
    listTransactions: {
      list: transaction.getList,
      delete: handleDeleteTransaction,
      edit: handleEditTransaction,
      loading,
    },
  };

  return <HomeTemplateUI {...dataHomeTemplate} />;
}
