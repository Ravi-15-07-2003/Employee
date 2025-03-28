// client/src/components/AdminDashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    position: '',
    department: '',
    salary: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
  };

  const fetchEmployees = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      showAlert('Error fetching employees', 'danger');
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`/employees/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showAlert('Employee updated successfully');
        setEditingId(null);
      } else {
        // Employee add karne ke liye adminRouter endpoint use karo
        await axios.post('/admin/addEmployee', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showAlert('Employee added successfully');
      }
      setFormData({ name: '', email: '', password: '', position: '', department: '', salary: '' });
      fetchEmployees();
    } catch (err) {
      console.error(err);
      showAlert('Operation failed', 'danger');
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee._id);
    setFormData({
      name: employee.name,
      email: employee.email,
      password: '', // Password field ko reset rakh sakte hain
      position: employee.position,
      department: employee.department,
      salary: employee.salary
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showAlert('Employee deleted successfully');
      fetchEmployees();
    } catch (err) {
      console.error(err);
      showAlert('Delete failed', 'danger');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="email" className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="password" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required={!editingId}  // Edit karte waqt password optional ho sakta hai
          />
        </Form.Group>
        <Form.Group controlId="position" className="mt-2">
          <Form.Label>Position</Form.Label>
          <Form.Control 
            name="position"
            placeholder="Enter position"
            value={formData.position}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="department" className="mt-2">
          <Form.Label>Department</Form.Label>
          <Form.Control 
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="salary" className="mt-2">
          <Form.Label>Salary</Form.Label>
          <Form.Control 
            type="number"
            name="salary"
            placeholder="Enter salary"
            value={formData.salary}
            onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {editingId ? 'Update Employee' : 'Add Employee'}
        </Button>
      </Form>

      <h3>Employee List</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(emp)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(emp._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboard;
