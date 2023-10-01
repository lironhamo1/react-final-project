import { useEffect, useState,View } from 'react'
import { collection,doc,onSnapshot,query,updateDoc,deleteDoc } from 'firebase/firestore';
import db from '../firebase'
import { useParams } from 'react-router-dom';

//note- shift alt a

function EditProduct() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    useEffect(()=>{
        const fetchData=async()=>{
            const q = query(doc(db, 'products', id));
            onSnapshot(q, (doc) => {
                setProduct({ id: doc.id, ...doc.data() });
            }); 
        }
        fetchData();
      },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, 'products', id), product);
      };
 
const deleteProduct=async ()=>{
        await deleteDoc(doc(db, 'products', id));
}
  return (
    <>
   <h1>edit product Page</h1>
   <form onSubmit={handleSubmit}>
        Name:
        <input type='text' defaultValue={product.name} onInput={(e) => setProduct({...product,name:e.target.value})} /> <br />
        Price:
        <input type='number' defaultValue={product.price} onInput={(e) => setProduct({...product,price: +e.target.value})} /> <br />
        Quantity:
        <input type='number' defaultValue={product.quantity} onInput={(e) => setProduct({...product,quantity: +e.target.value})} /> <br />

        <button type='submit'>Send</button>
        <button onClick={deleteProduct}>Delete</button><br/>
        list of all costumers 
      </form>    </>
  )
}

export default EditProduct
