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
    <div className='input'>

    <div className="username-side">
       <h2>Welcome, {UserName}</h2>
       <div className="note">
          Here you can make a budgegt based on a fixed amount and Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi animi illum totam quas delectus! Sequi eveniet, eligendi inventore assumenda excepturi velit itaque suscipit quaerat nulla vero cupiditate vel perspiciatis minima.
         </div>
       </div>
    
    <div className="inputs-section">
        <h1>Enter your budget items</h1>
        <InputForm  data={data} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>
    </div> 
    
     <div className="analysis">
            <p>Your total expenses are N{total}</p>

            <ButtonContainer>
          <Button onClick={()=>setShow(!show)} primary={true}><img src="https://img.icons8.com/ios/25/null/export.png"/>Export</Button>
          <Button primary={false}>
            <img src="https://img.icons8.com/ios/32/000000/whatsapp--v1.png"/>
          <WhatsappShareButton url='https://funshyaj.github.io/budgetr' title="Budgetr" separator=" -Dont over spend!, use budgetr- ">Share</WhatsappShareButton>
          </Button>
        </ButtonContainer>



        {show && <PrintModal />}
        </div>
    </div>
    </div>);
}    
 
export default NonFixedBudget;