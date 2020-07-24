import React from "react";
import Modal from "react-modal";

export default function ModalNewTransaction({ onSaveNew, onClose }) {
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      inputDescription,
      inputValue,
      inputCategory,
      inputType,
      inputDate,
    } = event.target;

    const dataInput = new Date(inputDate.value);

    const formData = {
      description: inputDescription.value,
      value: inputValue.value,
      category: inputCategory.value,
      type: inputType.value,
      year: dataInput.getUTCFullYear(),
      month: dataInput.getUTCMonth() + 1,
      day: dataInput.getUTCDate(),
      yearMonth: `${dataInput.getUTCFullYear()}-${(dataInput.getUTCMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      yearMonthDay: `${dataInput.getUTCFullYear()}-${(
        dataInput.getUTCMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${dataInput
        .getUTCDate()
        .toString()
        .padStart(2, "0")}`,
    };

    onSaveNew(formData);
  };

  const handleClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Nova Transação</span>
          <button
            className="waves-effect waves-light btn red dark-4"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input id="inputDescription" type="text" />
            <label className="active" htmlFor="inputDescriptionChange">
              Descrição:
            </label>
          </div>
          <div className="input-field">
            <input id="inputValue" type="number" step=".01" />
            <label className="active" htmlFor="inputValue">
              Valor:
            </label>
          </div>
          <div className="input-field">
            <input id="inputCategory" type="text" />
            <label className="active" htmlFor="inputCategoria">
              Categoria:
            </label>
          </div>
          <div className="input-field">
            <input id="inputType" type="text" />
            <label className="active" htmlFor="inputType">
              Tipo:
            </label>
          </div>
          <div className="input-field">
            <input id="inputDate" type="date" />
            <label className="active" htmlFor="inputDate">
              Data:
            </label>
          </div>
          <div>
            <button className="waves-effect waves-light btn">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};
