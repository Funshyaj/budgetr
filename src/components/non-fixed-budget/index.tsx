import InputForm from "../form-input";
import { useState } from "react";
import { Inputs } from "../form-input";

const NonFixedBudget = () => {
    const [total, setTotal] = useState<number>()
    const [data, setdata] = useState<Inputs[]>(
        [{name:'', price:0 },
         {name:'', price:0}  
        ])

        const handleChange = (e:any,index:any)=>{
            const {name , value} = e.target;
            let list = [...data];
    
            if (name == 'price'){
             list[index].price = value *1;
             setdata(list)
             let names = list.map(li=> li.price)
             let total = names.reduce((a,b)=> a + b, 0);
              setTotal(total)
            }
    }          

    const handleClick = (e:any) =>{
        const {name , value} = e.target;    
        let newData = {
            name:'',
            price:0}
        setdata([...data,newData])
    }

    const handleDelete = (e:any,index:any)=>{
        const {name , value} = e.target;
        let list = [...data];

     let newList = list.filter((x,y)=>y !== index) ;
setdata(newList)
    }

    return ( <div  className='inputs-section'>
      <h2>Total is {total}</h2>
        <InputForm  data={data} handleChange={handleChange} handleClick={handleClick} handleDelete={handleDelete}/>
        
    </div> );
}    
 
export default NonFixedBudget;