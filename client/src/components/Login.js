import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'employee' });
  const [alertMsg, setAlertMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formData.role === 'admin' ? '/auth/admin/login' : '/auth/employee/login';
      const res = await axios.post(endpoint, { email: formData.email, password: formData.password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      
      if (res.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } catch (err) {
      console.error(err);
      setAlertMsg('Login failed! Please check your credentials.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Login</h2>
      {alertMsg && <Alert variant="danger">{alertMsg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            name="email" 
            onChange={handleChange} 
            required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={handleChange} 
            required />
        </Form.Group>
        <Form.Group controlId="formBasicRole" className="mt-2">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
      <div className="mt-3">
      <p>
       Don't have an account? <Link to="/signup" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Create one</Link>
      </p>
      </div>
    </Container>
  );
}

export default Login;
