import React from "react";
import "./Faults.scss";
import "../Animation/anima.scss";
import FultsTable from "./fultsTable";


export default function Faults() {
  return (
    <div className="Faults DropAnimation">
      <div className="fultsTableHolder">
        <FultsTable />
      </div>
    </div>
  );
}
