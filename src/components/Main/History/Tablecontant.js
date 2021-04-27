import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "../Faults/Faults.scss";

export default function FultTopics() {
  return (
    <div className="fultitle">
      <Card className="contantholder">
        <CardContent className="fultcontant">
          <span >נפתחה מול:</span>
          <span >מיקום:</span>
          <span >רשת:</span>
          <span >נוצר על ידי:</span>
          <span >מספר אבנ"ח\תקלה:</span>
          <span >בתאריך:</span>
          <span >פעולות:</span>
        </CardContent>
      </Card>
    </div>
  );
}