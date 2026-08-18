import { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import "./ImageUploadInput.css";

function ImageUploadInput({
  id = "image",
  name = "image",
  initialPreview = "",
}) {
  const [preview, setPreview] = useState(initialPreview);
  const [isDragging, setIsDragging] = useState(false);
  const [removed, setRemoved] = useState(false);

  function setFile(file) {
    if (file) {
      setRemoved(false);
      setPreview(URL.createObjectURL(file));

      const input = document.getElementById(id);
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
    }
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    setFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleClear(e) {
    e.preventDefault();
    setPreview("");
    document.getElementById(id).value = "";
    setRemoved(true);
  }

  return (
    <div className="image-upload">
      <label
        htmlFor={id}
        className={
          isDragging ? "image-upload-label dragging" : "image-upload-label"
        }
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="image-upload-preview" />
        ) : (
          <div className="image-upload-placeholder">
            <ImageIcon size={32} />
            <span>Click or drag an image here</span>
          </div>
        )}
      </label>

      {preview && (
        <button
          type="button"
          onClick={handleClear}
          className="image-upload-clear"
          aria-label="Remove image"
        >
          <X size={16} />
        </button>
      )}

      <input
        id={id}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
        className="image-upload-input"
      />
      <input
        type="hidden"
        name={`${name}Removed`}
        value={removed ? "true" : "false"}
      />
    </div>
  );
}

export default ImageUploadInput;
