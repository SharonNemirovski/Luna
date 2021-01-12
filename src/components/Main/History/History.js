import React from "react";
import "./History.scss";
import "../Animation/anima.scss";
import Table from "./HistoryTable";
export default function History({token}) {
  return (
    <div className="History DropAnimation">
      <div className="HistoryTableHolder">
      <Table token = {token}/>
      </div>
      
    </div>
  );
}
