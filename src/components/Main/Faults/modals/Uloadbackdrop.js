import React,{useState} from 'react'
import "./uploadbackdrop.scss"
import axios from "axios";
import Progressui from "./progressui";
export default function Uploadbackdrop({ onClose ,token , fualtid ,doneupload , IsProviderFile , ChangeExisistingFile}) {
  const [uploaded,setFiles] = useState('');
  const [nameoffiles,setfilename] = useState('');
  const [precent , setprogress] = useState(0);
  const [isLoaded , setLoadedFlag] = useState(false);
  const [iserror, seterror] = useState(false);
  const [twicepresserror, settwicepresserror] = useState(false);
  const [isAlreadyUploaded , setAlreadyuploadeded] = useState(false);
  const submit = async(e) => {
    if(isLoaded === true){
      if(isAlreadyUploaded === false){
        e.preventDefault();
        const formData = new FormData();
        formData.append('FualtFiles' ,uploaded);
        let isprovider = ""
        if(IsProviderFile === true){
          isprovider ="yes"
        }
        else{
          isprovider ="no"
        }

        try{
          const res = await axios.post(`http://localhost:80/luna/upload/${isprovider}/${fualtid}/${ChangeExisistingFile}/${token}`, formData , {
            headers:{
              'Content-Type':'multipart/form-data',
            },
            onUploadProgress: ProgressEvent =>{
              setprogress(parseInt(Math.round((ProgressEvent.loaded *100)/ProgressEvent.total)));
            }
            //clear progress
          
          });
          setAlreadyuploadeded(true);
        }
        catch(err){
          console.log(err);
        };
      }
      else
      {
        settwicepresserror(true);
      }
    }
    else{
      seterror(true);
    }
  };

  const onupload = e =>{
    setFiles(e.target.files[0]);
    setfilename(e.target.files[0].name);
    setLoadedFlag(true);
    seterror(false);
  };
    return (
        <div className="Modal">
        <div className="Modal_content">
          <div className="Modal_form">

            <div className="Modal_form_item">
            <form>
                   <input type="file" name="FualtFiles" onChange ={onupload}/>
              </form>
            </div>

            <div className="Modal_form_item">
            <Progressui props = {precent} value = {precent} loadingdone = {()=>{doneupload()}}/>
            </div>
            
            {!iserror && !twicepresserror&& <h3>{nameoffiles === ''? " בחר או גרור להעלאת קובץ " : " הקובץ שנבחר הינו  " + nameoffiles }</h3>}
            {iserror && !twicepresserror&&
                  <h4>
                    לא נבחר קובץ להעלאה
                  </h4>}

                  {!iserror && twicepresserror&&
                  <h4>
                    כבר בוצעה העלאת קובץ לתקלה זו
                  </h4>}
          </div>

          <div className="Modal_actions">
            <button onClick = {onClose}>סגירה</button>
            <button onClick = {submit}>העלאה</button>
          </div>
        </div>
      </div>
    )
}


