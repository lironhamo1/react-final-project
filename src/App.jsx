import { Routes, Route, Link } from 'react-router-dom';

import Products from './pages/Products';
import EditProduct from './pages/EditProduct';
import EditCustomer from './pages/EditCustomer';

import Customers from './pages/Customers';
import Purchases from './pages/Purchases';
import Menu from './pages/Menu';




const App = () => {
  return (
    <>
      <Routes>
       <Route path='/' element={<Menu />} />
        <Route path='/products' element={<Products />} />
        <Route path='/EditProduct/:id' element={<EditProduct />} />
        <Route path='/EditCustomer/:id' element={<EditCustomer />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/purchases' element={<Purchases />} />
      </Routes>
    </>
  );
};

export default App;
