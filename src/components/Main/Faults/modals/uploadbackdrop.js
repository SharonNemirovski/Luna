import React from 'react'
import "./uploadbackdrop.scss"
import edit from "../../../../assets/uploadlogo.png";

function uploadbackdrop({onSubmit , onClose}) {

    return (
        <div className="Modal">
        <div className="Modal_content">
          <div className="Modal_form">
            <div className="Modal_form_item">
            <form action="http://localhost:4000/luna/upload"  encType="multipart/form-data" method="POST">
                   <input type="file" name="FualtFiles" multiple/>
                   <button >העלאה</button>
              </form>
            </div>
            <h3>גרור או לחץ להעלאת קבצים</h3>
          </div>
          <div className="Modal_actions">
            <button onClick = {onClose}>סגירה</button>
          </div>
        </div>
      </div>
    )
}

export default uploadbackdrop


