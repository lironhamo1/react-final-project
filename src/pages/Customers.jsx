import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query ,addDoc} from 'firebase/firestore';
import db from '../firebase'
import Customer from './Customer';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [products,setProducts]= useState([]);
    const [customer,setCustomer]= useState({});
    const [product,setProduct]= useState({});

    const [isVisible,setIsVisible]=useState(false)

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
    const fetchDataProducts=async()=>{
      const q=query(collection(db,'products'));
      onSnapshot(q,(snapshot)=>{
        const data= snapshot.docs.map((doc)=>{
          return {
            id: doc.id,
            ...doc.data() //First Name,Last Name,City
          }
        })
        setProducts(data);
      })
    }
    fetchData();
    fetchDataProducts();
  })


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

  const onChangeComboBoxProducts  =(e)=>{
    const selectedId = e.target.value;
    const selectedProduct = products.filter((d) => d.id == selectedId);
    setProduct(selectedProduct[0]);
}


const onChangeComboBoxCustomers  =(e)=>{
  const selectedId = e.target.value;
  const selectedCustomer = customers.filter((c) => c.id == selectedId);
  setCustomer(selectedCustomer[0]);
}

const addPurchase= async()=>{
  const obj= {
      productID: product.id
      ,customerID: customer.id 
      ,date: new Date().toLocaleString()

  }
  await addDoc(collection(db, 'purchases'), obj);

    };
  return (
    <>
    <h1>Customers Page</h1>
    <div className='firstReg'>
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
           
 </div>
 <button onClick={() => setIsVisible(!isVisible)}>Buy Product</button>
  <div className='secondReg' style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
  <br/>
            
                <select defaultValue='' onChange={(e)=>onChangeComboBoxProducts(e)}>
                <option >{'products'}</option> 
                {products.map((prod, index) => {
                    return <option key={index} value={prod?.id}>{prod.name}</option> 
                })}
                 </select> 

                <select defaultValue='' onChange={(e)=>onChangeComboBoxCustomers(e)}>
                <option >{'customers'}</option> 
                {customers.map((customer, index) => {
                    return <option key={index} value={customer?.id}>{customer.firstName} {customer.lastName}</option> 
                })}
                </select> 
                <br/>
                <br/>
                <button onClick={addPurchase}>Buy</button>
  <br/>


 </div>









    </>

  )
}

export default Customers
