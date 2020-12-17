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
import DoneIcon from "@material-ui/icons/Done";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Badge from "@material-ui/core/Badge";
import "./Faults.scss";
import AssignmentIcon from "@material-ui/icons/Assignment";
import fetch from "node-fetch";
import Backdrop from "./modals/backdrop";

export default function Fult({
  number,
  ID,
  f_place,
  createdby,
  createdat,
  net,
  stats,
  description,
  techname,
  onDelete,
  onClose,
  is_close,
  LastChange
}) {
  const classes = useStyles();
  const Swal = require("sweetalert2");
  const [fields, setFields] = useState({
    num: number,
    id:ID,
    place: f_place,
    by: createdby,
    created_at: createdat,
    network: net,
    description: description,
    status: stats,
    tech: techname,
    last_changed:LastChange,
  });
  const [backdrop, openBackdrop] = useState(false);
  const status_color = () => {
    return is_close === true ? "greenstatus" : "redstatus";
  };
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () =>{
    openBackdrop(true);
  };

  const UpdateFault = (new_status) => {
    if (new_status !== "") {
      const fultStatus = { status: String(new_status) };
      const changetime = Date.now;
      fetch(`http://localhost:4000/luna/UpdateFult/${ID}`, {
        method: "POST",
        body: JSON.stringify(fultStatus),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => {
          console.log("success fetch");
        });
        //backend update works ^^^
      setFields({...fields ,status:new_status , last_changed:changetime});
      Swal.fire("!סטטוס התקלה עודכן", "  ", "success");
      openBackdrop(false);
      
    } 
    else {
      openBackdrop(false);
    }
  };

  return (
    <div>
      {backdrop && (
          <Backdrop onClose={() => openBackdrop(false)} onEdit={UpdateFault} />
        )}
        <div className="fult">
      <Card className="card">
        <CardContent className={classes.cardcontant}>
          <Typography className="topogragh"> {fields.num}</Typography>
          <Typography className="topogragh">{fields.place}</Typography>
          <Typography className="topogragh">{fields.network}</Typography>
          <Typography className="topogragh">{fields.tech}</Typography>
          <Typography className="topogragh">{fields.by}</Typography>
          <Typography className="topogragh">{fields.created_at}</Typography>

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
            <IconButton color="primary">
              <Badge badgeContent={2} color="secondary" variant="dot">
                <AssignmentIcon />
              </Badge>
            </IconButton>
            <div className={status_color()}></div>
          </CardActions>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="contant">
            <ThemeProvider theme={theme}>
              <div className="expend_fult">
                <Typography component={'span'} className="topogragh_status">
                  תיאור התקלה:
                  <Typography className="topogragh">
                    {fields.description}
                  </Typography>
                </Typography>
                <Typography component={'span'} className="topogragh_status">
                  סטטוס:
                  {fields.last_changed}
                  <Typography component={'span'} className="topogragh">{fields.status}</Typography>
                </Typography>

                <Typography component={'span'}>
                  <div className="operation_holder">
                    <IconButton onClick={handleEdit}>
                      <EditIcon style={{ color: "#1562aa" }} />
                    </IconButton>

                    <IconButton onClick={onClose}>
                      <DoneIcon style={{ color: "#1562aa" }} />
                    </IconButton>
                    <IconButton onClick={onDelete}>
                      <DeleteIcon style={{ color: "#1562aa" }} />
                    </IconButton>
                    <IconButton>
                      <AttachFileIcon style={{ color: "#1562aa" }} />
                    </IconButton>
                  </div>
                </Typography>
              </div>
            </ThemeProvider>
          </CardContent>
        </Collapse>
      </Card>
    </div>
    </div>
    
  );
}
