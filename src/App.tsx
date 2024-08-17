import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProductList from './page/ProductList';
import ProductDetail from './components/ProductDetails';
import Cart from './page/Cart';
import Order from './page/Order';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="h-[100vh] w-[100vw]">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
