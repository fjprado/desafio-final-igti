import React from "react";
import Modal from "react-modal";

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const [validation, setValidation] = React.useState(true);

  const {
    _id,
    description,
    value,
    category,
    type,
    yearMonthDay,
  } = selectedTransaction;

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
      id: _id,
      description: inputDescription.value,
      value: inputValue.value,
      category: inputCategory.value,
      type: inputType.value,
      year: dataInput.getUTCFullYear(),
      month: dataInput.getUTCMonth() + 1,
      day: dataInput.getUTCDate(),
      yearMonth: `${dataInput.getFullYear()}-${(dataInput.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
      yearMonthDay: inputDate.value,
    };

    onSave(formData);
  };
  const handleClose = () => {
    onClose(null);
  };

  const validateInput = (event) => {
    if (
      (event.target.id === "inputValue" && event.target.value <= 0) ||
      (event.target.id !== "inputValue" && event.target.value === "")
    ) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Edição de Transações</span>
          <button
            className="waves-effect waves-light btn red dark-4"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              defaultValue={description}
              onChange={validateInput}
            />
            <label className="active" htmlFor="inputDescriptionChange">
              Descrição:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputValue"
              type="number"
              defaultValue={value}
              step="1"
              onChange={validateInput}
            />
            <label className="active" htmlFor="inputValue">
              Valor:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputCategory"
              type="text"
              defaultValue={category}
              onChange={validateInput}
            />
            <label className="active" htmlFor="inputCategoria">
              Categoria:
            </label>
          </div>
          <div className="input-field">
            <input id="inputType" type="text" value={type} readOnly />
            <label className="active" htmlFor="inputType">
              Tipo:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputDate"
              type="date"
              defaultValue={yearMonthDay}
              onChange={validateInput}
            />
            <label className="active" htmlFor="inputDate">
              Data:
            </label>
          </div>
          <div>
            <button
              className="waves-effect waves-light btn"
              disabled={!validation}
            >
              Salvar
            </button>
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
