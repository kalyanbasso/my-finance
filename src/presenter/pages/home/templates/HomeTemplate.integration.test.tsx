import React from "react";
import { render, screen } from "@testing-library/react-native";
import { HomeTemplateTypes, HomeTemplateUI } from "./HomeTemplateUI";

describe("HomeTemplate", () => {
  const dataHome: HomeTemplateTypes = {
    header: {
      submit: jest.fn(),
    },
    cardsTransactions: {
      income: {
        value: "R$ 0,00",
        text: "Ultima entrada dia 13 de abril",
      },
      outcome: {
        value: "R$ 0,00",
        text: "Ultima saída dia 13 de abril",
      },
      total: {
        value: "R$ 0,00",
        text: "13 à 16 de abril",
      },
      loading: true,
    },
    countItens: 0,
    listTransactions: {
      list: [],
      delete: jest.fn(),
      edit: jest.fn(),
      loading: true,
    },
  };

  it("should render HomeTemplate", () => {
    render(<HomeTemplateUI {...dataHome} />);

    expect(screen.getByText(/13 à 16 de abril/i)).toBeVisible()
    expect(screen.getByText(/Ultima entrada dia 13 de abril/i)).toBeVisible()
    expect(screen.getByText(/Ultima saída dia 13 de abril/i)).toBeVisible()
    expect(screen.getByText(/0 itens/i)).toBeVisible()

    expect(screen.getByText(/Carregando.../i)).toBeVisible()

    // test function
    expect(dataHome.header.submit).not.toBeCalled()
    expect(dataHome.listTransactions.delete).not.toBeCalled()
    expect(dataHome.listTransactions.edit).not.toBeCalled()

  });
});
