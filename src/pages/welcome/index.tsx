import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db1,db2 } from '../../db';

 const  {FixedBudgetInputs,Analyses} = db1
const  {NonFixedBudgetInputs, Analysis} = db2

const Welcome = () => {
  const [UserName, setUserName] = useState<string>('')
    const navigate = useNavigate();


     // initialize database only once
 useEffect( () => {
  let check = ()=>{
   Analyses.toArray().then((arr)=> {
    if(arr.length === 0){ 
      Analyses.put({
        id:0,
        fixedInput: 0,
        analysis: "",
        total: 0,
        UserName:''
      });
     }
  })

  FixedBudgetInputs.toArray().then((arr)=> {
    if(arr.length === 0){ 
      FixedBudgetInputs.bulkPut([{
        name:'',
        price:0
      },
      {
        name:'',
        price:0
      }]);
     }
  })

  Analysis.toArray().then((arr)=> {
    if(arr.length === 0){ 
      Analysis.put({
        id:0,
        total: 0,
        UserName:''
      });
     }
  });

NonFixedBudgetInputs.toArray().then((arr)=> {
if(arr.length === 0){ 
NonFixedBudgetInputs.bulkPut([{
  name:'',
  price:0
},
{
  name:'',
  price:0
}]);
}
});
console.log('local database has been initiallized ')
  }

  return () => {
     check()
  }
}, [])

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value)
 

  // function to add User name
  const addName = ()=>{
    Analyses.update(0, {UserName: UserName});
    Analysis.update(0, {UserName: UserName});
navigate('/Budgetr');
    } 
 
 return ( <div>
  
      <div className="welcome">
        <h1>Welcome to Budgetr</h1>
        <div>
          <h2>Tell us your name</h2>
          <input type="text" placeholder="Your name is..." value={UserName} onChange={handleChange}/>
        </div>
        <div>
          <button onClick={()=>addName}>Get started</button>
        </div>

      </div>
    </div> );
}
 
export default Welcome;