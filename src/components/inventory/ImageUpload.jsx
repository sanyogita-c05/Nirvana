import { useRef } from "react";

function ImageUpload({
  preview,
  setPreview,
  setImage,
}) {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="image-upload">

      <label className="image-upload-label">
        Product Image
      </label>

      <div
        className="image-upload-box"
        onClick={() => fileInputRef.current.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="image-preview"
          />
        ) : (
          <>
            <div className="upload-icon">
              📷
            </div>

            <p>Click to upload image</p>

            <span>
              JPG • PNG • WEBP
            </span>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />

    </div>
  );
}

export default ImageUpload;