import { useState } from "react";

import ProductRow from "./ProductRow";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import ProductForm from "./ProductForm";
import EditProductForm from "./EditProductForm";

function ProductInventoryTable({
  products,
  loading,
  refreshProducts,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

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

          <button
            onClick={() => setIsAddModalOpen(true)}
          >
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
                    onEdit={handleEdit}
                  />
                ))
              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* Add Product */}

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <ProductForm
          refreshProducts={refreshProducts}
          onClose={() => setIsAddModalOpen(false)}
        />
      </AddProductModal>

      {/* Edit Product */}

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
      >
        <EditProductForm
          product={selectedProduct}
          refreshProducts={refreshProducts}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      </EditProductModal>

    </>
  );
}

export default ProductInventoryTable;