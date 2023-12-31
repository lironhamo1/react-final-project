import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'
import { Routes, Route, Link } from 'react-router-dom';
import Purchase from './Purchase'
import CustomersOfProduct from './CustomersOfProduct';



function Product({product,products}) {
const [purchases, setPurchases] = useState([]);
const [customers, setCustomers] = useState([]);

useEffect(()=>{
  const fetchData=async()=>{
    const q=query(collection(db,'purchases'));
    onSnapshot(q,(snapshot)=>{
      const data= snapshot.docs.map((doc)=>{
        return {
          id: doc.id,
          ...doc.data() //CustomerID,ProductID,DATE
        }
      })
      setPurchases(data);
    })
  }
  const fetchDataCost=async()=>{
    const q=query(collection(db,'customers'));
    onSnapshot(q,(snapshot)=>{
      const data= snapshot.docs.map((doc)=>{
        return {
          id: doc.id,
          ...doc.data() //CustomerID,ProductID,DATE
        }
      })
      setCustomers(data);

    })
  }
  fetchData();
  fetchDataCost();
})

const purchaseOfProduct=purchases.filter(purchase => purchase.productID == product.id)

  return (
    <>
      <h3>Product:</h3>
      <Link to={`/EditProduct/${product.id}`}>{product.name}</Link> <br/>
      price :{product.price}<br/>
      quantity :{product.quantity}<br/>

      <CustomersOfProduct product={product} pageName={'Product'}/>
    </>
  )
}

export default Product
