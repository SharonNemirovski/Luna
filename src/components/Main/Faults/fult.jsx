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
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';
import axios from "axios";
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
  company,
  actions,
  techname,
  onDelete,
  onClose,
  is_close,
  LastChange,
  filetype,
  providerfiletype
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
  });
  const [expanded, setExpanded] = useState(false);
  const [isfileexist , setFileflag] = useState(filetype);
  const [isProviderFileExist , setProviderFileFlag] = useState(providerfiletype)
  const [backdrop, openBackdrop] = useState(false);
  const [filebackdrop, openfileBackdrop] = useState(false);
  const [Providerfilebackdrop, openProviderfileBackdrop] = useState(false);



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
  const UpdateFault = (new_status , tech_name) => {
    let fultbody ={};
    let currentDate = new Date();
    if ((new_status !== "")){
      if((tech_name !== ""))
      {
        fultbody = { status: String(new_status) , emp: String(tech_name) };
        setFields({...fields ,tech:tech_name,status:new_status ,last_changed : pharseDate(currentDate.toISOString())});
      }
      else
      {
        fultbody ={ status: String(new_status) };
        setFields({...fields ,status:new_status,last_changed : pharseDate(currentDate.toISOString())});
  
      } 
    } 
    else 
    {
      if ((tech_name !== "")){
       fultbody = { emp: String(tech_name) };
       setFields({...fields ,tech:tech_name,last_changed : pharseDate(currentDate.toISOString()) });
      }
    }

    if((new_status ==="")&&(tech_name ==="")){
      Swal.fire({confirmButtonText: "אישור" , title:"לא עודכן אף שדה" ,icon:"info"});
      openBackdrop(false);
      
    }
    else{
      
      fetch(`http://localhost:4000/luna/UpdateFult/${ID}/${token}`, {
        method: "POST",
        body: JSON.stringify(fultbody),
        headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
          "authorization" : "Bearer " + token
        }
      })
        .then((res) => res.json())
      Swal.fire({confirmButtonText: "אישור" , title :"!התקלה עודכנה בהצלחה" ,icon:"success"});     
      setExpanded(false);
      openBackdrop(false);
    }


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
                  console.log("res is " + json.Filetype)
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
                  setProviderFileFlag(json.Filetype)
                }).catch((error) => { alert(error) });
            }} 
            onClose = {()=>openProviderfileBackdrop(false)}/>
        )}
      <Card className="fultcard">
        <CardContent  className={classes.cardcontant}>
          <Typography component={'span'} className="topogragh"> {fields.num}</Typography>
          <Typography component={'span'} className="topogragh">{fields.place}</Typography>
          <Typography component={'span'} className="topogragh">{fields.network}</Typography>
          <Typography component={'span'} className="topogragh">{fields.by}</Typography>
          <Typography component={'span'} className="topogragh">{fields.status}</Typography>
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
            {!IsCompanyFault()&&<div className = "spacer"><span></span></div>}
            <IconButton color="primary" onClick ={DownloadFiles}>
              <Badge badgeContent={isfileexist ==="" ? 0:1} color="secondary">
                <AssignmentIcon />
              </Badge>
            </IconButton>

              {IsCompanyFault()&&<IconButton color="primary" onClick ={DownloadProviderFiles}>
              <Badge badgeContent={isProviderFileExist ==="" ? 0:1} color="secondary">
                <ListAltIcon />
              </Badge>
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

                <Typography component={'span'}>
                  <div className={GetOperationStyle()}>
                    <IconButton onClick={handleEdit}>
                      <EditIcon style={{ color: "#1562aa" }} />
                    </IconButton>

                    <IconButton onClick={()=>{
                      setExpanded(false);
                      onClose();
                    }}>
                      <DoneIcon style={{ color: "#1562aa" }} />
                    </IconButton>
                    <IconButton onClick={()=>{ 
                      setExpanded(false);
                      onDelete();}}>
                      <DeleteIcon style={{ color: "#1562aa" }} />
                    </IconButton>

                    <IconButton onClick = {OnUploadFile}>
                      <CollectionsIcon style={{ color: "#1562aa" }} />
                    </IconButton>
                    {IsCompanyFault()&&<IconButton onClick = {OnUploadProviderFile}>
                      <PostAddIcon  style={{ color: "#1562aa" }} />
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
