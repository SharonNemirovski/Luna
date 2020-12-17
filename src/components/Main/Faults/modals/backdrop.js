import React, { useState } from "react";
import "./backdrop.scss";
import TextField from "@material-ui/core/TextField";
import edit from "../../../../assets/edit.png";

export default function Backdrop({ onClose, onEdit }) {
  const [status_value, setValue] = useState("");
  const onSubmit = () => {
    onEdit(status_value);
  };
  return (
    <div className="BackDropModal">
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
        </div>
        <div className="BackDropModal_actions">
          <button onClick={onClose}>סגור</button>
          <button onClick={onSubmit}>עדכן</button>
        </div>
      </div>
    </div>
  );
}
