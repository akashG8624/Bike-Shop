import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './ShopFiles/Header';
import AddData from './ShopFiles/AddData';
import Dashbord from './ShopFiles/Dashbord';
import Footer from './ShopFiles/Footer';
import CartData from './ShopFiles/CartData';
import AuthPage from './ShopFiles/AuthPage';
import PrivateRouter from './ShopFiles/PrivateRouter'; // ✅ Import this

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/bord"
            element={
              <PrivateRouter>
                <Dashbord />
              </PrivateRouter>
            }
          />
          <Route path="/add" element={<AddData />} />
          <Route path="/cart" element={<CartData />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;