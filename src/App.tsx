import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Budgetr from './pages/budgetr';
import Welcome from './pages/welcome';


function App() {

  return (
  <div className="App">
    <Routes>
      <Route path='/' element={<Welcome/>} />
      <Route path='/main' element={<Budgetr/>} />
    </Routes>
    </div>

)
;
}

export default App;
