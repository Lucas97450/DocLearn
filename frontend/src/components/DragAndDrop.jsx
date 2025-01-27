import React, { useState } from "react";
import "./dragAndDrop.css";

const DragAndDrop = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="drag-and-drop"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p>Drag and drop your files here</p>
      {files.length > 0 && (
        <ul className="uploaded-files">
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DragAndDrop;
