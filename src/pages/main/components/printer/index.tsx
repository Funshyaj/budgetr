import * as React from "react";
import { useRef } from "react";
import { InputsDb,Analysis} from '../../../../db';

type props ={
data ?: InputsDb[] ;
Analyses ?: Analysis[];
name:string;
}

export class ComponentToPrint extends React.PureComponent<props>{

 render() {

      return (
        <div className='component-to-print'>
    {/* adding user */}
  {this.props.Analyses?.map(({UserName},index)=>(
  <h1 key={index}>{UserName}'s Budget</h1>))}
  
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
<td>N{price}</td>
</tr>
    )
   )}
     </tbody>
   </table>
   

        </div>
      );
    }
  }

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
// export const ComponentToPrint = React.forwardRef((props, ref) => {
    
// export const ComponentToPrint = React.forwardRef((props, ref) => {
//   const { name } = props;
//   return (
//     <div className="print-source" ref={ref}>
//       Number {name}
//     </div>
//   );
// });