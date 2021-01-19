import React from "react";
import "./History.scss";
import "../Animation/anima.scss";
import Table from "./HistoryTable";
export default function History({token , IsEditor}) {
  return (
    <div className="History DropAnimation">
      <div className="HistoryTableHolder">
      <Table token = {token} IsEditor = {IsEditor}/>
      </div>
      
    </div>
  );
}
