import { useState } from 'react';
import Fixed from './components/fixed-budget';
import NonFixedBudget from './components/non-fixed-budget';
import Settings from './components/settings/index';


type Set = 'fixed'|'non-fixed';
 
const MainUi= () => {
  const [switcher, setSwitcher] = useState<Set>('fixed');

    //function to switch to fixed
    const handleFixedSwitch= ()=>{
        setSwitcher('fixed')
        }
    
      //function to switch to non-fixed
      const handleNonFixedSwitch= ()=>{
          setSwitcher("non-fixed")
          }

    return ( <div>
   <Settings   
handleFixedSwitch={handleFixedSwitch}
handleNonFixedSwitch ={handleNonFixedSwitch}
   />

      <div className='Main-ui'>
       {switcher  === 'fixed' ?  <Fixed/> :<NonFixedBudget/> } 
       {/* buy me a coffee widget */}
       <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="funshoajayi" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
       <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="funshoajayi" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
    </div>

    
    </div> );
}
 
export default MainUi;