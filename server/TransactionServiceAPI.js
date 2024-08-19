const accounts = require("./Accounts");
const transactions = require("./Transactions");

async function createTransaction(transaction) {
  try {
    transaction.timestamp = new Date();

    function generateUniqueId() {
      const randomNo = Math.floor(Math.random() * 10000); //random number
      return randomNo;
    }

    transaction.id = generateUniqueId();

    transaction.status = "pending";
    transactions.push(transaction);
    console.log("transaction initiated");

    const { sourceAccountNo, desAccountNo, amount, status } = transaction;
    console.log(transaction);

    if (
      !("sourceAccountNo" in transaction) ||
      !("desAccountNo" in transaction) ||
      !("amount" in transaction)
    ) {
      transaction.status = "fail";
      return { success: false, message: "required properties are missing" };
    } else if (
      typeof sourceAccountNo !== "string" || //not a string
      !sourceAccountNo.trim() ||
      !/^\d+$/.test(sourceAccountNo) ||
      typeof desAccountNo !== "string" ||
      !desAccountNo.trim() || //empty string
      !/^\d+$/.test(desAccountNo)
    ) {
      transaction.status = "fail";
      return { success: false, message: "invalid account type" };
    } else if (typeof amount !== "number") {
      transaction.status = "fail";
      return { success: false, message: "invalid amount" };
    }

    const srcAcc = accounts.find(
      (acc) => acc.accountNumber === sourceAccountNo
    );
    console.log(srcAcc);

    const desAcc = accounts.find((acc) => acc.accountNumber === desAccountNo);
    console.log(desAcc);

    if (srcAcc === null || srcAcc === undefined) {
      console.log("source account doenst exist");
      transaction.status = "fail";
      return { success: false, message: "account doenst exist" };
    } else if (desAcc === null || desAcc === undefined) {
      console.log("destination account doenst exist");
      transaction.status = "fail";

      return { success: false, message: "destination account doenst exist" };
    } else {
      if (srcAcc.balance >= amount) {
        srcAcc.balance -= amount;
        desAcc.balance += amount;
        transaction.status = "success";
        console.log("transaction successfull");
        return { success: true, transaction };
      } else {
        transaction.status = "fail";
        console.log("insufficient balance");

        return { success: false, message: "insufficient balance" };
      }
    }
  } catch (error) {
    transaction.status = "fail";
    console.log("transaction coudnt be initiated");
    console.log(error);
  }
}

module.exports = {
  createTransaction,
};
