import InputForm from "../form-input";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db1 } from "../db";
import { Button, ButtonContainer } from "./styled";


 const  {FixedBudgetInputs,Analyses} = db1

const FixedBudget = () => {
    const [total, setTotal] = useState<number>()
    const [fixedAmount, setFixedAmount] = useState<any>('')
    const [analysis, setAnalysis] = useState<string>('')
    const [UserName, setUserName] = useState<string>('')

   
  // live query for inputs data
  const data  = useLiveQuery(() => FixedBudgetInputs.toArray() ,[])
  // live query analysis data
 
  useLiveQuery(() => Analyses.toArray().then((arr)=> {
setFixedAmount(arr[0].fixedInput)
setAnalysis(arr[0].analysis)
setTotal(arr[0].total)
setUserName(arr[0].UserName)
  }))



       const handleFixedChange = async (e:any)=>{
const value = e.target.value *1
  await Analyses.update(0,{fixedInput: value});
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
       Analyses.update(0, {total: total});

            if(fixedAmount - total > 0){  
      Analyses.update(0, {analysis: `Your Budget balance is N${fixedAmount - total}`});
       }
           else if(fixedAmount - total < 0){ 
      Analyses.update(0, {analysis: `Your expenses have exceeded your budget`});
       }
    
    else   if(fixedAmount - total == 0){
      Analyses.update(0, {analysis: `Your Budget is exactly equal to your expenses`});
       }
       }})
    }


    return ( <div>

      <div className='inputs-section'>

      
        <div className="fixed-input">
          <h2>Welcome, {UserName}</h2>
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