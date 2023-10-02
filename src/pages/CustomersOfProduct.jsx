import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'
import { Routes, Route, Link } from 'react-router-dom';
import Purchase from './Purchase'




function CustomersOfProduct({product, pageName}) {
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
      <h3>customer that buy the product:</h3>
      {purchaseOfProduct.map((purchase, index) => {
          return (
            <Purchase purchase={purchase}  customers={customers} key={index} pageName={pageName}/>
          );
        })}
      
    </>
  )
}

export default CustomersOfProduct
