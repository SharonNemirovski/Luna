import React from "react";
import "./Main.scss";
// --- components
import { Redirect, Route, Switch } from "react-router-dom";
import Faults from "./Faults/Faults";
import Passes from "./Passes/Passes";
import History from "./History/History";
import Contact from "./Contact/Contact";


export default function Main({token}) {
  return (
    <div className="Main">
      <Switch>
      <Route 
        path="/Main/fault" 
        render = {(props) => {
        return <Faults {...props} token = {token}/>
      }}/>

      <Route 
        path="/Main/passes" 
        render = {(props) => {
        return <Passes {...props} token = {token}/>
      }}/>

      <Route 
        path="/Main/history" 
        render = {(props) => {
        return <History {...props} token = {token}/>
      }}/>

      <Route 
        path="/Main/contact"
        render = {(props) => {
        return <Contact {...props} />
      }}/>

        <Redirect to="Main/fault" />
      </Switch>
    </div>
  );
}


