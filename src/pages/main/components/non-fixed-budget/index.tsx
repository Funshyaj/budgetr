import InputForm from "../form-input";
import { useState} from "react";
import { db2 } from "../../../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { Button, ButtonContainer } from "../button/Button";
import PrintModal from "../printer/print-modal";
import { WhatsappShareButton } from "react-share";



const  {NonFixedBudgetInputs, Analysis} = db2

const NonFixedBudget = () => {
    const [total, setTotal] = useState<number>()
    const [UserName, setUserName] = useState<string>('')
    const [show, setShow] = useState(false)
  
//   querying data for fast reflection
  const data  = useLiveQuery(() => NonFixedBudgetInputs.toArray() ,[])
 // live query analysis data
 const ana  = useLiveQuery(() => Analysis.toArray())

useLiveQuery(() => Analysis.toArray().then((arr)=> {
      setTotal(arr[0].total)
  setUserName(arr[0].UserName)
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
          // ensure the first letter is capital
const firstLetter = value.charAt(0).toUpperCase();
const remainingLetters = value.slice(1)
const capitalizedWord = firstLetter + remainingLetters
            // update database
     NonFixedBudgetInputs.update(id, {name: capitalizedWord});
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

      const printModalDisplay =()=> {
        setShow(!show)};
  
  

    return ( <div>
    <div className='input'>

    <div className="username-side">
       <h2>Welcome, {UserName}</h2>
       <div className="note">
          Here you can make a budget based on a fixed amount <br />
Take control of your finances with Budgter! Our easy-to-use budgeting tool will help you create a budget that works for you and your family. Easily track your spending, set goals, and set notifications to help keep you on track. Share and collaborate with others to make sure everyone is on the same page. With Budgter, you'll be on your way to financial freedom!  </div>

       </div>
    
    <div className="inputs-section">
        <h1>Enter your budget items</h1>
        <InputForm  data={data} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>
    </div> 
    
     <div className="analysis">
            <p>Your total expenses are N{total}</p>

            <ButtonContainer>
          <Button onClick={()=>printModalDisplay()} primary={true}><img src="https://img.icons8.com/ios/25/null/export.png"/>Export</Button>
          <Button primary={false}>
            <img src="https://img.icons8.com/ios/32/000000/whatsapp--v1.png"/>
          <WhatsappShareButton url='https://funshyaj.github.io/budgetr' title="Budgetr" separator=" -Dont over spend!, use budgetr- ">Share</WhatsappShareButton>
          </Button>
        </ButtonContainer>



       
        {show && <PrintModal printModalDisplay={printModalDisplay} data={data} Analysis={ana}/>}
        </div>
    </div>
    </div>);
}    
 
export default NonFixedBudget;