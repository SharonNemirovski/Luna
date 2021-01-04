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
import DeleteIcon from "@material-ui/icons/Delete";
import Badge from "@material-ui/core/Badge";
import "./History.scss";
import AssignmentIcon from "@material-ui/icons/Assignment";
import RestorePageIcon from '@material-ui/icons/RestorePage';


export default function Fult({
  number,
  ID,
  place,
  createdby,
  createdat,
  network,
  status,
  description,
  techname,
  company,
  onDelete,
  is_close,
  LastChange,

}) {
  const classes = useStyles();
  const Swal = require("sweetalert2");
  const [fields , setfields] = useState({
    isclose:is_close,
    status: is_close ===true? "נפתרה":status,
    StatusColor: is_close === true ? "greenstatus" : "redstatus",
  }
  );

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

const Reopen = () =>{
  Swal.fire({
    icon: "info",
    title: "?פתיחה מחדש",
    footer: "לחצ/י אישור לפתיחת התקלה מחדש",
    confirmButtonText: "אישור",
    showCancelButton: true,
    cancelButtonText: "בטל",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:4000/luna//ReopenFult/${ID}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          });
      setfields({...fields ,status:status , isclose:false});
      Swal.fire({ icon: "success", title: "התקלה נפתחה" });
    }
  });
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
        <div >
      <Card className="card">
        <CardContent className={classes.cardcontant}>
          <Typography  component={'span'} className="topogragh"> {number}</Typography>
          <Typography  component={'span'} className="topogragh">{place}</Typography>
          <Typography  component={'span'} className="topogragh">{network}</Typography>
          <Typography  component={'span'} className="topogragh">{createdby}</Typography>
          <Typography  component={'span'} className="topogragh">{fields.status}</Typography>
          <Typography  component={'span'} className="topogragh">{createdat}</Typography>

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
            {fields.isclose===true? <div className="greenstatus"></div>:<div className="redstatus"></div>}
            
          </CardActions>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="contant">
            <ThemeProvider theme={theme}>
              <div className="expend_fult">
                <Typography  component={'span'} className="topogragh_status">
                  תיאור התקלה:
                  <Typography  component={'span'} className="topogragh">
                    {description}
                  </Typography>
                </Typography>
                <Typography  component={'span'} className="topogragh_status">
                  סטטוס:
                  {LastChange}
                  <Typography  component={'span'} className="topogragh">{status}</Typography>
                </Typography>

                {(IsCompanyFault())&&(                
                <Typography component={'span'} className="topogragh_status">
                  שם הטכנאי שיוצא לתקלה:
                  <span className = "topogragh_info">{techname}</span>
                </Typography>)}

                <Typography component={'span'} >
                  <div className="operation_holder">
                  <IconButton onClick={()=>{ 
                      setExpanded(false);
                      onDelete();}}>
                      <DeleteIcon style={{ color: "#1562aa" }} />
                    </IconButton>
                    {is_close &&                     
                    <IconButton onClick={()=>{ 
                      setExpanded(false);
                      Reopen();}}>
                      <RestorePageIcon style={{ color: "#1562aa" }} />
                    </IconButton>}

                  </div>
                </Typography>
              </div>
            </ThemeProvider>
          </CardContent>
        </Collapse>
      </Card>
    </div>

    
  );
}
