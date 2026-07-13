import {
  ShoppingBag,
  Clock3,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "1,248",
    change: "+12.5%",
    icon: <ShoppingBag size={26} />,
    color: "orange",
  },
  {
    title: "Pending Orders",
    value: "46",
    change: "+4",
    icon: <Clock3 size={26} />,
    color: "yellow",
  },
  {
    title: "Completed",
    value: "1,170",
    change: "+8.3%",
    icon: <CheckCircle2 size={26} />,
    color: "green",
  },
  {
    title: "Revenue Today",
    value: "₹18,750",
    change: "+₹2,340",
    icon: <IndianRupee size={26} />,
    color: "purple",
  },
];

function OrderStats() {
  return (
    <section className="order-stats">

      {stats.map((item, index) => (
        <div className="order-stat-card" key={index}>

          <div className={`stat-icon ${item.color}`}>
            {item.icon}
          </div>

          <div className="stat-content">

            <p>{item.title}</p>

            <h2>{item.value}</h2>

            <span>{item.change}</span>

          </div>

        </div>
      ))}

    </section>
  );
}

export default OrderStats;