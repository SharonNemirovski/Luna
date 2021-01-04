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
import netcom from "../../../assets/netcomlogo.png";
import bynet from "../../../assets/bynetlogo.png";
import hoshen from "../../../assets/hoshenlogo.png";
import Uploadfile from "./modals/uploadbackdrop"

export default function Fult({
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
  files
}) {
  const classes = useStyles();
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
  const [backdrop, openBackdrop] = useState(false);
  const [filebackdrop, openfileBackdrop] = useState(false);
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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () =>{
    openBackdrop(true);
  };

  const UpdateFault = (new_status , tech_name) => {
    let fultbody ={};
    const changetime = Date.now;
    if ((new_status !== "")){
      if((tech_name !== ""))
      {
        fultbody = { status: String(new_status) , emp: String(tech_name) };
        setFields({...fields ,tech:tech_name,status:new_status , last_changed:changetime});
      }
      else
      {
        fultbody ={ status: String(new_status) };
        setFields({...fields ,status:new_status, last_changed:changetime});
  
      } 
    } 
    else 
    {
      if ((tech_name !== "")){
       fultbody = { emp: String(tech_name) };
       setFields({...fields ,tech:tech_name , last_changed:changetime});
      }
    }

    if((new_status ==="")&&(tech_name ==="")){
      Swal.fire({confirmButtonText: "אישור" , title:"לא עודכן אף שדה" ,icon:"info"});
      openBackdrop(false);
      
    }
    else{
      
      fetch(`http://localhost:4000/luna/UpdateFult/${ID}`, {
        method: "POST",
        body: JSON.stringify(fultbody),
        headers: { "Content-Type": "application/json" },
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
    openfileBackdrop(true);
  };
  const UploadFiles = () =>{
    console.log("implement the post req for backend")
    openfileBackdrop(false);
  };
  const DownloadFiles = () =>{
    console.log("implement the get req for downloading the files from db")
  };
  return (
    <div>
      {backdrop && (
          <Backdrop onClose={() => openBackdrop(false)} onEdit={UpdateFault} company ={company} />
        )}
          {filebackdrop && (<Uploadfile onSubmit = {UploadFiles} onClose = {()=>openfileBackdrop(false)}/>
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
            <IconButton color="primary" onClick = {DownloadFiles}>
              <Badge badgeContent={2} color="secondary" variant="dot">
                <AssignmentIcon />
              </Badge>
            </IconButton>
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
                  <span className = "topogragh_info">{fields.tech}</span>
                </Typography>)}
                <Typography component={'span'} className="topogragh_status">
                  עודכן לאחרונה בתאריך:
                  <span className = "topogragh_info"> {fields.last_changed}</span>
                </Typography>

                <Typography component={'span'}>
                  <div className="operation_holder">
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
    
  );
}
