import * as React from "react";
import { useRef } from "react";
import { InputsDb,Analysis,Analyses} from '../../../../db';

type props ={
data ?: InputsDb[] ;
Analyses ?: Analyses[];
Analysis ?: Analysis[];
name:string;
}

export class ComponentToPrint extends React.PureComponent<props>{

 render() {
      return (
        <div className='component-to-print'>
    {/* adding user's name*/}
  {this.props.Analyses?.map(({UserName,fixedInput,total,analysis},index)=>(
  <div className="pdf-head" key={index}>
  <h1>{UserName}'s Budget</h1>

  <div>
  
  {fixedInput ? 
  <h3>Fixed Amount : {fixedInput}</h3>: " "}
  <h3>Total expense are : {total}</h3>
  <h3>{analysis}</h3>
  </div>
  </div>
  ))}

     {/* adding user's name*/}
  {this.props.Analysis?.map(({UserName,total},index)=>(
  <div className="pdf-head" key={index}>
  <h1>{UserName}'s Budget</h1>

  <div>
  <h3>Total expense are : {total}</h3>
 </div>
  </div>
  ))}

  
  <table>
     <thead>
         <tr>
    <th>Items</th>
    <th>Price</th>
  </tr>
     </thead>
     <tbody>
  {this.props.data?.map(({name, price ,id},index)=>(
<tr key={index}>
<td>{name}</td>
<td>N {price}</td>
</tr>
    )
   )}
     </tbody>
   </table>
   
<footer>
  <div className="trademark">
    <p>Created with Budgetr</p>
    <p>funshyaj.github.io/budgter</p>
  </div>
  <div className="timestamp">Created at {this.props.name}</div>
  
</footer>
        </div>
      );
    }
  }

