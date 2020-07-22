import React from "react";
import { formatCurrency } from "../../helpers/FormatCurrency";
import Action from "../header/Action";

export default function Transaction({ transaction, onDelete, onUpdate }) {
  const { _id, description, value, category, type, day } = transaction;

  const handleActionClick = (id, type) => {
    if (type === "delete_forever") {
      onDelete(id);
    }
    if (type === "edit") {
      onUpdate(id);
    }
  };

  return (
    <div style={type === "+" ? styles.flexRowReceita : styles.flexRowDespesa}>
      <div style={styles.textDay}>{day}</div>
      <div style={styles.flexColumn}>
        <div style={styles.textCategory}>
          <span>{category}</span>
        </div>
        <div style={styles.textDescription}>
          <span>{description}</span>
        </div>
      </div>
      <div style={styles.textValue}>
        <span className="flow-text">{formatCurrency(value)}</span>
      </div>
      <div style={styles.options}>
        <Action onActionClick={handleActionClick} id={_id} type="edit" />
        <Action
          onActionClick={handleActionClick}
          id={_id}
          type="delete_forever"
        />
      </div>
    </div>
  );
}

const styles = {
  flexRowReceita: {
    background: "#66bb6a",
    display: "flex",
    flexContent: "row",
    alignItems: "center",
    border: "1px solid lightgray",
    margin: "10px",
    borderRadius: "5px",
    padding: "10px",
  },
  flexRowDespesa: {
    background: "#ff7043 ",
    display: "flex",
    flexContent: "row",
    alignItems: "center",
    border: "1px solid lightgray",
    margin: "10px",
    borderRadius: "5px",
    padding: "10px",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    marginLeft: "15px",
    borderRadius: "5px",
    minWidth: "500px",
  },
  textDay: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    minWidth: "30px",
  },
  textCategory: {
    fontSize: "1.1rem",
    textAlign: "left",
    fontWeight: "bold",
  },
  textDescription: {
    fontSize: "1.0rem",
    textAlign: "left",
  },
  textValue: {
    textAlign: "right",
    minWidth: "150px",
    margin: "0px 20px 0px 20px",
  },
  options: {
    alignItems: "center",
    minWidth: "50px",
    margin: "0px 15px 0px 15px",
    justifyContent: "space-between",
  },
};
