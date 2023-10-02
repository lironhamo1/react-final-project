import { Routes, Route, Link } from 'react-router-dom';



const Menu = () => {
  return (
    <>
      <h1>Welcome to Menu</h1>
      <Link to='/products'>Products Page</Link> <br />
      <Link to='/customers'>Customers Page</Link> <br />
      <Link to='/purchases'>Purchases Page</Link> <br />
    
    </>
  );
};

export default Menu;
