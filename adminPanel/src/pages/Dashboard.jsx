// Updated Admin Dashboard using demo.js data set
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import {
  FaUsers,
  FaDollarSign,
  FaBoxOpen,
  FaShoppingCart,
  FaStarHalfAlt,
  FaThLarge,
  FaRupeeSign,
  FaThList,
  FaChartLine,
  FaChartPie,
  FaChartBar,
  FaDownload,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";
import { useRef, useState } from "react";
import {
  demoProducts,
  demoOrders,
  demoUsers,
  demoRevenueTrend,
  demoTopProducts,
} from "../data/demo";

const Dashboard = () => {
  const { admin } = useAuth();
  const exportRef = useRef();
  const [timeframe, setTimeframe] = useState("Today");

  const filterAnalyticsBy = (time) => {
    setTimeframe(time);
  };

  const exportToPDF = () => {
    const input = exportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("dashboard_report.pdf");
    });
  };

  const exportToCSV = () => {
    const data = demoOrders.map((order) => ({
      id: order.id,
      status: order.status,
      total: order.total,
    }));
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders_report.csv";
    link.click();
  };

  const stats = [
    {
      title: "Total Sales",
      value: `₹${demoOrders.reduce((sum, o) => sum + o.total, 0)}`,
      icon: <FaDollarSign size={28} className="text-green-500" />,
    },
    {
      title: "Total Products",
      value: demoProducts.length,
      icon: <FaBoxOpen className="text-blue-600" size={28} />,
    },
    {
      title: "Total Orders",
      value: demoOrders.length,
      icon: <FaShoppingCart className="text-green-600" size={28} />,
    },
    {
      title: "Pending Reviews",
      value: 32,
      icon: <FaStarHalfAlt className="text-yellow-500" size={28} />,
    },
    {
      title: "Active Customers",
      value: demoUsers.length,
      icon: <FaUsers size={28} className="text-purple-500" />,
    },
    {
      title: "Revenue",
      value: `₹${demoOrders.reduce((sum, o) => sum + o.total, 0)}`,
      icon: <FaRupeeSign className="text-purple-600" size={28} />,
    },
    {
      title: "Total Category",
      value: new Set(demoProducts.map((p) => p.category)).size,
      icon: <FaThLarge className="text-purple-600" size={28} />,
    },
    {
      title: "Total Sub-Category",
      value: new Set(demoProducts.map((p) => p.subcategory)).size,
      icon: <FaThList className="text-purple-600" size={28} />,
    },
  ];

  const orderStatusData = [
    { name: "Pending", value: demoOrders.filter((o) => o.status === "Pending").length },
    { name: "Processing", value: demoOrders.filter((o) => o.status === "Processing").length },
    { name: "Shipped", value: demoOrders.filter((o) => o.status === "Shipped").length },
    { name: "Delivered", value: demoOrders.filter((o) => o.status === "Delivered").length },
    { name: "Cancelled", value: demoOrders.filter((o) => o.status === "Cancelled").length },
  ];

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

  return (
    <Layout>
      <div className="px-4 py-6 space-y-10 bg-gray-50 min-h-screen" ref={exportRef}>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, Admin
            </h1>
            <p className="text-gray-500 text-sm">
              Analytics shown: <strong>{timeframe}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            {["Today", "Week", "Month", "Year"].map((label) => (
              <button
                key={label}
                onClick={() => filterAnalyticsBy(label)}
                className={`px-3 py-1 text-sm rounded-full border hover:bg-gray-100 transition ${
                  timeframe === label ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={exportToPDF}
              className="ml-3 bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <FaDownload /> PDF
            </button>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <FaDownload /> CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-md transition-all"
            >
              <div className="mb-3">{stat.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaChartPie className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-700">Order Status Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-green-600" />
              <h2 className="text-lg font-semibold text-gray-700">Revenue Trends</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demoRevenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaChartBar className="text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-700">Top Performing Products</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demoTopProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;