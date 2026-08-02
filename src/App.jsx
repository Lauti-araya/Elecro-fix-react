import { useState } from 'react';
import { Main } from './components/Main';
import {BrowserRouter} from "react-router-dom";
import './index.css';

function App() {

  const [isNavHidden, setIsNavHidden]= useState(true);

  const closeNav = ()=>{
    if(!isNavHidden) {
      setIsNavHidden(true)
    }
  }


  return(
    <>
    <BrowserRouter>
      <Main onContentClick={closeNav} isNavHidden={isNavHidden} setIsNavHidden={setIsNavHidden} />
    </BrowserRouter>
    </>
  );
}

export default App
