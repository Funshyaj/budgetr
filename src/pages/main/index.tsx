import { useState } from 'react';
import Fixed from './components/fixed-budget';
import NonFixedBudget from './components/non-fixed-budget';
import Settings from './components/settings/index';
import { Button, ButtonContainer } from "./components/button/Button";

type Set = 'fixed'|'non-fixed';
 
const Main_Ui= () => {
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
    </div>

    <ButtonContainer>
          <Button>Download</Button>
          <Button>Share</Button>
        </ButtonContainer>
    </div> );
}
 
export default Main_Ui;