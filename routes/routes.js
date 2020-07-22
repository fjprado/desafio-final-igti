const express = require("express");
const tservice = require("../services/transactionService");

const transactionRouter = express();
// C //
transactionRouter.post("/", tservice.create);
// R //
transactionRouter.get("/", tservice.findByPeriod);
transactionRouter.get("/all", tservice.findAll);
transactionRouter.get("/:description", tservice.findByDescription);
// U //
transactionRouter.put("/:id", tservice.update);
// D //
transactionRouter.delete("/:id", tservice.remove);

module.exports = transactionRouter;
