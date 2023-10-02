import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'
import Product from './Product';

function Products() {
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);


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
    const q = query(collection(db, 'purchases'));
    onSnapshot(q, (querySnapshot) => {
      setPurchases(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });


  
  return (
    <>
      <h1>Products Page</h1>
      <h2>Amount of all purchased products: {purchases.length} </h2>
      {products.map((product) => {
        return <Product key={product.id} product={product} products={products} />;
      })}
    </>
  )
}

export default Products
