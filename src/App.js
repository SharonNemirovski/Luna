import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
// --- Components
import SideNav from './components/SideNav/SideNav';
import Main from './components/Main/Main';
import LogIn from './components/logIn/Log';

function App() {
  return (
    <div className="App">
       {/*       <LogIn />
  */}
      
      <SideNav /> 
      <Main />
    </div>
  );
}

export default App;


