import './style.css';
export type Inputs = {
    name:string;
    price:number;
}

export type props ={
     data : Inputs[];
     handleChange : (e:React.ChangeEvent<HTMLInputElement>, index:number)=>void;
     handleDelete: (index:number)=>void;
     handleAdd : ()=>void;
}

const InputForm:React.FC<props> = ({data,handleChange,handleAdd,handleDelete}) => {


    return ( <div>

{/* the inputs  */}
 {data.map((input,index)=>(
     <div className="inputs" key={index}>
       <input type="text" className='input-text' name='name' onChange={(e)=>handleChange(e,index)} value={input.name} />
       <p>N</p>
        <input type="number" className="price" name='price' onChange={(e)=>handleChange(e,index)} value={input.price}/>
        <p id="delete" onClick={()=>handleDelete(index)}>&times;</p>
    </div>
))} 
{/* end of inputs */}

  <button className='add-btn' onClick={()=>handleAdd()}>+</button> 

    </div> );
}
 
export default InputForm;