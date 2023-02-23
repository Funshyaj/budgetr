import InputForm from "../form-input";
import { useState } from "react";
import { Inputs } from "../form-input";


const FixedBudget = () => {
    const [total, setTotal] = useState<number>()
    const [fixedAmount, setFixedAmount] = useState<number>(0)
    const [analysis, setAnalysis] = useState<string>('')
    const [data, setdata] = useState<Inputs[]>(
        [{name:'', price:0},
        {name:'', price:0}  
       ])


       const handleFixedChange = (e:any)=>{
const value = e.target.value *1
setFixedAmount((value *1))
}

// handleChange for inputs
       const handleChange = (e:any,index:any)=>{
        const {name , value} = e.target;
        let list = [...data];

        if (name ===  'price'){
         list[index].price = value *1;
         setdata(list)
         let prices = list.map(li=> li.price)
         let total = prices.reduce((a,b)=> a + b, 0);
          setTotal(total)

          //logic for switch result
            if(fixedAmount - total > 0){    
  setAnalysis(`Your Budget balance is ${fixedAmount - total}`)
            }

           else if(fixedAmount - total < 0){
  setAnalysis(`Your expenses have exceeded your budget`)
            }

         else   if(fixedAmount - total == 0){
  setAnalysis(`Your Budget is exactly equal to your expenses`)
            }

           }

        if (name === 'name'){
            list[index].name = value;
            setdata(list)}
            
        }

// logic for add btn
    const handleAdd = () =>{   
        let newData = {
            name:'',
            price:0}
        setdata([...data,newData])
    }

// logic for delete button
    const handleDelete = (index:any)=>{
        let list = [...data];
     let newList = list.filter((x,y)=>y !== index) ;
setdata(newList)
    }


    return ( <div  className='inputs-section'>
        <div className="fixed-input">
             <h1>Enter your Fixed budget</h1>
             <input type="number" name="fixed" required onChange={(e)=>handleFixedChange(e)}value={fixedAmount} />
        </div>
       
        <InputForm  data={data} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>

        <div className="analysis">
            <p>Your total expenses are N{total}</p>
            <p>{analysis}</p>
        </div>
        
    </div> );
}
 
export default FixedBudget;