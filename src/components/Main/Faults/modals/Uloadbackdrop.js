import React,{useState} from 'react'
import "./uploadbackdrop.scss"
import axios from "axios";
import Progressui from "./progressui";
export default function Uploadbackdrop({ onClose ,token}) {
  const [uploaded,setFiles] = useState('');
  const [nameoffiles,setfilename] = useState('');
  const [precent , setprogress] = useState(0);
  const submit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('FualtFiles' ,uploaded);

    try{
      const res = await axios.post(`http://localhost:4000/luna/upload/${token}`, formData , {
        headers:{
          'Content-Type':'multipart/form-data',
          "authorization" : "Bearer " + token
        },
        onUploadProgress: ProgressEvent =>{
          setprogress(parseInt(Math.round((ProgressEvent.loaded *100)/ProgressEvent.total)));
          setTimeout(() => {
          setprogress(0);
          }, 3000);
        }
        //clear progress
        
      });
      
    }
    catch(err){
      console.log(err);
    };
    
  };

  const onupload = e =>{
    setFiles(e.target.files[0]);
    setfilename(e.target.files[0].name);
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
            <Progressui props = {precent} value = {precent}/>
            </div>
            
            <h3>{nameoffiles === ''? " בחר או גרור להעלאת קובץ " : " הקובץ שנבחר הינו  " + nameoffiles }</h3>
          </div>
          <div className="Modal_actions">
            <button onClick = {onClose}>סגירה</button>
            <button onClick = {submit}>העלאה</button>
          </div>
        </div>
      </div>
    )
}


