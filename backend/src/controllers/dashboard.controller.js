import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/asyncHandler.js";

const getMonthRange = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return { start, end };
};

const calcGrowth = (current, previous) => {
    if (previous === 0) {
        return current === 0 ? 0 : 100;
    }
    return Math.round(((current - previous) / previous) * 100);
};

/*
----------------------------------------
Get Dashboard Stats
----------------------------------------
*/

export const getDashboardStats = asyncHandler(async (req, res) => {
    const ownerId = req.user._id;
    const now = new Date();

    const { start: thisMonthStart, end: thisMonthEnd } = getMonthRange(now);
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const { start: lastMonthStart, end: lastMonthEnd } = getMonthRange(lastMonthDate);

    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const allOrders = await Order.find({ owner: ownerId, isActive: true }).select(
        "totalAmount orderDate customer.email"
    );

    const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const thisMonthOrders = allOrders.filter(
        (o) => o.orderDate >= thisMonthStart && o.orderDate < thisMonthEnd
    );
    const lastMonthOrders = allOrders.filter(
        (o) => o.orderDate >= lastMonthStart && o.orderDate < lastMonthEnd
    );

    const thisMonthRevenue = thisMonthOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const lastMonthRevenue = lastMonthOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const revenueGrowth = calcGrowth(thisMonthRevenue, lastMonthRevenue);
    const ordersGrowth = calcGrowth(thisMonthOrders.length, lastMonthOrders.length);

    const earliestOrder = await Order.findOne({ owner: ownerId, isActive: true })
        .sort({ orderDate: 1 })
        .select("orderDate");

    const totalProducts = await Product.countDocuments({ owner: ownerId, isActive: true });
    const categories = await Product.distinct("category", { owner: ownerId, isActive: true });

    const productsThisMonth = await Product.countDocuments({
        owner: ownerId,
        isActive: true,
        createdAt: { $gte: thisMonthStart, $lt: thisMonthEnd },
    });
    const productsLastMonth = await Product.countDocuments({
        owner: ownerId,
        isActive: true,
        createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd },
    });
    const productsGrowth = calcGrowth(productsThisMonth, productsLastMonth);

    const customerFirstOrder = {};
    for (const order of allOrders) {
        const email = order.customer?.email;
        if (!email) continue;
        if (!customerFirstOrder[email] || order.orderDate < customerFirstOrder[email]) {
            customerFirstOrder[email] = order.orderDate;
        }
    }

    const totalCustomers = Object.keys(customerFirstOrder).length;

    const newThisWeek = Object.values(customerFirstOrder).filter(
        (date) => date >= oneWeekAgo
    ).length;

    const customersThisMonthSet = new Set();
    const customersLastMonthSet = new Set();
    Object.entries(customerFirstOrder).forEach(([email, date]) => {
        if (date >= thisMonthStart && date < thisMonthEnd) customersThisMonthSet.add(email);
        if (date >= lastMonthStart && date < lastMonthEnd) customersLastMonthSet.add(email);
    });
    const customersGrowth = calcGrowth(customersThisMonthSet.size, customersLastMonthSet.size);

    return res.status(200).json(
        new ApiResponse(200, {
            revenue: {
                total: totalRevenue,
                growth: revenueGrowth,
                sinceDate: earliestOrder?.orderDate || null,
                thisMonth: thisMonthRevenue,
                lastMonth: lastMonthRevenue,
            },
            orders: {
                total: allOrders.length,
                growth: ordersGrowth,
                thisMonth: thisMonthOrders.length,
            },
            products: {
                total: totalProducts,
                categories: categories.length,
                growth: productsGrowth,
            },
            customers: {
                total: totalCustomers,
                growth: customersGrowth,
                newThisWeek,
            },
        }, "Dashboard stats fetched successfully.")
    );
});

/*
----------------------------------------
Get Revenue Chart (last 7 months, rolling)
----------------------------------------
*/

export const getRevenueChart = asyncHandler(async (req, res) => {
    const ownerId = req.user._id;
    const now = new Date();

    const months = [];
    for (let i = 6; i >= 0; i--) {
        months.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
    }

    const rangeStart = months[0];
    const rangeEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const orders = await Order.find({
        owner: ownerId,
        isActive: true,
        orderDate: { $gte: rangeStart, $lt: rangeEnd },
    }).select("totalAmount orderDate");

    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const data = months.map((m) => {
        const monthTotal = orders
            .filter(
                (o) =>
                    o.orderDate.getFullYear() === m.getFullYear() &&
                    o.orderDate.getMonth() === m.getMonth()
            )
            .reduce((sum, o) => sum + o.totalAmount, 0);

        return { month: monthLabels[m.getMonth()], value: monthTotal };
    });

    return res.status(200).json(
        new ApiResponse(200, data, "Revenue chart data fetched successfully.")
    );
});

export const getWeeklyStats = asyncHandler(async (req, res) => {
    const ownerId = req.user._id;
    const now = new Date();
    const startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - 6);

    const orders = await Order.find({
        owner: ownerId,
        isActive: true,
        orderDate: { $gte: startDate, $lte: now },
    }).select("totalAmount orderDate");

    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const ordersByDay = [];
    for (let i = 0; i < 7; i++) {
        const dayStart = new Date(startDate);
        dayStart.setDate(startDate.getDate() + i);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayStart.getDate() + 1);

        ordersByDay.push({
            date: dayStart.toISOString().slice(0, 10),
            count: orders.filter(
                (order) => order.orderDate >= dayStart && order.orderDate < dayEnd
            ).length,
        });
    }

    return res.status(200).json(
        new ApiResponse(200, { revenue, orders: ordersByDay }, "Weekly stats fetched successfully.")
    );
});