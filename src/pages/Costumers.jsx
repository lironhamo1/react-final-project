import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'


function Costumers() {
    const [costumers, setCostumers] = useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      const q=query(collection(db,'costumers'));
      onSnapshot(q,(snapshot)=>{
        const data= snapshot.docs.map((doc)=>{
          return {
            id: doc.id,
            ...doc.data() //First Name,Last Name,City
          }
        })
        setCostumers(data);
      })
    }
    fetchData();
  })

  
  return (
    <>
      <h1>Costumers Page</h1>
    </>
  )
}

export default Costumers
