export function formatMoney(amountCents: number) {
  if (amountCents < 0) {
    return `-$${((-1 * amountCents) / 100).toFixed(2)}`;
  }
  return `$${(amountCents / 100).toFixed(2)}`;
}
