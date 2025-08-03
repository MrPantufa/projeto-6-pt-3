import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Cart from './pages/Cart';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home onCartOpen={() => setCartOpen(true)} />}
          />
          <Route
            path="/restaurant/:id"
            element={<Restaurant onCartOpen={() => setCartOpen(true)} />}
          />
        </Routes>
        {/* Drawer do carrinho, sempre montado mas só visível quando open=true */}
        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      </Router>
    </Provider>
  );
}

export default App;
