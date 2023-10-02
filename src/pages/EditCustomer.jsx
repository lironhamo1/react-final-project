import { useEffect, useState,View } from 'react'
import { collection,doc,onSnapshot,query,updateDoc,deleteDoc } from 'firebase/firestore';
import db from '../firebase'
import { useParams } from 'react-router-dom';
//note- shift alt a

function EditCustomer() {
    const {id} = useParams();
    const [customer, setCustomer] = useState({});
    const [purchases, setPurchases] = useState([]);

    useEffect(()=>{
        const fetchData=async()=>{
            const q = query(doc(db, 'customers', id));
            onSnapshot(q, (doc) => {
                setCustomer({ id: doc.id, ...doc.data() });
            }); 
        }
        const fetchDataPurchases=async()=>{
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
        fetchDataPurchases();
      },[])
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(customer)
        await updateDoc(doc(db, 'customers', id), customer);
        const custPurshes= purchases.filter((pur)=>pur.customerID==id)
        console.log(custPurshes)
      };
 
const deleteCostumer=async ()=>{
        await deleteDoc(doc(db, 'customers', id));
        const custPurshes= purchases.filter((pur)=>pur.customerID==id)
        console.log(custPurshes)
        custPurshes.map((index,pursh)=>{
             deleteDoc(doc(db, 'purchases', pursh));
        })
        //await deleteDoc(doc(db, 'purchases', custPurshes));

}
  return (
    <>
   <h1>edit Customer Page</h1>
   <form onSubmit={handleSubmit}>
        First Name:
        <input type='text' defaultValue={customer.firstName} onInput={(e) => setCustomer({...customer,firstName:e.target.value})} /> <br />
        Last Name:
        <input type='text' defaultValue={customer.lastName} onInput={(e) => setCustomer({...customer,lastName: e.target.value})} /> <br />
        City:
        <input type='text' defaultValue={customer.city} onInput={(e) => setCustomer({...customer,city:e.target.value})} /> <br />

        <button type='submit'>Save</button>
        <button onClick={deleteCostumer}>Delete</button><br/>
      </form>
      

     </>

  )
}

export default EditCustomer
