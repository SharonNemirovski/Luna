import React from "react";
import { useStyles, theme } from "./styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Faults.scss";
export default function FultTopics() {
  const classes = useStyles();

  return (
    <div className="fultitle">
      <Card className="contantholder">
        <CardContent className="fultcontant">
          <Typography className="topogragh">מספר תקלה:</Typography>
          <Typography className="topogragh">מיקום:</Typography>
          <Typography className="topogragh">רשת:</Typography>
          <Typography className="topogragh">טכנאי:</Typography>
          <Typography className="topogragh">נוצר על ידי:</Typography>
          <Typography className="topogragh">בתאריך:</Typography>
          <Typography className="topogragh">סטטוס:</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
