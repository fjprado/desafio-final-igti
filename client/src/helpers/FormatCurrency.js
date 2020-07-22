const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatCurrency(value) {
  return formatter.format(value);
}

export { formatCurrency };
