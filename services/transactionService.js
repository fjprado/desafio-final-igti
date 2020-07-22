const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const create = async (req, res) => {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = req.body;
  const newTransaction = new TransactionModel({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  });

  try {
    await newTransaction.save(newTransaction);
    res.send({ message: "Transação inserida com sucesso." });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao inserir transação." });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await TransactionModel.find();
    if (data.length < 1) {
      res.status(404).send({ message: "Nenhuma transaction encontrada" });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar os documentos" });
  }
};

const findByPeriod = async (req, res) => {
  if (req.query.period === undefined) {
    res.send({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    });
  }

  try {
    // const yearSearch = req.query.period.split("-")[0];
    // const monthSearch = req.query.period.split("-")[1];
    // const data = await TransactionModel.find({
    //   year: yearSearch,
    //   month: monthSearch,
    // });
    const searchPeriod = req.query.period;
    const data = await TransactionModel.find({ yearMonth: searchPeriod });

    if (data.length < 1) {
      res.status(404).send({ message: "Nenhuma transaction encontrada" });
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar os documentos" });
  }
};

const findByDescription = async (req, res) => {
  const id = req.params.description;

  try {
    const data = await TransactionModel.findById({ description: description });

    if (data.length < 1) {
      res.status(404).send({
        message: "Nenhuma transação encontrada com a descrição: " + description,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar o documento com descrição: " + description,
    });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: "Nenhuma transação encontrada para atualizar" });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar o Pokemon id: " + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndDelete({ _id: id });

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: "Nenhuma transação encontrada para exclusão" });
    } else {
      res.send({ message: "Transação excluida com sucesso" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar a transação id: " + id });
  }
};

module.exports = {
  create,
  findAll,
  findByPeriod,
  findByDescription,
  update,
  remove,
};
