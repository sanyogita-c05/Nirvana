import { useState } from "react";

import ProductRow from "./ProductRow";
import AddProductModal from "./AddProductModal";
import ProductForm from "./ProductForm";

function ProductInventoryTable({
  products,
  loading,
  refreshProducts,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <section className="inventory-table-card">
        <h3>Loading products...</h3>
      </section>
    );
  }

  return (
    <>
      <section className="inventory-table-card">

        <div className="table-header">

          <div>
            <h2>Product Inventory</h2>
            <p>Manage all handcrafted products</p>
          </div>

          <button onClick={() => setIsModalOpen(true)}>
            + Add Product
          </button>

        </div>

        <div className="table-wrapper">

          <table className="inventory-table">

            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                    }}
                  >
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                    refreshProducts={refreshProducts}
                  />
                ))
              )}

            </tbody>

          </table>

        </div>

      </section>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ProductForm
          refreshProducts={refreshProducts}
          onClose={() => setIsModalOpen(false)}
        />
      </AddProductModal>
    </>
  );
}

export default ProductInventoryTable;