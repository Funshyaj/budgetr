import { useRef } from "react";
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from "../printer";
import { Button, ButtonContainer } from "../button/Button";

const PrintModal = () => {

    const componentRef = useRef(null);

    return ( <div className="print-modal">
        sdmsldn

        <ReactToPrint
          trigger={() => { return <Button primary={true}>Print as Pdf</Button>}}    
          content={() => componentRef.current}
        />

            <ComponentToPrint ref={componentRef} /> 
    </div> );
}
 
export default PrintModal;