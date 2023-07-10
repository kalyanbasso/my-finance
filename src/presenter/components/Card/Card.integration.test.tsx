import React from "react";
import { render, screen } from "@testing-library/react-native";
import { CardIncoming, CardOutcoming, CardTotal } from "./Card";

describe("Card", () => {
  const value = "R$ 1,01";

  it("should render CardIncoming", () => {
    const text = "Ultima entrada dia 13 de abril";
    render(<CardIncoming text={text} value={value} />);

    expect(screen.getByText(/Entradas/i)).toBeVisible();
    expect(screen.getByText(/Ultima entrada dia 13 de abril/i)).toBeVisible();
    expect(screen.getByText(/R\$ 1,01/i)).toBeVisible();
  });

  it("should render CardOutcoming", () => {
    const text = "Ultima saída dia 13 de abril";
    render(<CardOutcoming text={text} value={value} />);
    expect(screen.getByText(/Saídas/i)).toBeVisible();
    expect(screen.getByText(/Ultima saída dia 13 de abril/i)).toBeVisible();
    expect(screen.getByText(/R\$ 1,01/i)).toBeVisible();
  });

  it("should render CardTotal", () => {
    const text = "13 à 16 de abril";
    render(<CardTotal text={text} value={value} />);
    expect(screen.getByText(/Total/i)).toBeVisible();
    expect(screen.getByText(/13 à 16 de abril/i)).toBeVisible();
    expect(screen.getByText(/R\$ 1,01/i)).toBeVisible();
  });
});
