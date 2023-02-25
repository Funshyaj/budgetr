import InputForm from "../form-input";
import { useState } from "react";
import Dexie, { Table } from 'dexie';
import { useLiveQuery } from "dexie-react-hooks";


export interface InputsDb {          
  id?: number;
  name: string;
  price: any ;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  FixedBudgetInputs!: Table<InputsDb>; 

  constructor() {
    super('FixedBudgetDatabase');
    this.version(1).stores({
      FixedBudgetInputs: '++id, name, price' // Primary key and indexed props
    });
  }
}

 const db1 = new MySubClassedDexie();
 const  {FixedBudgetInputs} = db1

const FixedBudget = () => {
    const [total, setTotal] = useState<number>()
    const [fixedAmount, setFixedAmount] = useState<any>('')
    const [analysis, setAnalysis] = useState<string>('')

 const data  = useLiveQuery(() => FixedBudgetInputs.toArray() ,[])

//  let arr = ['w',2,2,3,3]
//  let localData = JSON.stringify(arr)
//  localStorage.setItem('data', localData)
//  console.log(localStorage)
//  let x = localStorage.getItem('data')
//  let parsedlocalData = JSON.parse(x)
// console.log(parsedlocalData)

// logic for add btn
const handleAdd = async () =>{   
    await FixedBudgetInputs.add({name:'',price:''})
        }

    

       const handleFixedChange =  async (e:any)=>{
const value = e.target.value *1
setFixedAmount((value))

// // const allData = await FixedBudgetInputs.toArray()
// const allData  = useLiveQuery(() => FixedBudgetInputs.filter(x=> x.price))
// const allPrices :InputsDb = await  allData.map(data=> data.price * 1);
// //running the simultaneous add up functions 
// let total = allPrices.reduce((a,b)=> a + b, 0);
//  setTotal(total)
// //logic for switch result
// if(fixedAmount - total > 0){    
// setAnalysis(`Your Budget balance is ${fixedAmount - total}`)
// }

// else if(fixedAmount - total < 0){
// setAnalysis(`Your expenses have exceeded your budget`)
// }

// else   if(fixedAmount - total == 0){
// setAnalysis(`Your Budget is exactly equal to your expenses`)
// }

console.log(fixedAmount,total)

}

// handleChange for both inputs
       const handleChange = async (e:any,id:any)=>{
        const {name , value} = e.target;

        const allData = await FixedBudgetInputs.toArray()

// // change and add up for prices
//         if (name ===  'price'){
//           // using the dexie update api to make an update directly to the database
//    FixedBudgetInputs.update(id, {price: value});

//    const allData = await FixedBudgetInputs.toArray()
//    const allPrices = allData.map(data=> data.price * 1);

//    let total = allPrices.reduce((a,b)=> a + b, 0);
//  setTotal(total)
//     console.log(fixedAmount,total)

    

    //  //logic for switch result
    //    if(fixedAmount - total > 0){    
    // setAnalysis(`Your Budget balance is ${fixedAmount - total}`)
    //    }
    
    //   else if(fixedAmount - total < 0){
    // setAnalysis(`Your expenses have exceeded your budget`)
    //    }
    
    // else   if(fixedAmount - total == 0){
    // setAnalysis(`Your Budget is exactly equal to your expenses`)
    //    }


        if (name === 'name'){
    await FixedBudgetInputs.update(id, {name: value});
    }
            
        }



// logic for delete button
    const handleDelete = async (id:any)=>{
    await  FixedBudgetInputs.delete(id)
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