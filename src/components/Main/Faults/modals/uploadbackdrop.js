import React from 'react'
import "./uploadbackdrop.scss"
import edit from "../../../../assets/uploadlogo.png";
function uploadbackdrop({onSubmit , onClose}) {

    return (
        <div className="Modal">
        <div className="Modal_content">
          <img src={edit} alt="" />
          <div className="Modal_form">
            <div className="Modal_form_item">
            <form action="http://localhost:4000/luna/upload"  encType="multipart/form-data" method="POST">
                   <input type="file" name="myFiles" multiple/>
              </form>
            </div>
            <h3>בחר קובץ להעלאה</h3>
          </div>
          <div className="Modal_actions">
            <button onClick = {onClose}>סגירה</button>
            <button onClick = {onSubmit} >העלאה</button>
          </div>
        </div>
      </div>
    )
}

export default uploadbackdrop


