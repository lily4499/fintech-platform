import React, { useState, useEffect } from "react";
import { createUser, getUsers } from "../api";
import { Container, Button, Table } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  const handleCreateUser = async () => {
    try {
      const newUser = { name: `User ${users.length + 1}`, email: `user${users.length + 1}@example.com`, password: "123456" };
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser.user]);
    } catch (error) {
      console.error("Failed to create user");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Users</h2>
      <Button variant="primary" className="mb-3" onClick={handleCreateUser}>
        Create User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
