import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { db1,db2 } from '../../db';

 const  {FixedBudgetInputs, Analyses} = db1
const  {NonFixedBudgetInputs, Analysis} = db2

const Welcome = () => {
  const [UserName, setUserName] = useState<string>('')
  const [change, setChange] = useState(false)


     // initialize database only once
const init = ()=> {
  Analyses.toArray().then((arr)=> {
    if(arr.length === 0){ 
      Analyses.put({
        id:0,
        fixedInput: 0,
        analysis: "",
        total: 0,
        UserName:''
      });
      console.log('local database has been initiallized ')
     }

     else if(arr.length > 0){
      console.log('db already exist')
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
  });

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

}

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value)
 
  // function to add User name
  const addName = ()=>{
    Analyses.update(0, {UserName: UserName});
    Analysis.update(0, {UserName: UserName});
    } 


        return ( <div>
          {change && (<Navigate to='/main'/>)}
  
      <div className="welcome">
        <h1>Welcome to Budgetr</h1>
        <div>
          <h2>Tell us your name</h2>

          <form onSubmit={()=>{
addName();
setChange(true);
console.log(UserName)}}>
      <input type="text" placeholder="Your name is..." value={UserName} onChange={handleChange} required/>
<button type='submit'>
Get started
</button>
   </form>
        </div>

        <div>
        <button onClick={()=>init()}>Initialize Database</button>
        </div>

      </div>
    </div> ); 
  
 

}
 
export default Welcome;