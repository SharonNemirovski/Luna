import React, { useState , useEffect} from 'react'
import "./FualtViewer.scss";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import CloseIcon from '@material-ui/icons/Close';
import netcom from "../../../../assets/netcomlogo.png";
import bynet from "../../../../assets/bynetlogo.png";
import hoshen from "../../../../assets/hoshenlogo.png";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListAltIcon from '@material-ui/icons/ListAlt';
import IconButton from "@material-ui/core/IconButton"
import Tooltip from '@material-ui/core/Tooltip';
import { ThemeProvider } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { green} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from "axios";


const plugatext = "לחץ לצפייה בשרטוט";
const plugtext = "לחץ להוספת שרטוט";
const companytext = "לחץ לצפייה בטפסי הלקוח";
const comptext = "לחץ לצירוף טפסי לקוח";
const addplugatext = "הוספת שרטוט";
const addcomptext = "הוספת טפסי לקוח";

function FualtViewer({fualtsArray,onClose,token}) {
  const IsCompanyFault = () =>{
    if (fults[FualtIndex].Company === "אחר"){
      return false;
    }
    else{
      return true;
    }
};

  const [fults, setFults] = useState(fualtsArray);
  const [FualtIndex , setIndex] = useState(0);
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
   const handlpress = e => {
    console.log(e.key);}
  
  const faultData = [
    ["מיקום התקלה:",fults[FualtIndex].Place],
    ["ברשת:",fults[FualtIndex].Network],
    ["מספר אבנח/נטקום/בינת:",fults[FualtIndex].avanch_num],
    ["תיאור התקלה:",fults[FualtIndex].Description],
    ["נפתח בתאריך:",fults[FualtIndex].time],
    ["נוצר על ידי:",fults[FualtIndex].By],
    ["שם הטכנאי שיוצא לתקלה:","-"],
    ["תהליכים שבוצעו:",fults[FualtIndex].Actions],
    ["תהליכים שיש לבצע:",fults[FualtIndex].future_actions],
    ["סטטוס קודם:",fults[FualtIndex].pre_status],
    ["סטטוס נוכחי:",fults[FualtIndex].Status],
    ["עודכן לאחרונה בתאריך:",fults[FualtIndex].LastChange],
    ["עודכן לאחרונה על ידי:",fults[FualtIndex].lastUpdateBy]
  ];

    const getLogoByCompany = () =>{
      //returns thw logo by the company value
      switch(fults[FualtIndex].Company){
        case "נטקום" :
          return netcom;
          
        case "בינת":
          return bynet;
        
        default :
          return hoshen;
      }
    };
    const innerTheme = createMuiTheme({
      palette: {
        primary: {
          main: green[400],
        },
      },
    });
    const DownloadFiles = () =>{
      if(fults[FualtIndex].filetype ===""){
        if (fults[FualtIndex].Company === "אחר"){
          Swal.fire({confirmButtonText: "אישור" , title:"לא צורף שרטוט לתקלה" ,icon:"info"});
        }
        else{
          Swal.fire({confirmButtonText: "אישור" , title:"לא צורף טופס לתקלה" ,icon:"info"});
        }
      }
      else{
        axios.get(`http://localhost:80/luna/getfiles/${fults[FualtIndex].Id}/${token}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': `application/pdf`
            },
            responseType: "blob"
        }).then((response) => {
            const blob = new Blob([response.data], { type: fults[FualtIndex].filetype})
            const objectUrl = URL.createObjectURL(blob)
            window.open(objectUrl)
        }).catch((error) => { alert(error) })
      }
      }
    const DownloadProviderFiles = () =>{
        if(fults[FualtIndex].providerfiletype ===""){
          Swal.fire({confirmButtonText: "אישור" , title:"לא צורפה תעודת ספק לתקלה" ,icon:"info"});
        }
        else{
          axios.get(`http://localhost:80/luna/getProviderfiles/${fults[FualtIndex].Id}/${token}`,
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': `application/pdf`
              },
              responseType: "blob"
          }).then((response) => {
              const blob = new Blob([response.data], { type:fults[FualtIndex].providerfiletype})
              const objectUrl = URL.createObjectURL(blob)
              window.open(objectUrl)
          }).catch((error) => { alert(error) })
        }
        }
  
    return (
      
        <div className="ViewBackDrop" onKeyPress ={handlpress} >
            <div className="View"  >
                <div className="Header">
                    <div className="ActionButton" onClick={()=>{onClose()}}>
                       <CloseIcon  className="icon"/>
                    </div>
                    <div className="Avatar">
                        <img src={getLogoByCompany()} alt="" />
                    </div>
                    <div className="Files">
                    <IconButton color="primary"  onClick ={DownloadFiles}>
                      <ThemeProvider theme={innerTheme}>
                      <Tooltip disableFocusListener disableTouchListener title={fults[FualtIndex].Company === "אחר" ? plugatext : companytext}  >
                      <Badge badgeContent={1} color={fults[FualtIndex].filetype==="" ? "secondary":"primary"} variant="dot">
                      <AssignmentIcon />
                      </Badge>
                      </Tooltip>
                      </ThemeProvider>
                    </IconButton>
                    {IsCompanyFault()&&
                          <IconButton color="primary"  onClick ={DownloadProviderFiles}>
                              <ThemeProvider theme={innerTheme}>
                                <Tooltip disableFocusListener disableTouchListener title="לחץ לצפיה בתעודת ספק"  >
                                  <Badge badgeContent={1} color={fults[FualtIndex].providerfiletype  ==="" ? "secondary":"primary"} variant="dot">
                                    <ListAltIcon />
                                  </Badge>
                                </Tooltip>
                            </ThemeProvider>
                    </IconButton>}
                    </div>
                </div>
                <div className="ViewBody">
                      {
                        faultData.map((fields)=>{
                          return(
                            <ul key = {faultData.indexOf(fields)}>
                              {fields[0] === "שם הטכנאי שיוצא לתקלה:" ? 
                              (IsCompanyFault()===true?
                              <div className ="DataROw">
                              <span  className="info">
                                  שם הטכנאי שיוצא לתקלה:
                                </span>
                                <span className = "data">{fults[FualtIndex].Tech === ""? "לא ידוע":fults[FualtIndex].Tech}</span>
                             </div>:null):
                             (fields[0]==="סטטוס נוכחי:"? 
                             <div className ="DataROw">
                                    <span className="info" >{fields[0]}</span>
                                    <span className="importent" >{fields[1]}</span>
                             </div>:
                              <div className ="DataROw">
                                    <span className="info" >{fields[0]}</span>
                                    <span className="data" >{fields[1]}</span>
                              </div>)}
                        </ul>
                          )
                        })
                      }

                </div>
                <div className="BottomOperations">
                    <div className="ActionButton" onClick={()=>{
                       if(FualtIndex<fults.length-1)
                       {
                        let count = FualtIndex +1;
                        setIndex(count)
                       }
                      
                    }}>
                      <SkipNextIcon className="icon"/>
                      הבא
                    </div>
                    <span>תקלה מספר {FualtIndex+1}/{fualtsArray.length}</span>
                    <div className="ActionButton" onClick={()=>{
                       if(FualtIndex>0)
                       {
                        let count = FualtIndex -1;
                        setIndex(count)
                       }
                         
                    }}>
                      הקודם
                      <SkipPreviousIcon  className="icon"/>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default FualtViewer
