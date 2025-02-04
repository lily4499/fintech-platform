import React, { useState, useEffect } from "react";
import { createTransaction, getTransactions } from "../api";
import { Container, Button, Table } from "react-bootstrap";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions).catch(console.error);
  }, []);

  const handleCreateTransaction = async () => {
    try {
      const newTransaction = { userId: "65a2b3c4d5e6f7g8h9i0j1k2", amount: 200, type: "deposit" };
      const createdTransaction = await createTransaction(newTransaction);
      setTransactions([...transactions, createdTransaction.transaction]);
    } catch (error) {
      console.error("Failed to create transaction");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Transactions</h2>
      <Button variant="success" className="mb-3" onClick={handleCreateTransaction}>
        Add Transaction
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td>{tx.userId._id}</td>  {/* ✅ Access userId object correctly */}
              <td>{tx.userId.name}</td> {/* ✅ Access user details */}
              <td>{tx.userId.email}</td> {/* ✅ Access user email */}
              <td>${tx.amount}</td>
              <td>{tx.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Transactions;
