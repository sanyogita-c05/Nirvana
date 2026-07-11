function AddProductModal({
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <div className="modal-header">

          <h2>Add New Product</h2>

          <button
            className="modal-close-btn"
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

export default AddProductModal;