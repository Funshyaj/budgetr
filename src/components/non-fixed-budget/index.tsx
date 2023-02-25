import InputForm from "../form-input";
import { useState } from "react";
import { InputsDb } from "../fixed-budget";

const NonFixedBudget = () => {
    const [total, setTotal] = useState<number>()
    const [data, setdata] = useState<InputsDb[]>(
        [{name:'', price:0 },
         {name:'', price:0}  
        ])


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
    }

    if (name === 'name'){
        list[index].name = value;
        setdata(list)
       }
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
      <h2>Total is {total}</h2>
        <InputForm  data={data} handleChange={handleChange} handleAdd={handleAdd} handleDelete={handleDelete}/>
        
    </div> );
}    
 
export default NonFixedBudget;