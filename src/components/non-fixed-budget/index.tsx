import InputForm from "../form-input";
import { useState,useEffect } from "react";
import { db2 } from "../db";
import { useLiveQuery } from "dexie-react-hooks";



const  {NonFixedBudgetInputs, Analysis} = db2

const NonFixedBudget = () => {
    const [total, setTotal] = useState<number>()

        

    // should be moved to welcome page to give time to initialize database
 useEffect( () => {
    let check = ()=>{
        Analysis.toArray().then((arr)=> {
            if(arr.length === 0){ 
              Analysis.put({
                id:0,
                total: 0,
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
        //  setFixedAmount(arr[0].fixedInput)
         console.log('first time has been set')
       }
    });
    console.log('first time has been set')

    }

    return () => {
       check()
    }
  }, [])

//   querying data for fast reflection
  const data  = useLiveQuery(() => NonFixedBudgetInputs.toArray() ,[])
  useLiveQuery(() => Analysis.toArray().then((arr)=> {
    setTotal(arr[0].total)
      }))


// handleChange for inputs
const handleChange = async (e:any,id:any)=>{
    const {name , value} = e.target;
   
  // change and add up for prices
          if (name ===  'price'){
          // using the dexie update api to make an update directly to the database
     NonFixedBudgetInputs.update(id, {price: value});
    addUp()
  }
          else if (name === 'name'){
     NonFixedBudgetInputs.update(id, {name: value});
      }
  }
  
  // logic for delete button
      const handleDelete = async (id:any)=>{
      await  NonFixedBudgetInputs.delete(id)
      addUp()
      }
  
  // logic for add btn
  const handleAdd = async () =>{   
    await NonFixedBudgetInputs.add({name:'',price:''})
        }
  
      const addUp = ()=>{
        let allPrices
       NonFixedBudgetInputs.toArray().then((arr)=> {
         if(arr){
           allPrices = arr.map(data=> data.price * 1)
           let total = allPrices.reduce((a,b)=> a + b, 0);
         Analysis.update(0, {total: total});
         }})
      }
  

    return ( <div>

    
    
    <div  className='inputs-section'>
        <h1>Enter your budget items</h1>
        <InputForm  data={data} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>

    </div>  <div className="analysis">
            <p>Your total expenses are N{total}</p>
        </div>
    
    </div>);
}    
 
export default NonFixedBudget;