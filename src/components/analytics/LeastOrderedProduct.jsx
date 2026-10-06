import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { product: "Bamboo Lamp", orders: 4 },
  { product: "Mini Sculpture", orders: 6 },
  { product: "Jute Bag", orders: 8 },
  { product: "Clay Diya Set", orders: 10 },
  { product: "Wooden Tray", orders: 12 },
];

function LeastOrderedProduct() {
  return (
    <div className="least-ordered-product-card">
      <div className="chart-card-header">
        <div>
          <h3>Least Ordered Products</h3>

          <p className="chart-subtitle">
            Products with the lowest number of orders
          </p>
        </div>
      </div>

      <div className="chart-area">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="#f1ece8"
            />

            <XAxis
              type="number"
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#8a5b44",
                fontSize: 12,
              }}
            />

            <YAxis
              type="category"
              dataKey="product"
              width={120}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#4b3025",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(181, 108, 240, 0.06)",
              }}
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #f1ece8",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
              }}
            />

            <Bar
              dataKey="orders"
              fill="#b56cf0"
              radius={[0, 8, 8, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LeastOrderedProduct;