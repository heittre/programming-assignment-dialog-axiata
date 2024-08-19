const axios = require("axios");

describe("Transaction API test", () => {
  // Base URL of API
  const baseURL = "http://localhost:3000";

  test("fetch account list", async () => {
    const response = await axios.get(`${baseURL}/accounts`);

    // Test status code
    expect(response.status).toBe(200);

    // Test account list response is array
    expect(Array.isArray(response.data)).toBe(true);
    //test type of account object properties
    response.data.forEach((acc) => {
      expect(typeof acc.accountNumber).toBe("string");
      expect(typeof acc.balance).toBe("number");
      expect(typeof acc.accountHolder).toBe("string");
    });
    //test availablity of account object properties
    response.data.forEach((acc) => {
      expect(acc).toHaveProperty("accountNumber");
      expect(acc).toHaveProperty("balance");
      expect(acc).toHaveProperty("accountHolder");
    });
  });

  test("fetch transactions", async () => {
    const response = await axios.get(`${baseURL}/allTransactions`);

    // Test status code
    expect(response.status).toBe(200);

    // Test Transaction list response is array
    expect(Array.isArray(response.data)).toBe(true);
    //test type of transaction object properties
    response.data.forEach((transaction) => {
      expect(typeof transaction.sourceAccountNo).toBe("string");
      expect(typeof transaction.desAccountNo).toBe("string");
      expect(typeof transaction.amount).toBe("number");
    });
    //test availablity of transaction object properties
    response.data.forEach((transaction) => {
      expect(transaction).toHaveProperty("sourceAccountNo");
      expect(transaction).toHaveProperty("desAccountNo");
      expect(transaction).toHaveProperty("amount");
    });
  });

  test("should create new transaction", async () => {
    const successTransaction = {
      sourceAccountNo: "93484",
      desAccountNo: "12345",
      amount: 400,
    };

    const successResponse = await axios.post(
      `${baseURL}/transaction`,
      successTransaction
    );

    // Test status code
    expect(successResponse.status).toBe(201);

    // Test response data
    expect(successResponse.data).toHaveProperty("transaction");
    expect(successResponse.data.transaction.sourceAccountNo).toBe(
      successTransaction.sourceAccountNo
    );
    expect(successResponse.data.transaction.desAccountNo).toBe(
      successTransaction.desAccountNo
    );
    expect(successResponse.data.transaction.amount).toBe(
      successTransaction.amount
    );
    expect(successResponse.data.transaction).toHaveProperty("timestamp");
    expect(successResponse.data.transaction).toHaveProperty("id");
    expect(successResponse.data.transaction).toHaveProperty("status");

    const failedAmountTransaction = {
      sourceAccountNo: "93484",
      desAccountNo: "12345",
      amount: 10000,
    };

    const failedAmountResponse = await axios.post(
      `${baseURL}/transaction`,
      failedAmountTransaction
    );

    // Test status code
    expect(failedAmountResponse.status).toBe(200);

    // Test response data
    expect(failedAmountResponse.data).toHaveProperty("message");
    expect(failedAmountResponse.data.message).toBe("insufficient balance");

    const missingPropertiesTransaction = {
      sourceAccountNo: "93484",
      desAccountNo: "12345"
      
    };

    const missingPropertiesResponse = await axios.post(
      `${baseURL}/transaction`,
      missingPropertiesTransaction
    );

    // Test status code
    expect(missingPropertiesResponse.status).toBe(200);

    // Test response data
    expect(missingPropertiesResponse.data).toHaveProperty("message");
    expect(missingPropertiesResponse.data.message).toBe("required properties are missing");

    const invalidSrcAccTransaction = {
      sourceAccountNo: "fgf13",
      desAccountNo: "12345",
      amount: 300,
    };

    const invalidSrcAccResponse = await axios.post(
      `${baseURL}/transaction`,
      invalidSrcAccTransaction
    );

    // Test status code
    expect(invalidSrcAccResponse.status).toBe(200);

    // Test response data
    expect(invalidSrcAccResponse.data).toHaveProperty("message");
    expect(invalidSrcAccResponse.data.message).toBe("invalid account type");

    const invalidDesAccTransaction = {
      sourceAccountNo: "54678",
      desAccountNo: "12d345",
      amount: 300,
    };

    const invalidDesAccResponse = await axios.post(
      `${baseURL}/transaction`,
      invalidDesAccTransaction
    );

    // Test status code
    expect(invalidDesAccResponse.status).toBe(200);

    // Test response data
    expect(invalidDesAccResponse.data).toHaveProperty("message");
    expect(invalidDesAccResponse.data.message).toBe("invalid account type");

    const failedSrcAccTransaction = {
      sourceAccountNo: "23567",
      desAccountNo: "12345",
      amount: 300,
    };

    const failedSrcAccResponse = await axios.post(
      `${baseURL}/transaction`,
      failedSrcAccTransaction
    );

    // Test status code
    expect(failedSrcAccResponse.status).toBe(200);

    // Test response data
    expect(failedSrcAccResponse.data).toHaveProperty("message");
    expect(failedSrcAccResponse.data.message).toBe("account doenst exist");

    const failedDesAccTransaction = {
      sourceAccountNo: "76463",
      desAccountNo: "323333",
      amount: 300,
    };

    const failedDesAccResponse = await axios.post(
      `${baseURL}/transaction`,
      failedDesAccTransaction
    );

    // Test status code
    expect(failedDesAccResponse.status).toBe(200);

    // Test response data
    expect(failedDesAccResponse.data).toHaveProperty("message");
    expect(failedDesAccResponse.data.message).toBe(
      "destination account doenst exist"
    );
  });
});
