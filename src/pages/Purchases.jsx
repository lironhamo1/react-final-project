
import { useEffect, useState,Combobox } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'
import Purchase from './Purchase'

function Purchases() {
    const [purchases, setPurchases] = useState([]);
    const [products,setProducts]= useState([]);
    const [customers,setCustomers]= useState([]);

    const [product,setProduct]= useState({});
    const [customer,setCustomer]= useState({});
    const [date,setDate]= useState('');



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
    const fetchDataProducts=async()=>{
        const q=query(collection(db,'products'));
        onSnapshot(q,(snapshot)=>{
          const data= snapshot.docs.map((doc)=>{
            return {
              id: doc.id,
              ...doc.data() //CustomerID,ProductID,DATE
            }
          })
          setProducts(data);
        })
      }
      const fetchDataCustomers=async()=>{
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
    fetchDataProducts();
    fetchDataCustomers();

  })

const onChangeComboBoxProd  =(e)=>{
    const selectedId = e.target.value;
    const selectedProduct = products.filter((d) => d.id == selectedId);
    setProduct(selectedProduct);
    console.log(selectedProduct)
}

const onChangeComboBoxCust  =(e)=>{
    const selectedId = e.target.value;
    const selectedCustomer = customers.filter((d) => d.id == selectedId);
    setCustomer(selectedCustomer);
    console.log(selectedCustomer)
}

const searchPurcheses=()=>{}
  return (
    <>
      <h1>Purchases Page</h1>
      <select defaultValue='' onChange={(e)=>onChangeComboBoxProd(e)}>
      <option >{'products'}</option> 
      {products.map((prod, index) => {
        return <option key={index} value={prod?.id}>{prod.name}</option> 
      })}
 </select> 
 <br/><br/>

 <select defaultValue='' onChange={(e)=>onChangeComboBoxCust(e)}>
      <option >{'customers'}</option> 
      {customers.map((cust, index) => {
        return <option key={index} value={cust?.id}>{cust.firstName}</option> 
      })}
 </select>
 <br/><br/>
 enter purchase date : <input type='text' onChange={(e)=>setDate(e.target.value)}/>
 <br/><br/>
<button onClick={searchPurcheses}>search</button>



</>
  )

}

export default Purchases
