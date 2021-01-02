import React from 'react';
import './Contact.scss';
import '../Animation/anima.scss';
import contactIMG from '../../../assets/contactClear.png';

export default function Contact() {
  return (
    <div className="Contact DropAnimation">
      <div className="wrap">
        <div className="data">
          <label>
            <h1>ניתן ליצור קשר במספר דרכים:</h1>
          </label>
          <label>
            <h3>זירת נו"צ :</h3>
          </label>
          <label>להתקשר באדום למספר - 017</label>
          <label>להתקשר למספר אזרחי - 03-9572111</label>
          <label>
            <h3>צוות תרה :</h3>
          </label>
          <label>להתקשר במטכ"לי למספר - </label>
          <label>גל גלזר - </label>

          <label>
            <h3>במידה וישנה בעיה במערכת יש לפנות לאחד המספרים הבאים:</h3>
          </label>
          <label>שרון נמירובסקי - 054-5826664</label>
          <label>מתן דאבוש - 050-9147470</label>
        </div>
        <img src={contactIMG} className="imgC"></img>
      </div>
    </div>
  );
}
