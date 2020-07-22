import React from "react";
import M from "materialize-css";
import { PERIODS } from "../../helpers/Periods";
import { formatCurrency } from "../../helpers/FormatCurrency";

export default function PeriodFilter({
  onPeriodChange,
  period,
  countTransactions,
  totalReceitas,
  totalDespesas,
}) {
  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const handleChange = (event) => {
    const selectedPeriod = event.target.value;
    onPeriodChange(selectedPeriod);
  };

  const handleBackButton = () => {};

  const handleNextButton = () => {};

  return (
    <div>
      <div style={styles.periodFilter}>
        <button onClick={handleBackButton} className="btn">
          Back
        </button>
        <select value={period} onChange={handleChange}>
          {PERIODS.map((period) => {
            return (
              <option key={period} value={period}>
                {period}
              </option>
            );
          })}
        </select>
        <button onClick={handleNextButton} className="btn">
          Next
        </button>
      </div>
      <div style={styles.flexRow}>
        <span>Lançamentos: {countTransactions}</span>
        <span style={styles.totalReceita}>
          Receitas: {formatCurrency(totalReceitas)}
        </span>
        <span style={styles.totalDespesa}>
          Despesas: {formatCurrency(totalDespesas)}
        </span>
        <span
          style={
            +totalReceitas - totalDespesas >= 0
              ? styles.totalPositivo
              : styles.totalNegativo
          }
        >
          Saldo: {formatCurrency(+totalReceitas - totalDespesas)}
        </span>
      </div>
    </div>
  );
}

const styles = {
  periodFilter: {
    width: "300px",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    align: "center",
    justifyContent: "space-between",
    padding: "5px",
    margin: "auto",
    alignText: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid lightgray",
    borderRadius: "5px",
    alignText: "center",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 20px 5px 20px",
    margin: "10px",
  },
  totalReceita: {
    color: "green",
  },
  totalDespesa: {
    color: "orange",
  },
  totalPositivo: {
    color: "blue",
    fontWeight: "bold",
  },
  totalNegativo: {
    color: "red",
    fontWeight: "bold",
  },
};
