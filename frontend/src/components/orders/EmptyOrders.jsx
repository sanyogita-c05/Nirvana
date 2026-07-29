import { PackageOpen } from "lucide-react";

function EmptyOrders({ onCreate }) {

  
  return (
    <div className="empty-orders">

      <div className="empty-icon">
        <PackageOpen size={70} />
      </div>

      <h2>No Orders Yet</h2>

      <p>
        Your orders will appear here once customers start
        purchasing your products.
      </p>

      <button className="empty-btn">
        Create First Order
      </button>

    </div>
  );
}

export default EmptyOrders;