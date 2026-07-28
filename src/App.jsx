import { useState } from 'react';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import './index.css';

function App() {

  const [isNavHidden, setIsNavHidden]= useState(true);
  const [currentView, setCurrentView]  = useState('inicio');

  const toggleNav = ()=>{
    setIsNavHidden(!isNavHidden);
  };

  const closeNav = ()=>{
    if(!isNavHidden) {
      setIsNavHidden(true)
    }
  }

  const changeView = (viewName) => {
    setCurrentView(viewName);
    closeNav();
  }

  return(
    <>
    <Header onToggleNav={toggleNav} onChangeView = {changeView} currentView = {currentView}/>
    <Nav hidden={isNavHidden} onChangeView = {changeView} currentView={currentView}/>
    
    <Main onContentClick={closeNav} currentView = {currentView}/>
    </>
  );
}

export default App
