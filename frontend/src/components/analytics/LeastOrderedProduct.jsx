// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import api from "../../api/api";

// function LeastOrderedProduct() {

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLeastOrdered = async () => {
//       try {
//         const res = await api.get("/products/least-ordered");
//         setData(
//           res.data.data.map((product) => ({
//             product: product.name,
//             orders: product.totalSold ?? product.orders ?? 0,
//           }))
//         );
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load least ordered products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeastOrdered();
//   }, []);

//   return (
//     <div className="least-ordered-product-card">
//       <div className="chart-card-header">
//         <div>
//           <h3>Least Ordered Products</h3>

//           <p className="chart-subtitle">
//             Products with the lowest number of orders
//           </p>
//         </div>
//       </div>

//       <div className="chart-area">

//         {loading && <p>Loading chart...</p>}
//         {error && <p>{error}</p>}
//         {!loading && !error && data.length === 0 && <p>No product data yet.</p>}

//         {!loading && !error && data.length > 0 && (
//           <ResponsiveContainer width="100%" height={320}>
//             <BarChart
//               data={data}
//               layout="vertical"
//               margin={{
//                 top: 10,
//                 right: 30,
//                 left: 20,
//                 bottom: 10,
//               }}
//             >
//               <CartesianGrid
//                 horizontal={false}
//                 stroke="#f1ece8"
//               />

//               <XAxis
//                 type="number"
//                 allowDecimals={false}
//                 domain={[0, (dataMax) => Math.max(dataMax, 1)]}
//                 tickLine={false}
//                 axisLine={false}
//                 tick={{
//                   fill: "#8a5b44",
//                   fontSize: 12,
//                 }}
//               />

//               <YAxis
//                 type="category"
//                 dataKey="product"
//                 width={120}
//                 tickLine={false}
//                 axisLine={false}
//                 tick={{
//                   fill: "#4b3025",
//                   fontSize: 12,
//                 }}
//               />

//               <Tooltip
//                 cursor={{
//                   fill: "rgba(181, 108, 240, 0.06)",
//                 }}
//                 contentStyle={{
//                   borderRadius: 14,
//                   border: "1px solid #f1ece8",
//                   boxShadow: "0 10px 30px rgba(0,0,0,.08)",
//                 }}
//               />

//               <Bar
//                 dataKey="orders"
//                 fill="#b56cf0"
//                 radius={[0, 8, 8, 0]}
//                 barSize={28}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LeastOrderedProduct;

import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import api from "../../api/api";

function LeastOrderedProduct() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bypassing Recharts' own ResponsiveContainer here — it was getting
  // permanently stuck reporting 0 width inside this CSS Grid layout, even
  // after the container itself resolved to a real, non-zero size (debounce
  // and manual resize events didn't fix it). Instead we measure the
  // wrapper div ourselves with a plain ResizeObserver and render a
  // fixed-size BarChart once we have a genuine pixel width.
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Read the size immediately (don't wait for the first observer callback)
    setChartWidth(el.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) setChartWidth(width);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchLeastOrdered = async () => {
      try {
        const res = await api.get("/products/least-ordered");
        setData(
          res.data.data.map((product) => ({
            product: product.name,
            orders: product.totalSold ?? product.orders ?? 0,
          }))
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load least ordered products.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeastOrdered();
  }, []);

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

      <div className="chart-area" ref={containerRef} style={{ width: "100%" }}>

        {loading && <p>Loading chart...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && data.length === 0 && <p>No product data yet.</p>}

        {!loading && !error && data.length > 0 && chartWidth > 0 && (
          <BarChart
            width={chartWidth}
            height={320}
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
              domain={[0, (dataMax) => Math.max(dataMax, 1)]}
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
        )}
      </div>
    </div>
  );
}

export default LeastOrderedProduct;