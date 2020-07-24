import axios from "axios";
const API_URL = "https://fjprado-desafio-final.herokuapp.com/api/transaction";
//const API_URL = "http://localhost:3001/api/transaction";

async function getTransactions(filteredPeriod) {
  const response = await axios.get(`${API_URL}/?period=${filteredPeriod}`);
  return response;
}

async function insertTransaction(transaction) {
  const response = await axios.post(API_URL, transaction);
  return response.data.id;
}

async function updateTransaction(transaction) {
  const response = await axios.put(`${API_URL}/${transaction.id}`, transaction);
  return response.data;
}

async function deleteTransaction(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

export {
  getTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};
