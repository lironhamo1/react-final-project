import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'
import Customer from './Customer';

function Customers() {
    const [customers, setCustomers] = useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      const q=query(collection(db,'customers'));
      onSnapshot(q,(snapshot)=>{
        const data= snapshot.docs.map((doc)=>{
          return {
            id: doc.id,
            ...doc.data() //First Name,Last Name,City
          }
        })
        setCustomers(data);
      })
    }
    fetchData();
  })

  
  return (
    <>
    <h1>Customers Page</h1>
      <table>

    <tbody>
  <tr >
    <td>Customer Name</td>
    <td>List products</td>
    <td>Purchased dates</td>
  </tr>
  </tbody>
  </table>
  {customers.map((cost, index) => {
          return (
            <Customer customer={cost} key={index}/>
          );
        })}
           

    </>
  )
}

export default Customers
