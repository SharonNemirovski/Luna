import React, { useState } from "react";
import "./backdrop.scss";
import TextField from "@material-ui/core/TextField";
import edit from "../../../../assets/edit.png";

export default function Backdrop({ onClose, onEdit ,company , status , techname , avnach ,pre_action , futureaction , F_description}) {
  const [status_value, setValue] = useState(status);
  const [tech_name, setname] = useState( techname);
  const [avnachNum, setNum] = useState(avnach);
  const [user, setusername] = useState("");
  const [pastactions, setpastaction] = useState(pre_action);
  const [futureactions, setfutureactions] = useState(futureaction);
  const [description, setdescription] = useState(F_description);
  const [inputError , setError] = useState(false);
  const [EmptyFieldError , setEmptyFieldError] = useState(false);
  const Swal = require("sweetalert2");
  const onSubmit = () => {
    let isEmpty = false;
    if(user !== ""){
      let valuesArry = [status_value , tech_name,avnachNum , user , pastactions ,futureactions ,description]
      valuesArry.map((val)=>{
        if(val===""){
          isEmpty = true;
        }
      })
      isEmpty === true? 
      setEmptyFieldError(true):
      onEdit(status_value , tech_name,avnachNum , user , pastactions ,futureactions ,description);
    }
    else{

      setError(true);
    }
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
    <div className="BackDropModal">
      <div className="BackDropModal_content">
        <img src={edit} alt="" />
        {EmptyFieldError&&<h6>אין להשאיר שדות ריקים</h6>}
        {!EmptyFieldError&&<h5>עריכת פרטי התקלה</h5>}
        <div className="BackDropModal_form">
          <div className="BackDropModal_form_item">
            <TextField
              error={inputError}
              onChange={(e) => setusername(e.target.value)}
              label="לחצ\י לעדכון"
            />
            {inputError&&<h1>שדה זה הוא חובה</h1>}
            {!inputError&&<h3>שם הטכנאי המעדכן</h3>}
          </div>
          <div className="BackDropModal_form_item">
            <TextField
              onChange={(e) => setValue(e.target.value)}
              label="לחצ\י לעדכון"
              value = {status_value}
            />
            <h3>עדכנ\י סטטוס התקלה</h3>
          </div>
          <div className="BackDropModal_form_item">
            <TextField
              onChange={(e) => setNum(e.target.value)}
              label="לחצ\י לעדכון"
              value = {avnachNum}
            />
            <h3>עדכנ\י מספר אבנ"ח\תקלה</h3>
          </div>
          {IsCompanyFault()&& 
          (<div className="BackDropModal_form_item">
            <TextField
              onChange={(e) => setname(e.target.value)}
              label="לחצ\י לעדכון"
              value = {tech_name}
            />
            <h3>שם הטכנאי שיוצא לתקלה</h3>
          </div>)}
          <div className="BackDropModal_form_item">
          <TextField
              onChange={(e) => setdescription(e.target.value)}
              label="לחצ\י לעדכון"
              value={description}
            />
            <h3>ערוך תיאור תקלה</h3>
          </div>
          <div className="BackDropModal_form_item">
            <TextField
              onChange={(e) => setfutureactions(e.target.value)}
              label="לחצ\י לעדכון"
              value ={futureactions}
            />
            <h3>ערוך תהליכים שיש לבצע</h3>
          </div>
          <div className="BackDropModal_form_item">
            <TextField
              onChange={(e) => setpastaction(e.target.value)}
              label="לחצ\י לעדכון"
              value={pastactions}
            />
            <h3>ערוך תהליכים שבוצעו</h3>
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
