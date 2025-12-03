
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isLogin) {
        const res = await axios.post('http://127.0.0.1:8000/api/login/', {
          username: form.username,
          password: form.password,
        });
        localStorage.setItem('access', res.data.access);
        localStorage.setItem('username', form.username);
        setMessage('✅ Login successful');
        navigate('/bord');
      } else {
        await axios.post('http://127.0.0.1:8000/api/register/', {
          username: form.username,
          email: form.email,
          password: form.password,
        });
        setMessage('✅ Registration successful');
        setIsLogin(true);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.password?.[0] ||
        'Something went wrong';
      setMessage('❌ ' + errorMsg);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h3>
          {message && (
            <Alert variant={message.startsWith('✅') ? 'success' : 'danger'}>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary">
                {isLogin ? 'Login' : 'Register'}
              </Button>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-center"
              >
                {isLogin
                  ? 'Create an account'
                  : 'Already have an account? Login'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}