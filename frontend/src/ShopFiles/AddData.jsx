import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddData() {
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [bsmodel, setBsmodel] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('name', name);
    formData.append('bsmodel', bsmodel);
    formData.append('price', price);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://127.0.0.1:8000/api/add/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/bord')
      console.log('✅ Data posted successfully');
      setBrand('');
      setName('');
      setBsmodel('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('❌ Error posting data:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <Card className="bg-dark text-white" style={{ width: '500px', alignItems: 'center' }}>
        <Form onSubmit={handelSubmit} style={{ padding: '20px', width: '100%' }}>
          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>BS Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter BS model"
              value={bsmodel}
              onChange={(e) => setBsmodel(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}