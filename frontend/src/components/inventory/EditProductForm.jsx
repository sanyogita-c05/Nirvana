import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { updateProduct } from "../../api/productApi";

function EditProductForm({
  product,
  refreshProducts,
  onClose,
}) {
  // Images/video already saved on the server — shown read-only here.
  // There's no per-image delete endpoint yet, so these can't be removed
  // from this form; new images the user adds below get appended
  // alongside these on save, they don't replace them.
  const [existingImages, setExistingImages] = useState(product.images || []);
  const [existingVideo, setExistingVideo] = useState(product.video || null);

  // Newly added files this session — these are what actually get sent.
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [videoPreview, setVideoPreview] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    category: product.category || "",
    costPrice: product.costPrice || "",
    sellingPrice: product.sellingPrice || "",
    stockQuantity: product.stockQuantity || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product) return;

    // These three setState calls run synchronously in this effect on
    // purpose: they re-sync the editable form state whenever a different
    // `product` prop comes in (e.g. clicking "Edit" on another row while
    // this modal is still open, without fully unmounting first).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExistingImages(product.images || []);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExistingVideo(product.video || null);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      costPrice: product.costPrice || "",
      sellingPrice: product.sellingPrice || "",
      stockQuantity: product.stockQuantity || "",
    });
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("costPrice", formData.costPrice);
      data.append("sellingPrice", formData.sellingPrice);
      data.append("stockQuantity", formData.stockQuantity);

      // Only sent if the user actually picked new files this session —
      // backend appends these to the existing gallery, doesn't replace it.
      imageFiles.forEach((file) => {
        data.append("images", file);
      });

      // A new video replaces the old one (single slot) on the backend.
      if (videoFile) {
        data.append("video", videoFile);
      }

      await updateProduct(product._id, data);
      await refreshProducts();

      toast.success("Product updated successfully!");

      onClose();

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Unable to update product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>

      {existingImages.length > 0 && (
        <div className="existing-media">
          <label className="image-upload-label">Current Images</label>

          <div className="image-upload-grid">
            {existingImages.map((img) => (
              <div className="image-preview-thumb" key={img.url}>
                <img
                  src={`http://localhost:5000${img.url}`}
                  alt={img.originalName || "Product image"}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {existingVideo?.url && (
        <div className="existing-media">
          <label className="image-upload-label">Current Video</label>

          <video
            src={`http://localhost:5000${existingVideo.url}`}
            controls
            className="video-preview"
          />
        </div>
      )}

      <ImageUpload
        imagePreviews={imagePreviews}
        setImageFiles={setImageFiles}
        setImagePreviews={setImagePreviews}
        videoPreview={videoPreview}
        setVideoFile={setVideoFile}
        setVideoPreview={setVideoPreview}
      />

      <div className="form-grid">

        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Cost Price</label>

          <input
            type="number"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Selling Price</label>

          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>

          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="form-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-btn"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Product"}
        </button>

      </div>

    </form>
  );
}

export default EditProductForm;