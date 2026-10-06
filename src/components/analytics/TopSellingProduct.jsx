import { BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [
  { product: "Handmade Vase", orders: 42 },
  { product: "Clay Pot", orders: 35 },
];

function TopSellingProduct() {
  return (
    <div className="top-selling-product-card">
      <h3>Test Chart</h3>
      <BarChart width={500} height={300} data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis type="category" dataKey="product" />
        <Bar dataKey="orders" fill="#ff7a3d" />
      </BarChart>
    </div>
  );
}

export default TopSellingProduct;