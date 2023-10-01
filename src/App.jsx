import { Routes, Route, Link } from 'react-router-dom';

import Products from './pages/Products';
import EditProduct from './pages/EditProduct';

import Costumers from './pages/Costumers';
import Purchases from './pages/Purchases';



const App = () => {
  return (
    <>
      <h1>Welcome to Menu</h1>
      <Link to='/products'>Products Page</Link> <br />
      <Link to='/costumers'>Costumers Page</Link> <br />
      <Link to='/purchases'>Purchases Page</Link> <br />
    

      <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/EditProduct/:id' element={<EditProduct />} />
        <Route path='/costumers' element={<Costumers />} />
        <Route path='/purchases' element={<Purchases />} />
      </Routes>
    </>
  );
};

export default App;
