import React, { useState } from "react";
import { useStyles, theme } from "./styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ThemeProvider } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachFileIcon from "@material-ui/icons/AttachFile";

export default function Fult({
  number,
  f_place,
  createdby,
  createdat,
  net,
  stats,
  techname,
  onDelete,
  onEdit,
  id,
  is_close,
}) {
  const classes = useStyles();
  const [fields, setFields] = useState({
    num: number,
    place: f_place,
    by: createdby,
    created_at: createdat,
    network: net,
    status: stats,
    tech: techname,
  });

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {};

  return (
    <div className={classes.fult}>
      <Card className={classes.card}>
        <CardContent className={classes.cardcontant}>
          <CardActions disableSpacing className={classes.action}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
          </CardActions>
          <Typography className={classes.topogragh}>{fields.tech}</Typography>
          <Typography className={classes.topogragh}>
            {fields.network}
          </Typography>
          <Typography className={classes.topogragh}>
            {fields.created_at}
          </Typography>
          <Typography className={classes.topogragh}>{fields.by}</Typography>
          <Typography className={classes.topogragh}>{fields.place}</Typography>
          <Typography className={classes.topogragh}> {fields.num}</Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardcontant}>
            <ThemeProvider theme={theme}>
              <Typography dir="rtl" className={classes.topogragh_status}>
                סטטוס:
                <Typography>{fields.status}</Typography>
              </Typography>
            </ThemeProvider>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
