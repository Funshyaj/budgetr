import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Main_Ui from './pages/main';
import Welcome from './pages/welcome';


function App() {

  return (
  <div className="App">
    <Routes>
      <Route path='/' element={<Welcome/>} />
      <Route path='/main' element={<Main_Ui/>} />
    </Routes>
    </div>

)
;
}

export default App;
