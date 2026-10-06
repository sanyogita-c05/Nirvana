import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  TrendingUp,
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
} from "lucide-react";

import "./AnalyticsDemo.css";

import {
  stats,
  revenueTrend,
  topProducts,
  categoryRevenue,
  orderSources,
  customerGrowth,
  orderStatus,
  inventoryHealth,
  peakSales,
  businessInsights,
  recentActivities,
} from "../data/analyticsDemoData";

const COLORS = [
  "#ff7a3d",
  "#b56cf0",
  "#34a853",
  "#4285f4",
  "#fbbc05",
];

function AnalyticsDemo() {
  return (
    <div className="analytics-demo-page">

      {/* ================= Banner ================= */}

      <section className="analytics-demo-banner">

        <div className="analytics-demo-left">

          <span className="analytics-tag">
            📊 Analytics Dashboard
          </span>

          <h1>
            Grow Your Handmade
            <br />
            Business with Insights
          </h1>

          <p>
            Monitor revenue, customer growth, top-selling products,
            inventory performance, and business trends using this
            interactive analytics dashboard.
          </p>

        </div>

        <div className="analytics-summary-card">

          <TrendingUp size={46} />

          <h2>Business Health</h2>

          <h3>Excellent</h3>

          <p>
            Revenue has increased steadily over the last
            eight months with healthy customer growth.
          </p>

        </div>

      </section>

      {/* ================= Stats ================= */}

      <section className="analytics-stats-grid">

        {stats.map((item) => (

          <div className="analytics-stat-card" key={item.id}>

            <div className="analytics-stat-icon">

              {item.id === 1 && <IndianRupee />}
              {item.id === 2 && <ShoppingBag />}
              {item.id === 3 && <Users />}
              {item.id === 4 && <Package />}

            </div>

            <span>{item.title}</span>

            <h2>{item.value}</h2>

            <p
              className={
                item.positive
                  ? "positive"
                  : "negative"
              }
            >
              {item.change}
            </p>

          </div>

        ))}

      </section>

      {/* ================= Revenue Trend ================= */}

      <section className="chart-card">

        <div className="chart-header">

          <div>

            <h2>Revenue Trend</h2>

            <p>
              Monthly revenue and order growth over
              the last eight months.
            </p>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={380}
        >

          <LineChart
            data={revenueTrend}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="orders"
              fill="#b56cf0"
              radius={[5, 5, 0, 0]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#ff7a3d"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </section>

      {/* ================= Two Charts Row ================= */}

      <section className="analytics-two-column">

        {/* ================= Top Selling Products ================= */}

        <div className="chart-card">

          <div className="chart-header">
            <div>
              <h2>Top Selling Products</h2>
              <p>Products generating the highest sales.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={330}>
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{
                left: 30,
                right: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="name"
                type="category"
                width={120}
              />
              <Tooltip />
              <Bar
                dataKey="sold"
                fill="#ff7a3d"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* ================= Revenue by Category ================= */}

        <div className="chart-card">

          <div className="chart-header">
            <div>
              <h2>Revenue by Category</h2>
              <p>Contribution from every product category.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={330}>
            <PieChart>

              <Pie
                data={categoryRevenue}
                dataKey="value"
                nameKey="category"
                innerRadius={70}
                outerRadius={115}
                paddingAngle={4}
              >
                {categoryRevenue.map((item, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </section>

      {/* ================= Customer + Orders ================= */}

      <section className="analytics-two-column">

        {/* ================= Customer Growth ================= */}

        <div className="chart-card">

          <div className="chart-header">
            <div>
              <h2>Customer Growth</h2>
              <p>Monthly increase in customers.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={330}>

            <AreaChart
              data={customerGrowth}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="customers"
                stroke="#34a853"
                fill="#34a85355"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

        {/* ================= Order Status ================= */}

        <div className="chart-card">

          <div className="chart-header">
            <div>
              <h2>Order Status</h2>
              <p>Current order distribution.</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={330}>

            <PieChart>

              <Pie
                data={orderStatus}
                dataKey="value"
                nameKey="status"
                innerRadius={65}
                outerRadius={110}
              >
                {orderStatus.map(
                  (item, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </section>

      {/* ================= Next Section ================= */}

      <section className="analytics-two-column">

        {/* ================= Inventory Health ================= */}

        <div className="chart-card">

          <div className="chart-header">
            <div>
              <h2>Inventory Health</h2>
              <p>Quick overview of product inventory.</p>
            </div>
          </div>

          <div className="inventory-grid">

            {inventoryHealth.map((item, index) => (

              <div
                key={index}
                className="inventory-card"
              >

                <h4>{item.title}</h4>

                <h2>{item.value}</h2>

              </div>

            ))}

          </div>

        </div>

        {/* ================= Peak Sales ================= */}

        <div className="chart-card">

          <div className="chart-header">
            <div>
              <h2>Peak Sales by Day</h2>
              <p>Revenue generated throughout the week.</p>
            </div>
          </div>

          <ResponsiveContainer
            width="100%"
            height={330}
          >

            <BarChart data={peakSales}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#4285f4"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </section>

      {/* ================= Business Insights ================= */}

      <section className="chart-card">

        <div className="chart-header">

          <div>

            <h2>Business Insights</h2>

            <p>
              AI-powered summary of your business performance.
            </p>

          </div>

        </div>

        <div className="insights-list">

          {businessInsights.map((item, index) => (

            <div
              key={index}
              className="insight-item"
            >

              <span>💡</span>

              <p>{item}</p>

            </div>

          ))}

        </div>

      </section>

      {/* ================= Recent Activities ================= */}

      <section className="chart-card">

        <div className="chart-header">

          <div>

            <h2>Recent Activities</h2>

            <p>
              Latest updates from your artisan store.
            </p>

          </div>

        </div>

        <div className="activity-list">

          {recentActivities.map(
            (activity, index) => (

              <div
                className="activity-card"
                key={index}
              >

                <div>

                  <h4>
                    {activity.title}
                  </h4>

                  <p>
                    {activity.description}
                  </p>

                </div>

                <span>
                  {activity.time}
                </span>

              </div>

            )
          )}

        </div>

      </section>

    </div>
  );
}

export default AnalyticsDemo;