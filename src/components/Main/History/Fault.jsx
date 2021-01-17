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
import axios from "axios";
import ListAltIcon from '@material-ui/icons/ListAlt';
export default function Fult({
  token,
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
 actions,
 filetype,
 providerfiletype
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isfileexist , setFileflag] = useState(filetype);
  const [isProviderFileExist , setProviderFileFlag] = useState(providerfiletype)
  const pharseDate = (oldDate) =>{
    if (oldDate !== "סטטוס לא עודכן מעולם"){
      let newtime = oldDate.split("T");
      newtime = newtime[0].replace("-", "/").replace("-", "/");
      newtime = newtime.split("/");
      return newtime[2] + "/" + newtime[1] + "/" + newtime[0];
    }
    return "סטטוס לא עודכן מעולם";
  };
  const Swal = require("sweetalert2");
  const [fields , setfields] = useState({
    last_changed:LastChange,
    isclose:is_close,
    status: is_close ===true? "נפתרה":status,
    StatusColor: is_close === true ? "greenstatus" : "redstatus",
  }
);
const handleExpandClick = () => {
    setExpanded(!expanded);
};
const DownloadFiles = () =>{
    if(isfileexist ===""){
      Swal.fire({confirmButtonText: "אישור" , title:"לא צורף קובץ לתקלה" ,icon:"info"});
    }
    else{
      axios.get(`http://localhost:4000/luna/getfiles/${ID}/${token}`,
      {
          headers: {
              'Content-Type': 'application/json',
              'Accept': `application/pdf`
          },
          responseType: "blob"
      }).then((response) => {
          const blob = new Blob([response.data], { type: isfileexist})
          const objectUrl = URL.createObjectURL(blob)
          window.open(objectUrl)
      }).catch((error) => { alert(error) })
    }
}
const DownloadProviderFiles = () =>{
        if(isProviderFileExist ===""){
          Swal.fire({confirmButtonText: "אישור" , title:"לא צורפה תעודת ספק לתקלה" ,icon:"info"});
        }
        else{
          axios.get(`http://localhost:4000/luna/getProviderfiles/${ID}/${token}`,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': `application/pdf`
              },
              responseType: "blob"
          }).then((response) => {
              const blob = new Blob([response.data], { type: isProviderFileExist})
              const objectUrl = URL.createObjectURL(blob)
              window.open(objectUrl)
          }).catch((error) => { alert(error) })
        }
}
  
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
      fetch(`http://localhost:4000/luna//ReopenFult/${ID}/${token}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
          "authorization" : "Bearer " + token
        }
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          });
      setfields({...fields ,status:status , isclose:false});
      Swal.fire({ icon: "success", title: "התקלה נפתחה",confirmButtonText: "אישור" });
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
            {!IsCompanyFault()&&<div className = "spacer"><span></span></div>}
            <IconButton color="primary" onClick = {DownloadFiles}>
              <Badge badgeContent={isfileexist ==="" ? 0:1} color="primary" variant = "dot">
                <AssignmentIcon />
              </Badge>
            </IconButton>
            
            {IsCompanyFault()&&<IconButton color="primary" onClick ={DownloadProviderFiles}>
              <Badge badgeContent={isProviderFileExist ==="" ? 0:1} color="primary" variant = "dot">
                <ListAltIcon />
              </Badge>
            </IconButton>}
            {fields.isclose===true? <div className="greenstatus"></div>:<div className="redstatus"></div>}
            
          </CardActions>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="contant">
            <ThemeProvider theme={theme}>
              <div className="expend_fult">
                <Typography  component={'span'} className="topogragh_status">
                  תיאור התקלה:
                  <span  className="topogragh_info">
                    {description}
                  </span>
                </Typography>
                <Typography component={'span'} className="topogragh_status">
                  תהליכים שבוצעו:
                  <span className = "topogragh_info">{actions}</span>
                </Typography>
                <Typography  component={'span'} className="topogragh_status">
                  סטטוס:
                  <span className="topogragh_info">{status}</span>
                </Typography>

                {(IsCompanyFault())&&(                
                <Typography component={'span'} className="topogragh_status">
                  שם הטכנאי שיוצא לתקלה:
                  <span className = "topogragh_info">{techname === ""? "לא ידוע":techname}</span>
                </Typography>)}
                <Typography component={'span'} className="topogragh_status">
                  עודכן לאחרונה בתאריך:
                  <span className = "topogragh_info"> {fields.last_changed}</span>
                </Typography>
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
