import React, { useState } from "react";
import { useStyles, theme } from "./styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
      axios.get(`http://106.0.4.171:80/luna/getfiles/${ID}/${token}`,
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
          axios.get(`http://106.0.4.171:80/luna/getProviderfiles/${ID}/${token}`,
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
      fetch(`http://106.0.4.171:80/luna//ReopenFult/${ID}/${token}`, {
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
  if((fields.isclose===true)||(is_close === true))
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
      <Card  className={GetBorderByHoldTime()}>
        <CardContent className={classes.cardcontant}>
          <span   className="topogragh"> {company}</span>
          <span   className="topogragh">{place}</span>
          <span   className="topogragh">{network}</span>
          <span   className="topogragh">{createdby}</span>
          <span   className="topogragh">{avanch_num}</span>
          <span   className="topogragh">{createdat}</span>

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
            <Badge badgeContent={1} color={filetype ==="" ? "secondary":"primary"} variant="dot">
                <AssignmentIcon />
              </Badge>
              </Tooltip>
            </ThemeProvider>
            </IconButton>

            {!IsCompanyFault()&&<div className = "spacer"><span></span></div>}
            {IsCompanyFault()&&<IconButton color="primary" onClick ={DownloadProviderFiles}>
            <ThemeProvider theme={innerTheme}>
            <Tooltip disableFocusListener disableTouchListener title="לחץ לצפיה בתעודת ספק"  >
            <Badge badgeContent={1} color={providerfiletype ==="" ? "secondary":"primary"} variant = "dot">
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
              <div className = "DataROw">
              <span   className="info">
                  תיאור התקלה:
                </span>
                <span  className="data">
                    {description}
                  </span>
              </div>

              <div className = "DataROw">
              <span  className="info">
                  תהליכים שבוצעו:
                </span>
                <span className = "data">{actions}</span>
              </div>

              <div className = "DataROw">
                <span  className="info">
                  תהליכים שנדרש לבצע:
                </span>
                <span className = "data">{future_actions}</span>
                </div>

                <div className = "DataROw">
                <span   className="info">
             סטטוס קודם:
                </span>
                <span className="data">{pre_status}</span>
                </div>
                <div className = "DataROw">
                <span   className="info">
                  סטטוס:
                </span>
                <span className="importent">{status}</span>
                </div>

                {(IsCompanyFault())&&(  
                  <div className = "DataROw">              
                <span  className="info">
                  שם הטכנאי שיוצא לתקלה:
                 
                </span>
                <span className = "data">{techname === ""? "לא ידוע":techname}</span></div>)}

                <div className = "DataROw"> 
                <span  className="info">
                  עודכן לאחרונה בתאריך:
                </span>
                <span className = "data"> {fields.last_changed}</span>
                </div>

                {is_close&&(
                  <div className = "DataROw"> 
                <span  className="info">
                  נסגרה בתאריך:
                </span>
                <span className = "data">{closed_at}</span>
                </div>)}
                <div className = "DataROw"> 
                <span  className="info">
                  עודכן לאחרונה על ידי:
                </span>
                <span className = "data">{fields.lastUpdateBy}</span>
                </div>
                <span  >
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
                </span>
              </div>
            </ThemeProvider>
          </CardContent>
        </Collapse>
      </Card>
    </div>

    
  );
}
