import { useState } from 'react';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import {BrowserRouter} from "react-router-dom";
import './index.css';

function App() {

  const [isNavHidden, setIsNavHidden]= useState(true);

  const toggleNav = ()=>{
    setIsNavHidden(!isNavHidden);
  };

  const closeNav = ()=>{
    if(!isNavHidden) {
      setIsNavHidden(true)
    }
  }


  return(
    <>
    <BrowserRouter>
      <Header onToggleNav={toggleNav}/>
      <Nav hidden={isNavHidden} onContentClick={closeNav} />
      
      <Main onContentClick={closeNav}/>
    </BrowserRouter>
    </>
  );
}

export default App
