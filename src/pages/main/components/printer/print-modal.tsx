import { useRef } from "react";
import * as React from "react";
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from "../printer";
import { Button } from "../button/Button";
import { Analyses, Analysis, InputsDb } from '../../../../db';

type props ={
printModalDisplay : ()=>void;
data ?: InputsDb[] ;
Analyses ?: Analyses[];
Analysis ?: Analysis[];
date:string;
time:string;
}



const PrintModal:React.FC<props> = ({printModalDisplay,data,Analyses,Analysis,date,time}) => {

    const componentRef = useRef(null);

//   let hour = new Date().getHours();
//   let minutes = new Date().getMinutes();
//   let stamp = 'am';
//   // making sure the stamp is correct
//   if (hour>=12 && hour <= 23){
//  stamp = 'pm'
//   }
//   let timer = hour + ':' + minutes +' '+ stamp;


    return ( <div className="print-modal">
        <div className="print-modal-body">
          <header>
            <ReactToPrint
          trigger={() => { return <Button primary={true}>Print as Pdf</Button>}}    
          content={() => componentRef.current}
        />
        <div onClick={()=>printModalDisplay()}>X</div>
        
        </header>
        

            <ComponentToPrint ref={componentRef} date={date} time={time}  data={data} Analyses={Analyses} Analysis={Analysis}/> 
            </div>
    </div> );
}
 
export default PrintModal;