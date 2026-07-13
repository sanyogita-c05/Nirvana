function EditProductModal({
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <div className="modal-header">

          <div>
            <h2>Edit Product</h2>
            <p>Update your handcrafted product details.</p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>

    </div>
  );
}

export default EditProductModal;