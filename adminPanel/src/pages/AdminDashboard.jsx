import React, { useEffect, useState } from "react";
import {
  IndianRupee,
  ShoppingBag,
  Users,
  UserCheck,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line,
  PieChart, Pie, Cell,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";

const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b"];

const stats = [
  {
    title: "Total Sales",
    value: "₹1,24,000",
    icon: <IndianRupee size={28} className="text-green-500" />,
    bg: "bg-gradient-to-r from-green-100 to-white/10",
  },
  {
    title: "Total Orders",
    value: "320",
    icon: <ShoppingBag size={28} className="text-blue-500" />,
    bg: "bg-gradient-to-r from-blue-100 to-white/10",
  },
  {
    title: "Active Customers",
    value: "154",
    icon: <Users size={28} className="text-purple-500" />,
    bg: "bg-gradient-to-r from-purple-100 to-white/10",
  },
  {
    title: "Pending Vendors",
    value: "6",
    icon: <UserCheck size={28} className="text-orange-500" />,
    bg: "bg-gradient-to-r from-orange-100 to-white/10",
  },
];

const timeOptions = ["Today", "This Week", "This Month"];

const generateSalesData = (time) => {
  const base = {
    "Today": [
      { time: "9 AM", sales: 1200 },
      { time: "12 PM", sales: 2100 },
      { time: "3 PM", sales: 1600 },
      { time: "6 PM", sales: 2800 },
    ],
    "This Week": [
      { time: "Mon", sales: 12000 },
      { time: "Tue", sales: 18000 },
      { time: "Wed", sales: 9000 },
      { time: "Thu", sales: 15000 },
      { time: "Fri", sales: 17000 },
      { time: "Sat", sales: 22000 },
      { time: "Sun", sales: 19000 },
    ],
    "This Month": [
      { time: "Week 1", sales: 45000 },
      { time: "Week 2", sales: 56000 },
      { time: "Week 3", sales: 47000 },
      { time: "Week 4", sales: 62000 },
    ],
  };
  return base[time];
};

const pieData = [
  { name: "Handmade", value: 400 },
  { name: "Jewelry", value: 300 },
  { name: "Decor", value: 300 },
  { name: "Textile", value: 200 },
];

const AdminDashboard = () => {
  const [timeFrame, setTimeFrame] = useState("This Week");
  const [salesData, setSalesData] = useState(generateSalesData("This Week"));

  // Simulate real-time updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData(generateSalesData(timeFrame).map(item => ({
        ...item,
        sales: item.sales + Math.floor(Math.random() * 1000),
      })));
    }, 10000);
    return () => clearInterval(interval);
  }, [timeFrame]);

  // Export as PDF with heading & timestamp
  const exportPDF = () => {
    const input = document.getElementById("dashboard-capture");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const heading = "AchiChiz Admin Dashboard Report";
      const date = new Date().toLocaleString();

      pdf.setFontSize(16);
      pdf.setTextColor(40);
      pdf.text(heading, 10, 15);

      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(`Generated on: ${date}`, 10, 22);

      pdf.addImage(imgData, "PNG", 10, 30, pdfWidth - 20, imgHeight * 0.75);
      pdf.save("admin-dashboard-report.pdf");
    });
  };

  // Export as CSV
  const exportCSV = () => {
    const csv = Papa.unparse(salesData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "sales-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 drop-shadow-md">
          Welcome Back, Admin 👋
        </h1>
        <div className="flex gap-3">
          <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Export PDF
          </button>
          <button onClick={exportCSV} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Export CSV
          </button>
        </div>
      </div>

      <div id="dashboard-capture">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div key={index}
              className={`rounded-2xl shadow-lg p-5 ${item.bg} backdrop-blur-md border border-white/20 transition-transform hover:scale-[1.02]`}>
              <div className="flex items-center justify-between">
                <div className="text-gray-700 dark:text-white">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-3xl font-bold mt-2">{item.value}</p>
                </div>
                <div className="bg-white/30 p-2 rounded-xl shadow-inner">{item.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Time Filter Tabs */}
        <div className="flex gap-3 mt-10 mb-4">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => {
                setTimeFrame(time);
                setSalesData(generateSalesData(time));
              }}
              className={`px-4 py-2 rounded-full font-medium text-sm border transition ${
                timeFrame === time
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white/20 backdrop-blur-md text-gray-800 hover:bg-indigo-100"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="mt-4 bg-white/40 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sales Chart ({timeFrame})</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="time" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line + Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Orders Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <XAxis dataKey="time" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Category Share</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
