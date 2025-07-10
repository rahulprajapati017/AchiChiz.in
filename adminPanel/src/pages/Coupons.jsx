import { useState } from "react";
import Layout from "../components/Layout";

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    { id: "C1", code: "NEWUSER10", discount: 10, expiry: "2025-12-31" },
    { id: "C2", code: "FESTIVE20", discount: 20, expiry: "2025-11-15" },
  ]);

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    expiry: "",
  });

  const handleAddCoupon = (e) => {
    e.preventDefault();

    const discountNum = Number(newCoupon.discount);
    if (discountNum <= 0 || discountNum > 100) {
      alert("Discount must be between 1% and 100%");
      return;
    }

    const newOne = {
      id: Date.now().toString(),
      ...newCoupon,
      discount: discountNum,
    };

    setCoupons([...coupons, newOne]);
    setNewCoupon({ code: "", discount: "", expiry: "" });
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const sortedCoupons = [...coupons].sort(
    (a, b) => new Date(a.expiry) - new Date(b.expiry)
  );

  return (
    <Layout>
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#0f2c5c]">🎁 Manage Coupons</h2>

        {/* Coupon Form */}
        <form
          onSubmit={handleAddCoupon}
          className="grid md:grid-cols-4 gap-4 bg-white p-6 rounded-md shadow max-w-5xl"
        >
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })
            }
            required
            className="border rounded px-4 py-2"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            value={newCoupon.discount}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, discount: e.target.value })
            }
            required
            min={1}
            max={100}
            className="border rounded px-4 py-2"
          />
          <input
            type="date"
            name="expiry"
            value={newCoupon.expiry}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, expiry: e.target.value })
            }
            required
            className="border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Coupon
          </button>
        </form>

        {/* Coupon Table */}
        <div className="overflow-x-auto bg-white shadow rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Expiry</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCoupons.length > 0 ? (
                sortedCoupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className="border-t hover:bg-gray-50 text-center"
                  >
                    <td className="p-4 font-semibold text-left text-blue-700 uppercase">
                      {coupon.code}
                    </td>
                    <td className="p-4">{coupon.discount}%</td>
                    <td className="p-4">{formatDate(coupon.expiry)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500 italic"
                  >
                    No coupons available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Coupons;
