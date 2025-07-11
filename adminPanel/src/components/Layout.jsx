// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="pt-20 p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
