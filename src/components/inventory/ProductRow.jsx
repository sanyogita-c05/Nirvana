import toast from "react-hot-toast";
import { deleteProduct } from "../../api/productApi";
import StatusBadge from "./StatusBadge";

function ProductRow({
  product,
  refreshProducts,
  onEdit,
}) {

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(product._id);

      refreshProducts();

    } catch (error) {

      console.error(error);

      toast.error("Unable to delete product.");

    }
  };

  const getStatus = () => {

    if (product.stockQuantity === 0)
      return "Out of Stock";

    if (product.stockQuantity <= 5)
      return "Low Stock";

    return "In Stock";
  };

  return (
    <tr>

      <td>
        <img
          src={
            product.images?.[0]?.url
              ? `http://localhost:5000${product.images[0].url}`
              : "/placeholder-product.png"
          }
          alt={product.name}
          className="product-avatar"
        />
      </td>

      <td>{product.name}</td>

      <td>{product.sku}</td>

      <td>{product.category}</td>

      <td>{product.stockQuantity}</td>

      <td>₹{product.sellingPrice}</td>

      <td>
        <StatusBadge
          status={getStatus()}
        />
      </td>

      <td>
        {new Date(
          product.updatedAt
        ).toLocaleDateString()}
      </td>

      <td>

        <div className="inventory-actions">

          <button
            onClick={() => onEdit(product)}
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
}

export default ProductRow;