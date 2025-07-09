import React, { useEffect, useState } from "react";
import { TrendingUp, UserCheck, PackageCheck, RefreshCcw } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";

const allRevenueData = [
  { date: "2024-07-01", revenue: 12000 },
  { date: "2024-07-02", revenue: 10500 },
  { date: "2024-07-03", revenue: 14300 },
  { date: "2024-07-04", revenue: 9100 },
  { date: "2024-07-05", revenue: 12500 },
  { date: "2024-07-06", revenue: 11000 },
  { date: "2024-07-07", revenue: 15200 },
];

const pieData = [
  { name: "Direct", value: 45 },
  { name: "Social", value: 25 },
  { name: "Referral", value: 15 },
  { name: "Organic", value: 15 },
];
const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];

const mockOverview = [
  { id: 1, metric: "Total Sales", value: "₹2,50,000", description: "Total sales revenue this year" },
  { id: 2, metric: "Total Orders", value: 320, description: "Number of orders placed" },
  { id: 3, metric: "Total Customers", value: 150, description: "Registered customers" },
  { id: 4, metric: "Active Vendors", value: 12, description: "Vendors with active listings" },
];

const Overview = () => {
  const [counts, setCounts] = useState({ revenue: 0, orders: 0, returning: 0, refunds: 0 });
  const [startDate, setStartDate] = useState("2024-07-01");
  const [endDate, setEndDate] = useState("2024-07-07");
  const [filteredRevenue, setFilteredRevenue] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCounts({
        revenue: Math.min(i * 1650, 82500),
        orders: Math.min(i * 5, 128),
        returning: Math.min(i * 2, 45),
        refunds: Math.min(i * 0.2, 3),
      });
      if (i >= 50) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = allRevenueData.filter((item) => {
      return item.date >= startDate && item.date <= endDate;
    });
    setFilteredRevenue(filtered);
  }, [startDate, endDate]);

  const exportPDF = () => {
    const input = document.getElementById("overview-capture");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.setFontSize(16);
      pdf.setTextColor(40);
      pdf.text("AchiChiz Overview Report", 10, 15);
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, 22);
      pdf.addImage(imgData, "PNG", 10, 30, pdfWidth - 20, imgHeight * 0.75);
      pdf.save("overview-report.pdf");
    });
  };

  const exportCSV = () => {
    const csv = Papa.unparse([
      { label: "Monthly Revenue", value: counts.revenue },
      { label: "New Orders", value: counts.orders },
      { label: "Returning Customers", value: counts.returning },
      { label: "Refund Requests", value: counts.refunds },
    ]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "overview-stats.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">📋 Overview Dashboard</h1>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium">From:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border px-2 py-1 rounded" />
          <label className="text-sm font-medium">To:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border px-2 py-1 rounded" />
          <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Export PDF</button>
          <button onClick={exportCSV} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Export CSV</button>
        </div>
      </div>

      <div id="overview-capture" className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-5 border">
            <h3 className="text-sm font-medium text-gray-600">Monthly Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">₹{counts.revenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 border">
            <h3 className="text-sm font-medium text-gray-600">New Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{counts.orders}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 border">
            <h3 className="text-sm font-medium text-gray-600">Returning Customers</h3>
            <p className="text-2xl font-bold text-gray-900">{counts.returning}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 border">
            <h3 className="text-sm font-medium text-gray-600">Refund Requests</h3>
            <p className="text-2xl font-bold text-gray-900">{counts.refunds}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📈 Revenue Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={filteredRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Order Sources</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Performance Snapshot</h2>
          <ul className="space-y-4 text-gray-700 text-base">
            <li className="flex items-center gap-2">
              <PackageCheck className="text-green-500" size={20} />
              98% On-time Order Fulfillment
            </li>
            <li className="flex items-center gap-2">
              <UserCheck className="text-yellow-500" size={20} />
              89% Customer Satisfaction Rate
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={20} />
              76% Vendor Engagement This Month
            </li>
            <li className="flex items-center gap-2">
              <RefreshCcw className="text-red-500" size={20} />
              12% Orders with Delays
            </li>
          </ul>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOverview.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.metric}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;