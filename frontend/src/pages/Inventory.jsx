import { useEffect, useState } from "react";
import { getProducts } from "../api/product";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await getProducts();

        if (isMounted) {
          setProducts(res.data.data);
        }
      } catch (error) {
        if (isMounted) {
          alert(
            error.response?.data?.message ||
            "Failed to load products"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const getStatus = (stock) => {
    if (stock === 0) return "🔴 Out of Stock";
    if (stock <= 10) return "🟡 Low Stock";
    return "🟢 In Stock";
  };

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Inventory</h1>

      <br />

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Selling</th>
            <th>Profit</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={`http://localhost:5000${product.imagePath}`}
                    alt={product.name}
                    width="70"
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.sku}</td>

                <td>{product.category}</td>

                <td>₹{product.costPrice}</td>

                <td>₹{product.sellingPrice}</td>

                <td>
                  ₹{product.sellingPrice - product.costPrice}
                </td>

                <td>{product.stockQuantity}</td>

                <td>{getStatus(product.stockQuantity)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No Products Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;