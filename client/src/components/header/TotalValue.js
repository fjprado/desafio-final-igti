import React from "react";
import { formatCurrency } from "../../helpers/FormatCurrency";

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
    fontSize: "1rem",
  },
  totalNegativo: {
    color: "red",
    fontWeight: "bold",
    fontSize: "1rem",
  },
};
