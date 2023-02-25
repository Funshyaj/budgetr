import InputForm from "../form-input";
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db1 } from "../db";
import { Button, ButtonContainer } from "./styled";


 const  {FixedBudgetInputs,Analysis} = db1

const FixedBudget = () => {
    const [total, setTotal] = useState<number>()
    const [fixedAmount, setFixedAmount] = useState<any>('')
    const [analysis, setAnalysis] = useState<string>('')

    // should be moved to welcome page to give time to initialize database
 useEffect( () => {
    let check = ()=>{
     Analysis.toArray().then((arr)=> {
      if(arr.length === 0){ 
        Analysis.put({
          id:0,
          fixedInput: 0,
          analysis: "",
          total: 0,
        });
        //  setFixedAmount(arr[0].fixedInput)
         console.log('first time has been set')
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
        //  setFixedAmount(arr[0].fixedInput)
         console.log('first time has been set')
       }
    })

    }

    return () => {
       check()
    }
  }, [])
  
  // live query for inputs data
  const data  = useLiveQuery(() => FixedBudgetInputs.toArray() ,[])
  // live query analysis data
  useLiveQuery(() => Analysis.toArray().then((arr)=> {
setFixedAmount(arr[0].fixedInput)
setAnalysis(arr[0].analysis)
setTotal(arr[0].total)
  }))

 
       const handleFixedChange = async (e:any)=>{
const value = e.target.value *1
  await Analysis.update(0,{fixedInput: value});
}

// handleChange for both inputs
       const handleChange = (e:any,id:any)=>{
      const {name , value} = e.target;

// change and add up for prices
        if (name ===  'price'){
        // using the dexie update api to make an update directly to the database
   FixedBudgetInputs.update(id, {price: value});
  addUp()
}
        else if (name === 'name'){
   FixedBudgetInputs.update(id, {name: value});
    }
}

// logic for delete button
    const handleDelete = async (id:any)=>{
    await  FixedBudgetInputs.delete(id)
    addUp()
    }

// logic for add btn
const handleAdd = async () =>{   
  await FixedBudgetInputs.add({name:'',price:''})
      }

    const addUp = ()=>{
      let allPrices
     FixedBudgetInputs.toArray().then((arr)=> {
       if(arr){
         allPrices = arr.map(data=> data.price * 1)
         let total = allPrices.reduce((a,b)=> a + b, 0);
       Analysis.update(0, {total: total});

            if(fixedAmount - total > 0){  
      Analysis.update(0, {analysis: `Your Budget balance is N${fixedAmount - total}`});
       }
           else if(fixedAmount - total < 0){ 
      Analysis.update(0, {analysis: `Your expenses have exceeded your budget`});
       }
    
    else   if(fixedAmount - total == 0){
      Analysis.update(0, {analysis: `Your Budget is exactly equal to your expenses`});
       }
       }})
    }

  

    return ( <div>

      <div className="welcome">
        <h1>Welcome to Budgetr</h1>
        <div>
          <h2>Tell us your name</h2>
          <input type="text" placeholder="Your name is..."/>
        </div>
        <div>
          <button>Get started</button>
        </div>

      </div>
      <div className='inputs-section'>

      
        <div className="fixed-input">
             <h1>Enter your Fixed budget</h1>
             <input type="number" className="fixed-input" name="fixed" required onChange={(e)=>handleFixedChange(e)}value={fixedAmount} placeholder='Enter Fixed Budget amount' />
        </div>
       
        <InputForm  data={data} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>

        <div className="analysis">
            <p>Your total expenses are N{total}</p>
            <p>{analysis}</p>
        </div>
</div>
        <ButtonContainer>
          <Button>download as pdf</Button>
          <Button>share</Button>
        </ButtonContainer>
          
        


        
    </div> );
}
 
export default FixedBudget;