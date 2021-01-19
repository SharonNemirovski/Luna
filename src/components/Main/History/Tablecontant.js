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
          <Typography component={'span'} className="topograghForTableContant">מספר תקלה:</Typography>
          <Typography component={'span'} className="topograghForTableContant">מיקום:</Typography>
          <Typography component={'span'} className="topograghForTableContant">רשת:</Typography>
          <Typography component={'span'} className="topograghForTableContant">נוצר על ידי:</Typography>
          <Typography component={'span'} className="topograghForTableContant">מספר אבנ"ח\תקלה:</Typography>
          <Typography component={'span'} className="topograghForTableContant">בתאריך:</Typography>
          <Typography component={'span'} className="topograghForTableContant">פעולות:</Typography>
        </CardContent>
      </Card>
    </div>
  );
}