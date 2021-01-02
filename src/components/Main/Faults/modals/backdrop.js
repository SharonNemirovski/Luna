import React, { useState } from "react";
import "./backdrop.scss";
import TextField from "@material-ui/core/TextField";
import edit from "../../../../assets/edit.png";

export default function Backdrop({ onClose, onEdit ,company }) {
  const [status_value, setValue] = useState("");
  const [tech_name, setname] = useState("");
  const onSubmit = () => {
    onEdit(status_value , tech_name);
  };

  const IsCompanyFault = () =>{
    if (company === "אחר"){
      return false;
    }
    else{
      return true;
    }
  };
  return (
    <div className={company==="אחר"? "BackDropModal":"BackDropModalCompany"}>
      <div className="BackDropModal_content">
        <img src={edit} alt="" />
        <div className="BackDropModal_form">
          <div className="BackDropModal_form_item">
            <TextField
              onChange={(e) => setValue(e.target.value)}
              label="לחצ\י לעדכון"
            />
            <h3>עדכנ\י סטטוס התקלה</h3>
          </div>
          {IsCompanyFault()&& 
          (<div className="BackDropModal_form_item">
            <TextField
              onChange={(e) => setname(e.target.value)}
              label="לחצ\י לעדכון"
            />
            <h3>שם הטכנאי שיוצא לתקלה</h3>
          </div>)}
        </div>
        <div className="BackDropModal_actions">
          <button onClick={onClose}>סגור</button>
          <button onClick={onSubmit}>עדכן</button>
        </div>
      </div>
    </div>
  );
}
