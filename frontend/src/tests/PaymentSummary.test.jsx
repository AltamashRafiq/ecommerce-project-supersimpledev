import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { PaymentSummary } from "../pages/checkout/PaymentSummary";
import axios from "axios";
import userEvent from "@testing-library/user-event";

function Location() {
  const location = useLocation();

  return <div data-testid="url-path">{location.pathname}</div>;
}

vi.mock("axios");

describe("Payment summary component", () => {
  let loadCart;
  let paymentSummary;

  beforeEach(() => {
    loadCart = vi.fn();
    paymentSummary = {
      totalItems: 32,
      productCostCents: 36859,
      shippingCostCents: 999,
      totalCostBeforeTaxCents: 37858,
      taxCents: 3786,
      totalCostCents: 41644,
    };

    render(
      <MemoryRouter>
        <Location />
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );
  });

  it("displays the correct payment summary", async () => {
    const paymentSummaryRows = await screen.findAllByTestId(
      "payment-summary-row"
    );

    expect(paymentSummaryRows.length).toBe(5);
    expect(
      within(paymentSummaryRows[0]).getByTestId("payment-summary-item-count")
    ).toHaveTextContent("Items (32)");
    expect(
      within(paymentSummaryRows[0]).getByTestId("payment-summary-money")
    ).toHaveTextContent("$368.59");
    expect(
      within(paymentSummaryRows[1]).getByTestId("payment-summary-money")
    ).toHaveTextContent("$9.99");
    expect(
      within(paymentSummaryRows[2]).getByTestId("payment-summary-money")
    ).toHaveTextContent("$378.58");
    expect(
      within(paymentSummaryRows[3]).getByTestId("payment-summary-money")
    ).toHaveTextContent("$37.86");
    expect(
      within(paymentSummaryRows[4]).getByTestId("payment-summary-money")
    ).toHaveTextContent("$416.44");
  });

  it("can place the order", async () => {
    const placeOrderButton = await screen.findByTestId("place-order-button");
    const user = userEvent.setup();
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();

    const urlPath = screen.getByTestId("url-path");
    expect(urlPath).toHaveTextContent("/orders");
  });
});
