import React from "react";
import { useStyles } from "./styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function FultTopics() {
  const classes = useStyles();

  return (
    <div className={classes.fultitle}>
      <Card>
        <CardContent className={classes.fultcontant}>
          <Typography className={classes.topogragh}>:פעולות</Typography>
          <Typography className={classes.topogragh}>:טכנאי</Typography>
          <Typography className={classes.topogragh}>:רשת</Typography>
          <Typography className={classes.topogragh}>:בתאריך</Typography>
          <Typography className={classes.topogragh}>:נוצר על ידי</Typography>
          <Typography className={classes.topogragh}>:מיקום</Typography>
          <Typography className={classes.topogragh}>:מספר תקלה</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
