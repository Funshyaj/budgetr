import React, { useState } from 'react';
import Fixed from './components/fixed-budget/index';
import NonFixedBudget from './components/non-fixed-budget/index';
import Settings from './components/settings/index';

type Set = 'fixed'|'non-fixed';

function App() {
 
  const [switcher, setSwitcher] = useState<Set>('fixed');

  //function to switch to fixed
  const handleFixedSwitch= ()=>{
    setSwitcher('fixed')
    }

  //function to switch to non-fixed
  const handleNonFixedSwitch= ()=>{
      setSwitcher("non-fixed")
      }

  return (
    <div className="App">

       <header>
   <Settings  
handleFixedSwitch={handleFixedSwitch}
handleNonFixedSwitch ={handleNonFixedSwitch}
   />
 </header>
      <div className='Main-ui'>
       {switcher  === 'fixed' ?<Fixed/> :<NonFixedBudget />} 
      </div>



 
    </div>
  );
}

export default App;
