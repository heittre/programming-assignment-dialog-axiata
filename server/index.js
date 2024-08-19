const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json()); //middleware to parse json request bodies

//import routes
const account = require("./Accounts");
const transactions = require("./Transactions");

const { createTransaction } = require("./TransactionServiceAPI");

// Define a route
app.get("/accounts", async (req, res) => {
  console.log("/accounts");
  res.json(account);
});

// Define a route
app.get("/allTransactions", async (req, res) => {
  console.log("all transactions/");
  res.json(transactions);
});

app.post("/transaction", async (req, res) => {
  try {
    const transaction = await createTransaction(req.body);
    console.log(transaction)
    if(transaction.success === true){
      res.status(201).json(transaction);
    }else{
      res.status(200).json(transaction);
    }
    
    
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
