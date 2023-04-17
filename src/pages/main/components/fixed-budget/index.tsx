import InputForm from "../form-input";
import { useState,useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db1 } from "../../../../db";
import { Button, ButtonContainer } from "../button/Button";
import PrintModal from "../printer/print-modal";
import { WhatsappShareButton } from "react-share";


 const  {FixedBudgetInputs,Analyses} = db1

const FixedBudget = () => {
    const [total, setTotal] = useState<number>()
    const [fixedAmount, setFixedAmount] = useState<any>('')
    const [analysis, setAnalysis] = useState<string>('')
    const [UserName, setUserName] = useState<string>('')
    const [show, setShow] = useState(false)

  
   
  // live query for inputs data
  // this is for array of data to map, so as the data is updated it keeps auto update
  // therfore data is an array that can be mapped
  const data  = useLiveQuery(() => FixedBudgetInputs.toArray() ,[])
  // live query analysis data
    const ana  = useLiveQuery(() => Analyses.toArray() ,[])

    //  this uses promise to auto set state upon changed to the database
  useLiveQuery(() => Analyses.toArray().then((arr)=> {
setFixedAmount(arr[0].fixedInput)
setAnalysis(arr[0].analysis)
setTotal(arr[0].total)
setUserName(arr[0].UserName)
  }))



       const handleFixedChange = async (e:any)=>{
        // conveting fixed budget amount to number
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
          // ensure the first letter is capital
const firstLetter = value.charAt(0).toUpperCase();
const remainingLetters = value.slice(1)
const capitalizedWord = firstLetter + remainingLetters
// update database
   FixedBudgetInputs.update(id, {name: capitalizedWord});
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

      // adding up logic 
    const addUp = ()=>{
      let allPrices
      // using the promise to get the data and add them
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
    
    else   if(fixedAmount - total === 0){
      Analyses.update(0, {analysis: `Your Budget is exactly equal to your expenses`});
       }
       }})
    }

    const printModalDisplay =()=> {
      setShow(!show)};


    return ( <div>

      
{show && <PrintModal printModalDisplay={printModalDisplay} data={data} Analyses={ana}/>}

      <div className='input'>

      <div className="username-side">
         <h2>Welcome, {UserName}</h2>
         
         
         <div className="note">
          Here you can make a budget based on a fixed amount <br />
Take control of your finances with Budgter! Our easy-to-use budgeting tool will help you create a budget that works for you and your family. Easily track your spending, set goals, and set notifications to help keep you on track. Share and collaborate with others to make sure everyone is on the same page. With Budgter, you'll be on your way to financial freedom!  </div>
         </div>
      <div className="inputs-section">
        <div className="fixed-input">
             <h1>Enter your Fixed budget</h1>
             <input type="number" className="fixed-input" name="fixed" required onChange={(e)=>handleFixedChange(e)}value={fixedAmount} placeholder='Enter Fixed Budget amount' />
        </div>
       
        <InputForm  data={data} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>
      </div>
        <div className="analysis" id="analysis">
            <p>Your total expenses are N{total}</p>
            <p>{analysis}</p>

            <ButtonContainer>
          <Button onClick={()=>printModalDisplay()} primary={true}><img src="https://img.icons8.com/ios/25/null/export.png"/>Export</Button>
          <Button primary={false}>
            <img src="https://img.icons8.com/ios/32/000000/whatsapp--v1.png"/>
          <WhatsappShareButton url='https://funshyaj.github.io/budgetr' title="Budgetr" separator=" -Dont over spend!, use budgetr- ">Share</WhatsappShareButton>
          </Button>
        </ButtonContainer>
        
        
        </div> 
</div>
        
    </div> );
}
 
export default FixedBudget;