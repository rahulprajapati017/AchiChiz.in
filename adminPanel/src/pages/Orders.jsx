
import React, { useState } from "react";
import { Download, FileText, Eye, ChevronUp, ChevronDown } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";

const initialOrders = [
  {
    id: "ORD1234",
    customer: "Anjali Mehta",
    date: "2025-07-01",
    amount: "₹1299",
    status: "Delivered",
    items: ["Handcrafted Vase", "Silk Scarf"],
  },
  {
    id: "ORD1235",
    customer: "Ravi Kumar",
    date: "2025-07-02",
    amount: "₹2450",
    status: "Pending",
    items: ["Bamboo Basket", "Jute Mat"],
  },
  {
    id: "ORD1236",
    customer: "Pooja Singh",
    date: "2025-07-02",
    amount: "₹890",
    status: "Shipped",
    items: ["Terracotta Idol"],
  },
  {
    id: "ORD1237",
    customer: "Rahul Yadav",
    date: "2025-07-03",
    amount: "₹3120",
    status: "Cancelled",
    items: ["Wooden Frame", "Clay Pot"],
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const itemsPerPage = 5;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortOrders = (orders) => {
    if (!sortField) return orders;
    return [...orders].sort((a, b) => {
      let aVal = sortField === "amount" ? parseInt(a[sortField].replace(/₹|,/g, "")) : a[sortField];
      let bVal = sortField === "amount" ? parseInt(b[sortField].replace(/₹|,/g, "")) : b[sortField];
      return sortAsc ? aVal > bVal ? 1 : -1 : aVal < bVal ? 1 : -1;
    });
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    setOrders(updated);
  };

  const filtered = sortOrders(
    orders.filter((o) => {
      const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || o.status === statusFilter;
      const matchDate = (!dateFrom || o.date >= dateFrom) && (!dateTo || o.date <= dateTo);
      return matchSearch && matchStatus && matchDate;
    })
  );

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const exportPDF = () => {
    const input = document.getElementById("orders-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.text("AchiChiz Orders Report", 10, 10);
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, 16);
      pdf.addImage(imgData, "PNG", 10, 25, pdfWidth - 20, imgHeight * 0.75);
      pdf.save("orders-report.pdf");
    });
  };

  const exportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">📦 Recent Orders</h2>
        <div className="flex gap-3">
          <button onClick={exportPDF} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            <FileText size={16} /> Export PDF
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <input type="text" placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="border px-3 py-2 rounded w-60" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-2 py-2 rounded">
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="flex gap-2">
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border px-2 py-2 rounded" />
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border px-2 py-2 rounded" />
        </div>
      </div>

      <div className="overflow-x-auto" id="orders-table">
        <table className="min-w-full text-left text-sm border rounded">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-600">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("date")}>Date {sortField === "date" && (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("amount")}>Amount {sortField === "amount" && (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">₹{parseInt(order.amount.replace(/₹|,/g, "")).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} className="px-2 py-1 rounded border">
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => setSelectedOrder(order)} className="text-blue-600 hover:underline flex items-center gap-1">
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button key={num} className={`px-3 py-1 rounded ${num === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setCurrentPage(num)}>
            {num}
          </button>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Amount:</strong> ₹{parseInt(selectedOrder.amount.replace(/₹|,/g, "")).toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Items:</strong> {selectedOrder.items.join(", ")}</p>
            <div className="flex justify-end">
              <button onClick={() => setSelectedOrder(null)} className="mt-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;