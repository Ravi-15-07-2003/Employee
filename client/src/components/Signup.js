import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    position: '',
    department: '',
    salary: ''
  });
  const [alertMsg, setAlertMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Employee signup endpoint
      await axios.post('/auth/employee/signup', formData);
      setAlertMsg('Signup successful! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setAlertMsg('Signup failed! Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Signup</h2>
      {alertMsg && <Alert variant="info">{alertMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="position" className="mt-2">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter position"
            name="position"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="department" className="mt-2">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            name="department"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="salary" className="mt-2">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter salary"
            name="salary"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Signup
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
