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
import Tooltip from '@material-ui/core/Tooltip';
import { ThemeProvider } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import Badge from "@material-ui/core/Badge";
import "./Faults.scss";
import AssignmentIcon from "@material-ui/icons/Assignment";
import fetch from "node-fetch";
import Backdrop from "./modals/backdrop";
import netcom from "../../../assets/netcomlogo.png";
import bynet from "../../../assets/bynetlogo.png";
import hoshen from "../../../assets/hoshenlogo.png";
import Uploadfile from "./modals/Uloadbackdrop"
import CollectionsIcon from '@material-ui/icons/Collections';
import ListAltIcon from '@material-ui/icons/ListAlt';
import axios from "axios";
import { green} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const plugatext = "לחץ לצפייה בשרטוט";
const plugtext = "לחץ להוספת שרטוט";
const companytext = "לחץ לצפייה בטפסי הלקוח";
const comptext = "לחץ לצירוף טפסי לקוח";
const addplugatext = "הוספת שרטוט";
const addcomptext = "הוספת טפסי לקוח";

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
  company,
  actions,
  techname,
  onDelete,
  onClose,
  is_close,
  LastChange,
  filetype,
  providerfiletype,
  avanch_num,
  hold_time,
  lastUpdateBy,
  future_actions,
  pre_status

}) {
  const classes = useStyles();
  const pharseDate = (oldDate) =>{
    let newtime = oldDate.split("T");
    newtime = newtime[0].replace("-", "/").replace("-", "/");
    newtime = newtime.split("/");
    return newtime[2] + "/" + newtime[1] + "/" + newtime[0];
  };
  const Swal = require("sweetalert2");
  const [fields, setFields] = useState({
    num: number,
    id:ID,
    place: place,
    by: createdby,
    created_at: createdat,
    network: network,
    company:company,
    actions:actions,
    description: description,
    status: status,
    tech: techname,
    last_changed:LastChange,
    avanch_num : avanch_num,
    lastUpdateBy:lastUpdateBy,
    future_actions:future_actions,
    pre_status:pre_status
  });
  const [expanded, setExpanded] = useState(false);
  const [isfileexist , setFileflag] = useState(filetype);
  const [isProviderFileExist , setProviderFileFlag] = useState(providerfiletype)
  const [backdrop, openBackdrop] = useState(false);
  const [filebackdrop, openfileBackdrop] = useState(false);
  const [Providerfilebackdrop, openProviderfileBackdrop] = useState(false);
  const innerTheme = createMuiTheme({
    palette: {
      primary: {
        main: green[400],
      },
    },
  });


  const getLogoByCompany = () =>{
    //returns thw logo by the company value
    switch(company){
      case "נטקום" :
        return netcom;
        
      case "בינת":
        return bynet;
      
      default :
        return hoshen;
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = () =>{
    openBackdrop(true);
  };
  const UpdateFault = (new_status , tech_name , avnachNUM , user) => {
    const oldStatus = fields.status;
    let fultbody ={};
    let currentDate = new Date();
    if ((new_status !== ""))
    {
      if(tech_name !== "")
      {
          if(avnachNUM !== "")
          {
            fultbody = { status: String(new_status),pre_status: String(oldStatus) , emp: String(tech_name) , lastUpdateBy: user, avanch_num:String(avnachNUM) };
            setFields({...fields , avanch_num: avnachNUM ,lastUpdateBy: user , tech:tech_name ,  status:new_status , pre_status:oldStatus  ,last_changed : pharseDate(currentDate.toISOString())});
          }
          else
          {
            fultbody = { status: String(new_status),pre_status: String(oldStatus) ,lastUpdateBy: user, emp: String(tech_name)  };
            setFields({...fields ,  tech:tech_name , lastUpdateBy: user, status:new_status ,pre_status:oldStatus ,last_changed : pharseDate(currentDate.toISOString())});
          }
      }
      else
      {
          if(avnachNUM !== "")
            {
              fultbody = { status: String(new_status),pre_status: String(oldStatus) ,lastUpdateBy: user, avanch_num:String(avnachNUM) };
              setFields({...fields , avanch_num: avnachNUM  ,lastUpdateBy: user,  status:new_status,pre_status:oldStatus  ,last_changed : pharseDate(currentDate.toISOString())});
            }
          else
            {
              fultbody = { status: String(new_status),lastUpdateBy: user , pre_status: String(oldStatus) };
              setFields({...fields ,  status:new_status,pre_status:oldStatus  ,lastUpdateBy: user,last_changed : pharseDate(currentDate.toISOString())});
            }
      }
    }
    else
    {
        if(tech_name !== "")
        {
            if(avnachNUM !== "")
            {
                fultbody = { emp: String(tech_name) , lastUpdateBy: user,avanch_num:String(avnachNUM) };
                setFields({...fields , avanch_num: avnachNUM , lastUpdateBy: user, tech:tech_name   ,last_changed : pharseDate(currentDate.toISOString())});
            }
            else
            {
                fultbody = {lastUpdateBy: user, emp: String(tech_name)  };
                setFields({...fields , lastUpdateBy: user, tech:tech_name , last_changed : pharseDate(currentDate.toISOString())});
            }
        }
        else
        {
            if(avnachNUM !== "")
            {
                fultbody = {lastUpdateBy: user,avanch_num:String(avnachNUM) };
                setFields({...fields , lastUpdateBy: user,avanch_num: avnachNUM  ,last_changed : pharseDate(currentDate.toISOString())});
            }
            else
            {
              openBackdrop(false);
              Swal.fire({confirmButtonText: "אישור" , title:"לא עודכן אף שדה" ,icon:"info"});
              return;
            }
        
        }  
    }
    fetch(`http://localhost:4000/luna/UpdateFult/${ID}/${token}`, {
      method: "POST",
      body: JSON.stringify(fultbody),
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
        "authorization" : "Bearer " + token
      }
    })
      .then((res) => res.json())
      .catch(() => { alert("server error") })
    Swal.fire({confirmButtonText: "אישור" , title :"!התקלה עודכנה בהצלחה" ,icon:"success"});     
    setExpanded(false);
    openBackdrop(false);
  };
  const IsCompanyFault = () =>{
    if (company === "אחר"){
      return false;
    }
    else{
      return true;
    }
  };
  const OnUploadFile = () =>{
    if(isfileexist==="")
      openfileBackdrop(true);
    else
    Swal.fire({confirmButtonText: "אישור" , title:"לתקלה כבר קיים קובץ מצורף" ,icon:"info"});
  };
  const OnUploadProviderFile = () =>{
    if(isProviderFileExist==="")
    openProviderfileBackdrop(true);
    else
    Swal.fire({confirmButtonText: "אישור" , title:"לתקלה כבר צורפה תעודת ספק" ,icon:"info"});
  };
  const DownloadFiles = () =>{
    if(isfileexist ===""){
      if (company === "אחר"){
        Swal.fire({confirmButtonText: "אישור" , title:"לא צורף שרטוט לתקלה" ,icon:"info"});
      }
      else{
        Swal.fire({confirmButtonText: "אישור" , title:"לא צורף טופס לתקלה" ,icon:"info"});
      }
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

  const GetOperationStyle = () => {
    if (company === "אחר"){
      return "operation_hold_for_pluga";
    }
    else{
      return "operation_hold_for_copmany";
    }
  }
  const GetBorderByHoldTime = () =>{
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
    <div>
      {backdrop && (
          <Backdrop onClose={() => openBackdrop(false)} onEdit={UpdateFault} company ={company} />
        )}
          {filebackdrop && (<Uploadfile fualtid = {ID} token = {token} IsProviderFile = {false}
            doneupload={()=>{

              fetch(`http://localhost:4000/luna/getfiletype/${ID}/${token}`, {
                headers: { 'Content-Type': 'application/json' },
              })
                .then((res) => res.json())
                .then((json) => {
                  setFileflag(json.Filetype)
                }).catch((error) => { alert(error) });

            }} 
            onClose = {()=>openfileBackdrop(false)}/>
        )}
        {Providerfilebackdrop && (<Uploadfile fualtid = {ID} token = {token} IsProviderFile = {true}
            doneupload={()=>{
              fetch(`http://localhost:4000/luna/getProviderfiletype/${ID}/${token}`, {
                headers: { 'Content-Type': 'application/json' },
              })
                .then((res) => res.json())
                .then((json) => {
                  setProviderFileFlag(json.Filetype);
                }).catch((error) => { alert(error) });
            }} 
            onClose = {()=>openProviderfileBackdrop(false)}/>
        )}
      <Card className={GetBorderByHoldTime()}>
        <CardContent  className={classes.cardcontant}>
          <Typography component={'span'} className="topogragh"> {fields.num}</Typography>
          <Typography component={'span'} className="topogragh">{fields.place}</Typography>
          <Typography component={'span'} className="topogragh">{fields.network}</Typography>
          <Typography component={'span'} className="topogragh">{fields.by}</Typography>
          <Typography component={'span'} className="topogragh">{fields.avanch_num}</Typography>
          <Typography component={'span'} className="topogragh">{fields.created_at}</Typography>

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
              {IsCompanyFault()&&
              <IconButton color="primary" onClick ={DownloadProviderFiles}>
                <ThemeProvider theme={innerTheme}>
                <Tooltip disableFocusListener disableTouchListener title="לחץ לצפיה בתעודת ספק"  >
                  <Badge badgeContent={1} color={isProviderFileExist ==="" ? "secondary":"primary"} variant="dot">
                    <ListAltIcon />
                  </Badge>
                 </Tooltip>
                </ThemeProvider>
            </IconButton>}

            <div className="avatar">
              <img src={getLogoByCompany()} alt="" />
             </div>
          </CardActions>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="contant">
            <ThemeProvider theme={theme}>
              <div className="expend_fult">
                <Typography component={'span'} className="topogragh_status">
                  תיאור התקלה:
                  <span className = "topogragh_info">{fields.description}</span>
                </Typography>
                <Typography component={'span'} className="topogragh_status">
                  תהליכים שבוצעו:
                  <span className = "topogragh_info">{fields.actions}</span>
                </Typography>

                <Typography component={'span'} className="topogragh_status">
                  תהליכים שנדרש לבצע:
                  <span className = "topogragh_info">{fields.future_actions}</span>
                </Typography>
                <Typography component={'span'} className="topogragh_status">
                  סטטוס קודם:
                  <span className = "topogragh_info">{fields.pre_status}</span>
                </Typography>
                <Typography component={'span'} className="topogragh_status">
                  סטטוס:
                  <span className = "topogragh_info">{fields.status}</span>
                </Typography>


                {(IsCompanyFault())&&(<Typography component={'span'} className="topogragh_status">
                  שם הטכנאי שיוצא לתקלה:
                  <span className = "topogragh_info">{techname === ""? "לא ידוע":fields.tech}</span>
                </Typography>)}
                <Typography component={'span'} className="topogragh_status">
                  עודכן לאחרונה בתאריך:
                  <span className = "topogragh_info"> {fields.last_changed}</span>
                </Typography>

                <Typography component={'span'} className="topogragh_status">
                  עודכן לאחרונה על ידי:
                  <span className = "topogragh_info">{fields.lastUpdateBy}</span>
                </Typography>
                <Typography component={'span'}>
                  {IsEditor&&(<div className={GetOperationStyle()}>
                
                  <Tooltip disableFocusListener disableTouchListener title="לחץ לעריכת התקלה"  >
                  <div className = "iconButton"
                  onClick={handleEdit}
                  >
                          <h1>עריכת תקלה</h1>
                          <EditIcon  />
                        </div>
                  </Tooltip>


                      <Tooltip disableFocusListener disableTouchListener title="לחץ לסגירת התקלה" >
                      <div className = "iconButton"
                      onClick={()=>{
                        setExpanded(false);
                        onClose();
                      }}
                      >
                          <h1>סגירת תקלה</h1>
                          <DoneIcon/>
                        </div>  
                      </Tooltip>
               
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

                
                  
                  <Tooltip disableFocusListener disableTouchListener title={company === "אחר"? plugtext: comptext}  >
                      <div className = "iconButton"
                      onClick = {OnUploadFile}>
                            <h1>{company === "אחר"? addplugatext : addcomptext}</h1>
                            <CollectionsIcon/>
                      </div>
                    </Tooltip>
                  




                    {IsCompanyFault()&&
                    <Tooltip disableFocusListener disableTouchListener title="לחץ לצירוף תעודת ספק"  >
                    <div className = "iconButton"
                      onClick = {OnUploadProviderFile}>
                            <h1>הוסף תעודת ספק</h1>
                            <ListAltIcon/>
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
