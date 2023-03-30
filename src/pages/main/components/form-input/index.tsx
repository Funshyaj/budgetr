import './style.css';
import { InputsDb } from '../../../../db';

export type props ={
     data ?: InputsDb[] ;
     handleChange : (e:React.ChangeEvent<HTMLInputElement>, id?:number)=>void;
     handleDelete: (index?:number)=>void;
     handleAdd : ()=>void;
}

const InputForm:React.FC<props> = ({data,handleChange,handleAdd,handleDelete}) => {


    return ( <div className='mapped-inputs'>
<div className="labels">
  <label>Items</label>
  <label>Price</label>
</div>
{/* the inputs  */}
 {data?.map(({name, price ,id},index)=>(
     <div className="inputs" key={index}>
       <input type="text" className='input-text' name='name' onChange={(e)=>handleChange(e,id)} value={name} />
       <p>N</p>
        <input type="number" className="price" name='price' onChange={(e)=>handleChange(e,id)} value={price}/>
        <p id="delete" onClick={()=>handleDelete(id)}>&times;</p>
    </div>
))} 
{/* end of inputs */}

  <button className='add-btn' onClick={()=>handleAdd()}>+</button> 

    </div> );
}
 
export default InputForm;