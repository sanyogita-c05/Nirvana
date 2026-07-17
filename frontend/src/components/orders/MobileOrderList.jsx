import OrderCard from "./OrderCard";

const orders = [
  {
    id: "#ORD-1024",
    customer: "Emma Watson",
    avatar: "E",
    product: "Handmade Vase",
    date: "12 Jul 2026",
    amount: "₹2,450",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD-1025",
    customer: "John Carter",
    avatar: "J",
    product: "Crochet Bag",
    date: "12 Jul 2026",
    amount: "₹1,350",
    payment: "Pending",
    status: "Processing",
  },
  {
    id: "#ORD-1026",
    customer: "Sophia Lee",
    avatar: "S",
    product: "Macrame Wall Art",
    date: "11 Jul 2026",
    amount: "₹3,850",
    payment: "Paid",
    status: "Shipped",
  },
];

function MobileOrderList() {
  return (
    <section className="mobile-order-list">

      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}

    </section>
  );
}

export default MobileOrderList;