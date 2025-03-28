// client/src/components/EmployeeDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'employee') {
      navigate('/login');
    } else {
      fetchEmployee();
    }
  }, [navigate]);

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
  };

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem('token');
      // Assuming a protected route exists to fetch current employee details,
      // otherwise, you can use the employee data returned from login and store it.
      const res = await axios.get('/employees/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployee(res.data);
    } catch (err) {
      console.error(err);
      showAlert('Error fetching employee details', 'danger');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Employee Dashboard</h2>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      {employee ? (
        <Card>
          <Card.Body>
            <Card.Title>{employee.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {employee.email}<br />
              <strong>Position:</strong> {employee.position}<br />
              <strong>Department:</strong> {employee.department}<br />
              <strong>Salary:</strong> {employee.salary}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default EmployeeDashboard;
