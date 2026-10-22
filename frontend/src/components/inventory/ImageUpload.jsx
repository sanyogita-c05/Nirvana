import { useRef } from "react";

// Handles picking NEW files only (multiple images + one optional video)
// for the current form session. It doesn't know about images already
// saved on the server — EditProductForm displays those separately, since
// there's no per-image delete endpoint yet to manage them here.
function ImageUpload({
  imagePreviews,
  setImageFiles,
  setImagePreviews,
  videoPreview,
  setVideoFile,
  setVideoPreview,
}) {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    // reset so selecting the same file again still fires onChange
    e.target.value = "";
  };

  const handleRemoveNewImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]); // free browser memory

    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // free the previous preview if there was one
    if (videoPreview) URL.revokeObjectURL(videoPreview);

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));

    // reset so selecting the same file again still fires onChange
    e.target.value = "";
  };

  const handleRemoveVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);

    setVideoFile(null);
    setVideoPreview("");

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  return (
    <div className="media-upload">

      {/* ---------- IMAGES ---------- */}
      <div className="image-upload">
        <label className="image-upload-label">Product Images</label>

        <div className="image-upload-grid">

          {imagePreviews.map((src, index) => (
            <div className="image-preview-thumb" key={src}>
              <img src={src} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="remove-thumb-btn"
                onClick={() => handleRemoveNewImage(index)}
                aria-label="Remove image"
              >
                ✕
              </button>
            </div>
          ))}

          <div
            className="image-upload-box"
            onClick={() => imageInputRef.current.click()}
          >
            <div className="upload-icon">📷</div>
            <p>Add image(s)</p>
            <span>JPG • PNG • WEBP</span>
          </div>

        </div>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          hidden
          onChange={handleImagesChange}
        />
      </div>

      {/* ---------- VIDEO ---------- */}
      <div className="video-upload">
        <label className="image-upload-label">Product Video (optional)</label>

        {videoPreview ? (
          <div className="video-preview-wrapper">
            <video
              src={videoPreview}
              controls
              className="video-preview"
            />

            <button
              type="button"
              className="video-remove-btn"
              onClick={handleRemoveVideo}
              aria-label="Remove video"
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            className="image-upload-box"
            onClick={() => videoInputRef.current.click()}
          >
            <div className="upload-icon">🎬</div>
            <p>Click to upload video</p>
            <span>MP4 • MOV • WEBM</span>
          </div>
        )}

        <input
          ref={videoInputRef}
          type="file"
          accept="video/mp4,video/quicktime,video/webm"
          hidden
          onChange={handleVideoChange}
        />
      </div>

    </div>
  );
}

export default ImageUpload;