
import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'


function Purchases() {
    const [purchases, setPurchases] = useState([]);

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
    fetchData();
  })

  
  return (
    <>
      <h1>Purchases Page</h1>
    </>
  )
}

export default Purchases
