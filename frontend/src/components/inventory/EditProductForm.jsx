import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { updateProduct } from "../../api/productApi";

function EditProductForm({
  product,
  refreshProducts,
  onClose,
}) {
  const [preview, setPreview] = useState(
    product.imagePath
      ? `http://localhost:5000${product.imagePath}`
      : ""
  );

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    category: product.category || "",
    costPrice: product.costPrice || "",
    sellingPrice: product.sellingPrice || "",
    stockQuantity: product.stockQuantity || "",
  });

  useEffect(() => {
    if (!product) return;

    setPreview(
      product.imagePath
        ? `http://localhost:5000${product.imagePath}`
        : ""
    );

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
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("costPrice", formData.costPrice);
      data.append("sellingPrice", formData.sellingPrice);
      data.append("stockQuantity", formData.stockQuantity);

      // Only send image if user selected a new one
      if (image) {
        data.append("image", image);
      }

      await updateProduct(product._id, data);
      await refreshProducts();

      alert("Product updated successfully!");

      onClose();

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Unable to update product."
      );
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
        >
          Update Product
        </button>

      </div>

    </form>
  );
}

export default EditProductForm;