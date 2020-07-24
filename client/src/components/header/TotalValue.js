import React from "react";

export default function TotalValue({ totalValue }) {
  return (
    <div>
      <span
        style={totalValue >= 0 ? styles.totalPositivo : styles.totalNegativo}
      >
        Saldo Filtrado: {formatCurrency(totalValue)}
      </span>
    </div>
  );
}

const styles = {
  totalPositivo: {
    color: "blue",
    fontWeight: "bold",
  },
  totalNegativo: {
    color: "red",
    fontWeight: "bold",
  },
};
