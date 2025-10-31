import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify"; // ✅ import toast container
import "react-toastify/dist/ReactToastify.css";  // ✅ import toast styles

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && <div className="container mx-auto pt-4 pb-4">{children}</div>}

      {/* ✅ Add ToastContainer at the bottom of the layout */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        closeOnClick
        draggable
      />
    </div>
  );
};

export default DashboardLayout;
