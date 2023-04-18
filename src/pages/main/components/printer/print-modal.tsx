import { useRef,useState } from "react";
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