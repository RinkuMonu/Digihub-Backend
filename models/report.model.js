const mongoose = require('mongoose');

// Define the schema for the sales report
const salesReportSchema = new mongoose.Schema({
    reportId: {
        type: String,
        required: true,
        unique: true
    },
    dateRange: {
        type: String,
        required: true
    },
    totalSales: {
        type: Number,
        required: true
    },
    totalOrders: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the SalesReport model
const SalesReport = mongoose.model('SalesReport', salesReportSchema);

module.exports = SalesReport;
