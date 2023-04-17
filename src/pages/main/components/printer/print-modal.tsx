import { useRef,useState } from "react";
import * as React from "react";
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from "../printer";
import { Button, ButtonContainer } from "../button/Button";
import { Analyses, Analysis, InputsDb } from '../../../../db';

type props ={
printModalDisplay : ()=>void;
data ?: InputsDb[] ;
Analyses ?: Analyses[];
Analysis ?: Analysis[];
}


// export const ComponentToPrint = React.forwardRef((props, ref) => {
//   const { name } = props;
//   return (
//     <div className="print-source" ref={ref}>
//       Number {name}
//     </div>
//   );
// });


const PrintModal:React.FC<props> = ({printModalDisplay,data,Analyses}) => {

    const componentRef = useRef(null);

    const [time, setTime] = useState(123)




    return ( <div className="print-modal">
        <div className="print-modal-body">
          <header>
            <ReactToPrint
          trigger={() => { return <Button primary={true}>Print as Pdf</Button>}}    
          content={() => componentRef.current}
        />
        <div onClick={()=>printModalDisplay()}>X</div>
        
        </header>
        

            <ComponentToPrint ref={componentRef} name='sara'  data={data} Analyses={Analyses}/> 
            </div>
    </div> );
}
 
export default PrintModal;