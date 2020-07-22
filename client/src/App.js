import React from "react";
import Modal from "react-modal";

import PeriodFilter from "./components/header/PeriodFilter";
import SearchBar from "./components/header/SearchBar";
import ListTransactions from "./components/transactions/ListTransactions";
import {
  deleteTransaction,
  getTransactions,
  updateTransaction,
  insertTransaction,
} from "./services/TransactionService";
import ModalTransaction from "./components/modal/ModalTransaction";
import ModalNewTransaction from "./components/modal/ModalNewTransaction";
Modal.setAppElement("*");

export default function App() {
  const [initialPeriod, setInitialPeriod] = React.useState("2020-07");
  const [transactions, setTransactions] = React.useState([]);
  const [transactionsFiltered, setTransactionsFiltered] = React.useState([]);
  const [totalReceitas, setTotalReceitas] = React.useState(0);
  const [totalDespesas, setTotalDespesas] = React.useState(0);
  const [filter, setFilter] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState({});
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [isModalNewOpen, setIsModalNewOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchTransactions = async (filteredPeriod) => {
      const res = await getTransactions(filteredPeriod);
      setTransactions(res.data);
      setTotalReceitas(calculateTotalReceitas(res.data));
      setTotalDespesas(calculateTotalDespesas(res.data));
    };
    fetchTransactions(initialPeriod);
    if (status) setStatus(false);
  }, [initialPeriod, status]);

  React.useEffect(() => {
    const filteredTransactions = async (filter) => {
      const filteredItems = transactions.filter((item) => {
        return item.description.toLowerCase().includes(filter.toLowerCase());
      });
      setTransactionsFiltered(filteredItems);
    };
    filteredTransactions(filter);
  }, [filter]);

  const calculateTotalReceitas = (transactions) => {
    const totalReceitas = transactions.reduce((accumulator, current) => {
      return current.type === "+" ? accumulator + current.value : accumulator;
    }, 0);
    return totalReceitas;
  };

  const calculateTotalDespesas = (transactions) => {
    const totalDespesas = transactions.reduce((accumulator, current) => {
      return current.type === "-" ? accumulator + current.value : accumulator;
    }, 0);
    return totalDespesas;
  };

  const showTransactions = (period) => {
    if (period !== null) {
      setInitialPeriod(period);
    }
  };

  const handleFilterChange = (filter) => {
    if (filter !== null || "") {
      setFilter(filter);
    }
  };

  const handleDeleteTransaction = async (id) => {
    const res = await deleteTransaction(id);
    console.log(res);
    setStatus(true);
  };

  const handleUpdateTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalEditOpen(true);
  };

  const handleNewTransaction = () => {
    setIsModalNewOpen(true);
  };

  const handleUpdate = async (formData) => {
    const res = await updateTransaction(formData);
    console.log(res);
    setStatus(true);
    setIsModalEditOpen(false);
  };

  const handleCreate = async (formData) => {
    const res = await insertTransaction(formData);
    console.log(res);
    setStatus(true);
    setIsModalNewOpen(false);
  };

  const handleClose = () => {
    setIsModalEditOpen(false);
    setIsModalNewOpen(false);
  };

  return (
    <div className="container">
      <h1 style={styles.pageTitle}>Desafio Final do Bootcamp Full Stack</h1>
      <h4 style={styles.title}>Controle Financeiro Pessoal</h4>

      <PeriodFilter
        period={initialPeriod}
        onPeriodChange={showTransactions}
        countTransactions={transactions.length}
        totalReceitas={totalReceitas}
        totalDespesas={totalDespesas}
      />
      <div className="row">
        <div className="col s3 flow-text">
          <button onClick={handleNewTransaction} className="btn">
            + Novo Lançamento
          </button>
        </div>
        <div className="col s9 flow-text">
          <SearchBar filter={filter} onFilterChange={handleFilterChange} />
        </div>
      </div>

      <ListTransactions
        listTransactions={filter !== "" ? transactionsFiltered : transactions}
        transactionDelete={handleDeleteTransaction}
        transactionUpdate={handleUpdateTransaction}
      />

      {isModalEditOpen && (
        <ModalTransaction
          ariaHideApp={false}
          onSave={handleUpdate}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}

      {isModalNewOpen && (
        <ModalNewTransaction
          ariaHideApp={false}
          onSaveNew={handleCreate}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

const styles = {
  pageTitle: {
    textAlign: "center",
    fontSize: "2.2rem",
  },
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
    color: "#00897b",
  },
};
