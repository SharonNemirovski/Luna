import React from "react";
import "antd/dist/antd.css";
import "./Homepage.scss";
// --- Components
import SideNav from "../SideNav/SideNav"
import Main from '../Main/Main';

function HomePage({token , disconnect}) {
  const handledissconnect = () =>{
  disconnect();
  };
  return (
    <div className="HomePage">
      <SideNav ondisconnect = {handledissconnect}/>
      <Main token = {token}/>
    </div>
  );
}

export default HomePage;

