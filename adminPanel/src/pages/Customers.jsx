
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { Pencil, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const initialCustomers = [
  {
    id: 1,
    name: "Anjali Mehta",
    email: "anjali@example.com",
    orders: 12,
    totalSpent: "₹15000",
    status: "VIP",
    image: "https://i.pravatar.cc/100?u=anjali",
    orderHistory: [
      { id: 1, item: "Wooden Lamp", date: "2024-02-03", price: "₹1200" },
      { id: 2, item: "Bamboo Basket", date: "2024-04-10", price: "₹700" },
    ],
  },
  {
    id: 2,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    orders: 7,
    totalSpent: "₹8450",
    status: "Regular",
    image: "https://i.pravatar.cc/100?u=ravi",
    orderHistory: [
      { id: 1, item: "Wool Scarf", date: "2024-01-15", price: "₹1150" },
    ],
  },
  {
    id: 3,
    name: "Pooja Singh",
    email: "pooja@example.com",
    orders: 18,
    totalSpent: "₹20120",
    status: "VIP",
    image: "https://i.pravatar.cc/100?u=pooja",
    orderHistory: [
      { id: 1, item: "Ceramic Bowl", date: "2024-03-22", price: "₹1700" },
      { id: 2, item: "Brass Idol", date: "2024-05-01", price: "₹2400" },
    ],
  },
];

const parseAmount = (amount) => parseInt(amount.replace(/[^0-9]/g, ""));
const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editCustomer, setEditCustomer] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCustomers(initialCustomers);
      setLoading(false);
    }, 500);
  }, []);

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const deleteCustomer = (id) => {
    if (window.confirm("Are you sure to delete this customer?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    setCustomers((prev) =>
      prev.map((cust) => (cust.id === editCustomer.id ? editCustomer : cust))
    );
    setEditCustomer(null);
  };

  const topSpenders = customers.map((c) => ({
    name: c.name,
    value: parseAmount(c.totalSpent),
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Customers" value={customers.length} color="text-blue-700" />
        <StatCard title="VIP Customers" value={customers.filter(c => c.status === 'VIP').length} color="text-purple-700" />
        <StatCard title="Total Orders" value={customers.reduce((a, c) => a + c.orders, 0)} color="text-green-700" />
        <StatCard title="Total Revenue" value={`₹${customers.reduce((a, c) => a + parseAmount(c.totalSpent), 0)}`} color="text-emerald-700" />
      </div>

    
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-2 text-gray-700">Top Spenders</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={topSpenders} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
              {topSpenders.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

     
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name/email"
          className="px-4 py-2 border rounded-lg shadow"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg shadow"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Regular</option>
          <option>VIP</option>
        </select>
      </div>

     
      <div className="overflow-x-auto rounded-xl bg-white/30 shadow backdrop-blur-md">
        <table className="min-w-full text-sm">
          <thead className="bg-white/40">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Spent</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="p-6 text-center">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6" className="p-6 text-center">No customers found</td></tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50 transition">
                  <td className="p-3 flex items-center gap-2">
                    <img src={c.image} alt={c.name} className="w-10 h-10 rounded-full" />
                    {c.name}
                  </td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.orders}</td>
                  <td className="p-3">{c.totalSpent}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      c.status === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>{c.status}</span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => setEditCustomer(c)}>
                      <Pencil size={16} className="text-blue-600" />
                    </button>
                    <button onClick={() => deleteCustomer(c.id)}>
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
      <Transition appear show={!!editCustomer} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setEditCustomer(null)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-bold mb-4">Edit Customer</Dialog.Title>
                <div className="space-y-3">
                  <input name="name" value={editCustomer?.name || ""} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                  <input name="email" value={editCustomer?.email || ""} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                  <select name="status" value={editCustomer?.status || "Regular"} onChange={handleEditChange} className="w-full border rounded px-3 py-2">
                    <option>Regular</option>
                    <option>VIP</option>
                  </select>
                </div>
                <div className="mt-4 text-right space-x-2">
                  <button onClick={() => setEditCustomer(null)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                  <button onClick={saveEdit} className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="p-4 rounded-2xl bg-white/30 backdrop-blur-md shadow-neumorphism text-center">
    <p className="text-xs text-gray-500">{title}</p>
    <h2 className={`text-xl font-bold ${color}`}>{value}</h2>
  </div>
);

export default Customers;