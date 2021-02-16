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
import Tooltip from '@material-ui/core/Tooltip';
import { green} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
const plugatext = "לחץ לצפייה בשרטוט";
const companytext = "לחץ לצפייה בטפסי הלקוח";

export default function Fult({
  token,
  IsEditor,
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
 providerfiletype,
 avanch_num,
 lastUpdateBy,
 future_actions,
 hold_time,
 closed_at,
 pre_status
}) {
  const classes = useStyles();
  const innerTheme = createMuiTheme({
    palette: {
      primary: {
        main: green[400],
      },
    },
  });
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
    lastUpdateBy:lastUpdateBy,
    isclose:is_close,
    status: status,
    StatusColor: is_close === true ? "greenstatus" : "redstatus",
    avanch_num : avanch_num
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
  let newtime ="";
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
        .then((res) => {newtime = res.newtime})
      setfields({...fields ,status:status , isclose:false ,lastUpdateBy:"תקלה זו לא עודכנה מעולם" });
      hold_time =0;
      is_close = false;
      Swal.fire({ icon: "success", title: "התקלה נפתחה מחדש",confirmButtonText: "אישור" });
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

const GetBorderByHoldTime = () =>{
  if(fields.is_close===true)
  {
    return "cardForGreenStatus"
  }
  if(hold_time<=3){
    return "faultcard"
  }
  if((hold_time>3)&&(hold_time<=7)){
    return "faultcard fault-hold"
  }
  if((hold_time>7)&&(hold_time<=15)){
    return "faultcard fault-warning"
  }
  if(hold_time>15){
    return "faultcard fault-critical"
  }
}
  return (
        <div >
      <Card className={GetBorderByHoldTime()}>
        <CardContent className={classes.cardcontant}>
          <Typography  component={'span'} className="topogragh"> {number}</Typography>
          <Typography  component={'span'} className="topogragh">{place}</Typography>
          <Typography  component={'span'} className="topogragh">{network}</Typography>
          <Typography  component={'span'} className="topogragh">{createdby}</Typography>
          <Typography  component={'span'} className="topogragh">{avanch_num}</Typography>
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
            <IconButton color="primary" onClick ={DownloadFiles}>
            <ThemeProvider theme={innerTheme}>
            <Tooltip disableFocusListener disableTouchListener title={company === "אחר" ? plugatext : companytext}  >
            <Badge badgeContent={1} color={isfileexist ==="" ? "secondary":"primary"} variant="dot">
                <AssignmentIcon />
              </Badge>
              </Tooltip>
            </ThemeProvider>
            </IconButton>

            {!IsCompanyFault()&&<div className = "spacer"><span></span></div>}
            {IsCompanyFault()&&<IconButton color="primary" onClick ={DownloadProviderFiles}>
            <ThemeProvider theme={innerTheme}>
            <Tooltip disableFocusListener disableTouchListener title="לחץ לצפיה בתעודת ספק"  >
            <Badge badgeContent={1} color={isProviderFileExist ==="" ? "secondary":"primary"} variant = "dot">
                <ListAltIcon />
              </Badge>
              </Tooltip>
              </ThemeProvider>
            </IconButton>}
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

                <Typography component={'span'} className="topogragh_status">
                  תהליכים שנדרש לבצע:
                  <span className = "topogragh_info">{future_actions}</span>
                </Typography>

                <Typography  component={'span'} className="topogragh_status">
             סטטוס קודם:
                  <span className="topogragh_info">{pre_status}</span>
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

                {is_close&&(
                <Typography component={'span'} className="topogragh_status">
                  נסגרה בתאריך:
                  <span className = "topogragh_info">{closed_at}</span>
                </Typography>)}

                <Typography component={'span'} className="topogragh_status">
                  עודכן לאחרונה על ידי:
                  <span className = "topogragh_info">{fields.lastUpdateBy}</span>
                </Typography>
                <Typography component={'span'} >
                  {IsEditor&&(<div className="operation_holder">

 
                  <Tooltip disableFocusListener disableTouchListener title="לחץ למחיקת התקלה"  >
                        <div className = "iconButton"
                          onClick={()=>{ 
                          setExpanded(false);
                          onDelete();}}
                        >
                          <h1>מחיקת תקלה</h1>
                          <DeleteIcon/>
                        </div>
                        </Tooltip>


                    {fields.isclose && 
                    <Tooltip disableFocusListener disableTouchListener title="לחץ לפתיחת התקלה מחדש"  >
                    <div className = "iconButton" onClick={()=>{ 
                      setExpanded(false);
                      Reopen();}}>
                        <h1>פתיחה מחדש</h1>
                        <RestorePageIcon style={{ color: "#1562aa" }} />
                    </div>
                    </Tooltip>}

                  </div>)}
                </Typography>
              </div>
            </ThemeProvider>
          </CardContent>
        </Collapse>
      </Card>
    </div>

    
  );
}
