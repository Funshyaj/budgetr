import { useState} from 'react';
import { Navigate } from 'react-router-dom';
import { db1,db2 } from '../../db';
import Modal from './components/modal';

 const  {FixedBudgetInputs, Analyses} = db1
const  {NonFixedBudgetInputs, Analysis} = db2

const Welcome = () => {
  const [UserName, setUserName] = useState<string>('')
  const [change, setChange] = useState(false)
  const [modal, setModal] = useState<Boolean>(true)


     // initialize database only once
const init = ()=> {
//   Analyses.toArray().then((arr)=> {
//     if(arr.length === 0){ 
//       Analyses.put({
//         id:0,
//         fixedInput: 0,
//         analysis: "",
//         total: 0,
//         UserName:''
//       });
//       console.log('local database has been initiallized ')
//      }

//      else if(arr.length > 0){
//       console.log('db already exist')
//     } 
//   })

//   FixedBudgetInputs.toArray().then((arr)=> {
//     if(arr.length === 0){ 
//       FixedBudgetInputs.bulkPut([{
//         name:'',
//         price:0
//       },
//       {
//         name:'',
//         price:0
//       }]);
//      }
//   });

//   Analysis.toArray().then((arr)=> {
//     if(arr.length === 0){ 
//       Analysis.put({
//         id:0,
//         total: 0,
//         UserName:''
//       });
//      }
//   });

// NonFixedBudgetInputs.toArray().then((arr)=> {
// if(arr.length === 0){ 
// NonFixedBudgetInputs.bulkPut([{
//   name:'',
//   price:0
// },
// {
//   name:'',
//   price:0
// }]);
// }
// });

}

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value)

const handleModal = ()=> setModal(false)
 
  // function to add User name
  const addName = ()=>{
    Analyses.update(0, {UserName: UserName});
    Analysis.update(0, {UserName: UserName});
    } 


        return ( <div>
          {change && (<Navigate to='/main'/>)}
          {modal && <Modal setModal={handleModal} init={init} />}
  
      <div className="welcome">
        <div className='intro-form'>
        <h1>Welcome to Budgetr</h1>
        <div className='welcome-form'>
          <form onSubmit={(e)=>{
e.preventDefault()
// addName();
// setChange(true);
console.log(UserName)}}>
      <input type="text" placeholder="Enter your name" value={UserName} onChange={handleChange} required/>
<button type='submit'>Proceed</button>
   </form>
        </div>
        </div>

        <div className='need-to-know'>
      <h2>Things to know</h2>
      <ul>
        <li>This app works perfectly offline</li>
        <li>You can share and download any budget you create</li>
        <li>Budgetting makes your life more organized</li>
      </ul>
        </div>

      </div>
    </div> ); 
  
 

}
 
export default Welcome;