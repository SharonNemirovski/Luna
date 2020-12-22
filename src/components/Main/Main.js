import React from "react";
import "./Main.scss";
// --- components
import { Redirect, Route, Switch } from "react-router-dom";
import Faults from "./Faults/Faults";
import Passes from "./Passes/Passes";
import History from "./History/History";
import Contact from "./Contact/Contact";


export default function Main() {
  return (
    <div className="Main">
      <Switch>
        <Route path="/Main/fault" component={Faults} />
        <Route path="/Main/passes" component={Passes} />
        <Route path="/Main/history" component={History} />
        <Route path="/Main/contact" component={Contact} />
        <Redirect to="Main/fault" />
      </Switch>
    </div>
  );
}
