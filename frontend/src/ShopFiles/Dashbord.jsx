import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Dashbord() {
  const [datas, setDatas] = useState([]);
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [bsmodel, setBsmodel] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  

  const username = localStorage.getItem('username');
  <Container className="mt-5 text-center">
      <h2>Welcome, {username} 👋</h2>
      <p>This is your secure dashboard.</p>
    </Container>

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access');

useEffect(() => {
  if (!isLoggedIn) {
    navigate('/');
  } else {
    fitchdata();
  }
}, [isLoggedIn, navigate]);

  const fitchdata = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/add/');
      setDatas(response.data);
    } catch (error) {
      console.error('❌ Fetch failed:', error);
    }
  };

  const handleAddToCart = async (item) => {
    if (!isLoggedIn) return;

    const formData = new FormData();
    formData.append('brand', item.brand);
    formData.append('name', item.name);
    formData.append('bsmodel', item.bsmodel);
    formData.append('price', String(item.price));

    try {
      const response = await fetch(item.image);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });
      formData.append('image', file);
    } catch (err) {
      console.warn('Image fetch failed:', err);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/cart/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/cart')
      console.log('✅ Data posted to cart');
    } catch (error) {
      console.error('❌ Cart post failed:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!isLoggedIn) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/del/${id}/`);
      fitchdata();
    } catch (error) {
      console.error('❌ Delete failed:', error);
    }
  };

  const openUpdateModal = (item) => {
    if (!isLoggedIn) return;

    setEditId(item.id);
    setBrand(item.brand);
    setName(item.name);
    setBsmodel(item.bsmodel);
    setPrice(item.price);
    setImage(null);
    setShowModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('name', name);
    formData.append('bsmodel', bsmodel);
    formData.append('price', String(price));
    if (image instanceof File) {
      formData.append('image', image);
    }

    try {
      await axios.patch(`http://127.0.0.1:8000/api/upd/${editId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShowModal(false);
      setEditId(null);
      fitchdata();
      console.log('✅ Item updated');
    } catch (error) {
      console.error('❌ Update failed:', error.response?.data || error.message);
    }
  };

  return (
    <Container className="mt-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {isLoggedIn &&
          datas.map((item, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm w-100">
                <Card.Img variant="top" src={item.image} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.brand}</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {item.name} <br />
                      <strong>BS Model:</strong> {item.bsmodel} <br />
                      <strong>Price:</strong> ₹{item.price}
                    </Card.Text>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      disabled={!isLoggedIn}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => openUpdateModal(item)}
                      disabled={!isLoggedIn}
                    >
                      Update
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      disabled={!isLoggedIn}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>BS Model</Form.Label>
              <Form.Control
                type="text"
                value={bsmodel}
                onChange={(e) => setBsmodel(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}