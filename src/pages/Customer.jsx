import { useEffect, useState } from 'react'
import { collection,doc,onSnapshot,query } from 'firebase/firestore';
import db from '../firebase'


function Customer({customer}) {
//const [costumer, setCostumer] = useState({});  
  return (
    <>
    <table>
        <tbody>
            <tr >
                <td>
                {customer.firstName}{' '}{customer.lastName}
                </td>
                <td>
                
                </td>
                <td>
                
                </td>
            
            </tr>
            </tbody>
    </table>
    
    </>
  )
}

export default Customer
