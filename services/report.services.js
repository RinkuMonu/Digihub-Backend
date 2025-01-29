const db = require("../db/db");
const dbPayment = db.Payment;
const SalesReport = require("../models/report.model"); // Import the SalesReport model

async function getSalesReport(req, res) {
    // Aggregating total sales and total orders from completed payments
    const totalSalesData = await dbPayment.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, totalAmount: { $sum: "$amount" }, totalOrders: { $sum: 1 } } }
    ]);

    // Extract total sales and total orders from the aggregation result
    const totalSales = totalSalesData[0] ? totalSalesData[0].totalAmount : 0;
    const totalOrders = totalSalesData[0] ? totalSalesData[0].totalOrders : 0;

   

    // Create and save the report to the database
    const report = new SalesReport({
        dateRange: 'Last 30 days', 
        totalSales,
        totalOrders
    });

    // Save the report in the database
    await report.save();

    // Return the sales data along with the saved report info
    return { responseCode: 1, result: { totalSales, totalOrders } };
}

module.exports = { getSalesReport };
