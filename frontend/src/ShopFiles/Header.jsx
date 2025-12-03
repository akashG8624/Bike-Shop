import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate(); // ✅ Enable navigation

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('username');
    navigate('/'); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BikeZone</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/add">Add Product</Nav.Link>
          <Nav.Link as={Link} to="/bord">Display Products</Nav.Link>
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
        </Nav>
        {username && (
          <div className="d-flex align-items-center gap-2">
            <span className="text-light">👋 {username}</span>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}