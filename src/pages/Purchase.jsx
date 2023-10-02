import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query ,addDoc} from 'firebase/firestore';
import db from '../firebase'

import { Routes, Route, Link } from 'react-router-dom';



function Purchase({purchase, customers , pageName}) {
    const [product,setProduct]= useState({});
    const [products,setProducts]= useState([]);

    const [customer,setCustomer]= useState({});

    const [isVisible,setIsVisible]=useState(false)

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

    const customer1= customers.filter((d) => purchase.customerID == d.id);

    
    
    const onChangeComboBoxProd  =(e)=>{
        const selectedId = e.target.value;
        const selectedProduct = products.filter((d) => d.id == selectedId);
        setProduct(selectedProduct[0]);
    }

    const addPurchase= async()=>{
        const obj= {
            productID: product.id
            ,customerID: purchase.customerID 
            ,date: new Date().toLocaleString()

        }
   
        await addDoc(collection(db, 'purchases'), obj);

          };

  /*Product ID: <Link to={`/EditProduct/${purchase.productID}`}>{purchase.productID}</Link> <br/>  */

  return (
    <>
      Customer Name: <Link to={`/EditCustomer/${purchase.customerID}`}>{customer1[0]?.firstName}</Link> <br/>
      date :{purchase.date}
      <br/><br/>    
  

      <div style={{ display : pageName=='Product' ? 'block' : 'none' }}>
      <button onClick={() => setIsVisible(!isVisible)}>ADD</button>
      <div style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
                <select defaultValue='' onChange={(e)=>onChangeComboBoxProd(e)}>
                <option >{'products'}</option> 
                {products.map((prod, index) => {
                    return <option key={index} value={prod?.id}>{prod.name}</option> 
                })}
                    </select> 
        <button onClick={addPurchase}>SAVE</button><br/>

      </div>  
      </div>
    </>
  )
}

export default Purchase
