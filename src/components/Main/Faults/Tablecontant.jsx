import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Faults.scss";
export default function FultTopics() {

  return (
    <div className="fultitle">
      <Card className="contantholder">
        <CardContent className="fultcontant">
          <Typography component={'span'} className="topogragh">מספר תקלה:</Typography>
          <Typography component={'span'} className="topogragh">מיקום:</Typography>
          <Typography component={'span'} className="topogragh">רשת:</Typography>
          <Typography component={'span'} className="topogragh">טכנאי:</Typography>
          <Typography component={'span'} className="topogragh">נוצר על ידי:</Typography>
          <Typography component={'span'} className="topogragh">בתאריך:</Typography>
          <Typography component={'span'} className="topogragh">סטטוס:</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
