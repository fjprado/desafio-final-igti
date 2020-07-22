import React from "react";
import Transaction from "./Transaction";

export default function ListTransactions({
  listTransactions,
  transactionDelete,
  transactionUpdate,
}) {
  const handleDelete = (id) => {
    const transaction = listTransactions.find(
      (transaction) => transaction._id === id
    );
    transactionDelete(transaction._id);
  };

  const handleUpdate = (id) => {
    const transaction = listTransactions.find(
      (transaction) => transaction._id === id
    );
    transactionUpdate(transaction);
  };

  return (
    <div style={styles.flexRow}>
      <ul>
        {listTransactions
          .sort((a, b) => a.day - b.day)
          .map((transaction) => {
            const { _id } = transaction;
            return (
              <li key={_id}>
                <Transaction
                  transaction={transaction}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid lightgray",
    alignItems: "center",
    margin: "0 auto",
    borderRadius: "5px",
    padding: "5px",
  },
};
