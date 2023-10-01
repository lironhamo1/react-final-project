import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'
import Product from './Product';

function Products() {
    const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      const q=query(collection(db,'products'));
      onSnapshot(q,(snapshot)=>{
        const data= snapshot.docs.map((doc)=>{
          return {
            id: doc.id,
            ...doc.data() //Name,Price,Quantity
          }
        })
        setProducts(data);
      })
    }
    fetchData();
  })

  
  return (
    <>
      <h1>Products Page</h1>
      <h2>Amount of all purchased products: ----- </h2>
      {products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </>
  )
}

export default Products
