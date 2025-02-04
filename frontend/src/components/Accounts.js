import React, { useState, useEffect } from "react";
import { createAccount, getAccounts } from "../api";
import { Container, Button, Table } from "react-bootstrap";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts().then(setAccounts).catch(console.error);
  }, []);

  const handleCreateAccount = async () => {
    try {
      const newAccount = { userId: "65a2b3c4d5e6f7g8h9i0j1k2", balance: 1000 };
      const createdAccount = await createAccount(newAccount);
      setAccounts([...accounts, createdAccount.account]);
    } catch (error) {
      console.error("Failed to create account");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Accounts</h2>
      <Button variant="info" className="mb-3" onClick={handleCreateAccount}>
        Create Account
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(acc => (
            <tr key={acc._id}>
              <td>{acc.userId._id}</td>  {/* ✅ Access user ID */}
              <td>{acc.userId.name}</td> {/* ✅ Access user Name */}
              <td>{acc.userId.email}</td> {/* ✅ Access user Email */}
              <td>${acc.balance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Accounts;
