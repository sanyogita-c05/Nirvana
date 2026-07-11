import { useState } from "react";
import { createProduct } from "../../api/productApi";
import ImageUpload from "./ImageUpload";

function ProductForm({ onClose, refreshProducts }) {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    stockQuantity: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload a product image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("costPrice", formData.costPrice);
      data.append("sellingPrice", formData.sellingPrice);
      data.append("stockQuantity", formData.stockQuantity);
      data.append("image", image);

      await createProduct(data);

      alert("Product added successfully!");

      refreshProducts();
      onClose();

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>

      <ImageUpload
        preview={preview}
        setPreview={setPreview}
        setImage={setImage}
      />

      <div className="form-grid">

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            value={formData.category}
            required
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
            required
          />
        </div>

        <div className="form-group">
          <label>Selling Price</label>

          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>

          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
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
          {loading ? "Saving..." : "Save Product"}
        </button>

      </div>

    </form>
  );
}

export default ProductForm;