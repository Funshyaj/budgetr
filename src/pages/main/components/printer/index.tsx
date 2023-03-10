import React, { useRef } from 'react';

export class ComponentToPrint extends React.PureComponent {
    render() {
      return (
        <div className='component-to-print'>
          <h1>Funsho Budget</h1>

          <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  </table>
        </div>
      );
    }
  }

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
// export const ComponentToPrint = React.forwardRef((props, ref) => {
    
// const componentRef = useRef(null);

// return (
//       <div ref={ref}>My cool content here!</div>
//     );
//   });