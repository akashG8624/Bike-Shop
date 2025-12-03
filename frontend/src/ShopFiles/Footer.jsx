
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>BikeZone</h5>
            <p className="mb-0">© {new Date().getFullYear()} All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <a href="#privacy" className="text-light me-3">Privacy Policy</a>
            <a href="#terms" className="text-light">Terms of Service</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}