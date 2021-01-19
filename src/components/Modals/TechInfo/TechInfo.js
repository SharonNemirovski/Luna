import React, { useState } from 'react';
import './TechInfo.scss';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const Swal = require("sweetalert2");
export default function TechInfo({
  isEditModeSet = false,
  selectedTech,
  onClose,
  onDelete,
  onSave,
  IsEditor
}) {
  const [isEditMode, setIsEditMode] = useState(isEditModeSet);
  const {
    name,
    car,
    carNum,
    phoneNum,
    numID,
    passCode,
    imgUrl,
    id,
  } = selectedTech;
  const [techInfo, setTechInfo] = useState({
    id,
    name,
    numID,
    passCode,
    car,
    carNum,
    phoneNum,
  });
  //name
  const onNameChange = (value) => {
    setTechInfo({
      ...techInfo,
      name: value,
    });
  };
  //car
  const onCarChange = (value) => {
    setTechInfo({
      ...techInfo,
      car: value,
    });
  };
  //carNum
  const onCarNumChange = (value) => {
    setTechInfo({
      ...techInfo,
      carNum: value,
    });
  };
  //phoneNum
  const onPhoneNumChange = (value) => {
    setTechInfo({
      ...techInfo,
      phoneNum: value,
    });
  };
  //numID
  const onnumIDChange = (value) => {
    setTechInfo({
      ...techInfo,
      numID: value,
    });
  };
  //passCode
  const onpassCode = (value) => {
    setTechInfo({
      ...techInfo,
      passCode: value,
    });
  };

  const onSubmit = () => {
      if (isEditMode) {
        onSave(techInfo);
        return;
      }
      setIsEditMode((prevValue) => !prevValue);
  };

  return (
    <div className="TechInfoModal">
      <div
        className={
          isEditMode ? 'TechInfoModal_content_edit' : 'TechInfoModal_content'
        }
      >
        <img src={imgUrl} alt="" />
        <div className="TechInfoModal_form">
          <div className="TechInfoModal_form_item">
            {isEditMode ? (
              <TextField
                onChange={(e) => onNameChange(e.target.value)}
                label="שם טכנאי"
                value={techInfo.name}
              />
            ) : (
              <h3>{techInfo.name}</h3>
            )}
          </div>
          <div className="TechInfoModal_form_item">
            {isEditMode ? (
              <TextField
                onChange={(e) => onCarChange(e.target.value)}
                label="רכב"
                value={techInfo.car}
              />
            ) : (
              <p>רכב: {techInfo.car}</p>
            )}
          </div>
          <div className="TechInfoModal_form_item">
            {isEditMode ? (
              <TextField
                onChange={(e) => onCarNumChange(e.target.value)}
                label="מספר רכב"
                value={techInfo.carNum}
              />
            ) : (
              <p>מספר רכב: {techInfo.carNum}</p>
            )}
          </div>
          <div className="TechInfoModal_form_item">
            {isEditMode ? (
              <TextField
                onChange={(e) => onPhoneNumChange(e.target.value)}
                label="מספר פלאפון"
                value={techInfo.phoneNum}
              />
            ) : (
              <p>מספר פלאפון: {techInfo.phoneNum}</p>
            )}
          </div>
          <div className="TechInfoModal_form_item">
            {isEditMode ? (
              <TextField
                onChange={(e) => onnumIDChange(e.target.value)}
                label="מספר תעודת זהות"
                value={techInfo.numID}
              />
            ) : (
              <p>מספר תעודת זהות: {techInfo.numID}</p>
            )}
          </div>
          <div className="TechInfoModal_form_item">
            {isEditMode ? (
              <TextField
                onChange={(e) => onpassCode(e.target.value)}
                label="אישור כניסה"
                value={techInfo.passCode}
              />
            ) : (
              <p>אישור כניסה: {techInfo.passCode}</p>
            )}
          </div>
        </div>
        <div className="TechInfoModal_actions">
          <button onClick={onClose}>סגור</button>
          {IsEditor&&(<button onClick={() => {onDelete(id)}}>מחיקה </button>)}
          {IsEditor&&(<button onClick={onSubmit}> {isEditMode ? 'שמירה' : 'עריכה'} </button>)}
        </div>
      </div>
    </div>
  );
}
