import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./Faults.scss";
export default function FultTopics({FilterValue}) {

  return (
    <div  className="fultitle">
      
      <Card className="contantholder">
        <CardContent className="fultcontant">
          <span >נפתחה מול:</span>
          <span >מיקום:</span>
          <span >רשת:</span>
          <span >נוצר על ידי:</span>
          <span >מספר אבנ"ח\תקלה:</span>
          <span >בתאריך:</span>
          <div className = "FilterSelect">
              <select
              onChange = {(event)=>FilterValue(event.target.value)}
              placeholder="לחץ למיון התקלות"
              className = "SelectInput"
              id="mySelectElement" >
              <option value="">כלל התקלות</option>
              <option value="צפון">צפון</option>
              <option value="דרום">דרום</option>
              <option value="מרכז">מרכז</option>
              <option value="מטכל">מטכל</option>
              <option value="נטקום">נטקום</option>
              <option value="בינת">בינת</option>
              </select>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
