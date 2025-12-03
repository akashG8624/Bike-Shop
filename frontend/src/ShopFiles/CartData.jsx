import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CartData() {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login
    } else {
      fitchdata();
    }
  }, [navigate]);

  const fitchdata = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cart/');
      setDatas(response.data);
    } catch (error) {
      console.error('❌ Fetch cart failed:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!isLoggedIn) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/remove/${id}/`);
      fitchdata();
    } catch (error) {
      console.error('❌ Remove from cart failed:', error);
    }
  };

  return (
    <div>
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
                      Remove From Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}