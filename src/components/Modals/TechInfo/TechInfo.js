import React, { useState } from "react";
import "./TechInfo.scss";
import TextField from "@material-ui/core/TextField";


export default function TechInfo({
  isEditModeSet = false,
  selectedTech,
  onClose,
  onDelete,
  onSave,
}) {
  
  const [isEditMode, setIsEditMode] = useState(isEditModeSet);
  const { name, description, imgUrl, id } = selectedTech;
  const [techInfo, setTechInfo] = useState({
    id,
    name,
    description,
  });

  const onNameChange = (value) => {
    setTechInfo({
      ...techInfo,
      name: value,
    });
  };

  const onDescriptionChange = (value) => {
    setTechInfo({
      ...techInfo,
      description: value,
    });
  };

  const onSubmit = () => {
    setIsEditMode((prevValue) => !prevValue);
    onSave(techInfo);
  };

  return (
    <div className="TechInfoModal">
      <div className="TechInfoModal_content">
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
                onChange={(e) => onDescriptionChange(e.target.value)}
                label="אישור כניסה"
                value={techInfo.description}
              />
            ) : (
              <p>{techInfo.description}</p>
            )}
          </div>
        </div>
        <div className="TechInfoModal_actions">
          <button onClick={onClose}>סגור</button>
          <button onClick={() => onDelete(id)}>מחיקה</button>
          <button onClick={onSubmit}> {isEditMode ? "שמירה" : "עריכה"} </button>
        </div>
      </div>
    </div>
  );
}
