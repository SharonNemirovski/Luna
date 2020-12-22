import React from "react";
import "antd/dist/antd.css";
import "./App.scss";
// --- Components
import SideNav from "./components/SideNav/SideNav";
import Main from "./components/Main/Main";
import Login from "./components/Main/Login/Login"
function App() {
  return (
    <div className="App">
     
      <SideNav />
      <Main />
    </div>
  );
}

export default App;
// <Login/>
//