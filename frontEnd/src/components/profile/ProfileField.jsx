import React, { useState } from "react";
import { Input } from "../forms/Input";

const ProfileField = ({ label, value, editable }) => {
  if (!value) return null;
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between mb-4 bg-backgroundWhite p-3 rounded-lg word-break: break-all">
      <div>
        <p className="text-paragraph font-cocogooseLight text-darkBlue">
          {label}
        </p>
        {isEditing ? (
          <Input
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className=""
          />
        ) : (
          <p className="text-paragraph2 font-cocogooseLight">{value}</p>
        )}
      </div>
      {editable && (
        <div>
          {isEditing ? (
            <button
              className="text-paragraph2 font-cocogooseLight text-darkBlue hover:text-blue-700 underline"
              onClick={handleSaveClick}
            >
              Guardar
            </button>
          ) : (
            <button
              className="text-paragraph2 font-cocogooseLight text-darkBlue hover:text-blue-700 underline"
              onClick={handleEditClick}
            >
              Editar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileField;
