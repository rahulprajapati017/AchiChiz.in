import { useState } from "react";
import { demoUsers } from "../data/demo";
import Layout from "../components/Layout";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";

const Users = () => {
  const [users, setUsers] = useState(demoUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);

  const toggleBlock = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, blocked: !user.blocked } : user
    );
    setUsers(updatedUsers);
  };

  const handleCheckbox = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const exportToPDF = () => {
    const input = document.getElementById("user-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("users.pdf");
    });
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(users);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter ? (statusFilter === "Blocked" ? user.blocked : !user.blocked) : true)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#0f2c5c]">👥 Registered Users</h2>
          <div className="flex gap-2">
            <button onClick={exportToPDF} className="bg-red-600 text-white px-3 py-1 rounded">Export PDF</button>
            <button onClick={exportToCSV} className="bg-green-600 text-white px-3 py-1 rounded">Export CSV</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by name, email or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/4"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg" id="user-table">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">User ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Verified</th>
                <th className="p-4 text-left">Last Login</th>
                <th className="p-4 text-left">IP Address</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-t ${user.blocked ? "bg-red-50" : "hover:bg-gray-50"}`}
                  >
                    <td className="p-4">{user.id}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      {user.blocked ? (
                        <span className="text-red-600 font-medium">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-medium">Active</span>
                      )}
                    </td>
                    <td className="p-4">
                      {user.verified ? (
                        <span className="text-blue-600">✅</span>
                      ) : (
                        <span className="text-gray-400">❌</span>
                      )}
                    </td>
                    <td className="p-4">{user.lastLogin}</td>
                    <td className="p-4">{user.ip}</td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => toggleBlock(user.id)}
                        className={`px-4 py-1 rounded font-medium transition ${
                          user.blocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                        } text-white`}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => setViewUser(user)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-6 text-center text-gray-500 italic">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {viewUser && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                onClick={() => setViewUser(null)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">User Details</h2>
              <p><strong>User ID:</strong> {viewUser.id}</p>
              <p><strong>Name:</strong> {viewUser.name}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Status:</strong> {viewUser.blocked ? "Blocked" : "Active"}</p>
              <p><strong>Verified:</strong> {viewUser.verified ? "Yes" : "No"}</p>
              <p><strong>Last Login:</strong> {viewUser.lastLogin}</p>
              <p><strong>IP Address:</strong> {viewUser.ip}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Users;
