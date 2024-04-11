import React, { useState } from "react";

function Text({ text, update, id, handleDelete }) {
  const [updatedText, setUpdatedText] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleUpdate = async (id, newText) => {
    try {
      const updatedData = await update(id, newText);
      setShowInput(false);
      console.log("Updated data:", updatedData);
    } catch (err) {
      console.error("Error updating data:", err);
      setShowInput(false);
    }
  };

  return (
    <div className="text">
      <p>{text}</p>
      {showInput && (
        <div>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            placeholder="Enter text"
          />
          <button onClick={() => handleUpdate(id, updatedText)}>Done</button>
        </div>
      )}
      <div>
        <button onClick={() => setShowInput(true)}>Update</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default Text;
