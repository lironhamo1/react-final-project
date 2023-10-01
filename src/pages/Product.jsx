import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'

import { Routes, Route, Link } from 'react-router-dom';



function Product({product}) {
//const [product, setProduct] = useState({});
  return (
    <>
      <h3>Product:</h3>
      <Link to={`/EditProduct/${product.id}`}>{product.name}</Link> <br/>
      price :{product.price}<br/>
      quantity :{product.quantity}<br/>
      all costumers that buy the product
    </>
  )
}

export default Product
