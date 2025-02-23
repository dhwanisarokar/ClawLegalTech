import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { submitResignation } from "../api/apiService";

const EmployeeDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [lwd, setLwd] = useState("");

  const handleResignation = async () => {
    try {
      await submitResignation({ lwd }, localStorage.getItem("token"));
      alert("Resignation submitted successfully!");
    } catch (error) {
      console.error("Error submitting resignation", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold">Welcome, {user?.username}</h1>
      <input
        type="date"
        className="p-2 border rounded mt-4"
        onChange={(e) => setLwd(e.target.value)}
      />
      <button
        onClick={handleResignation}
        className="mt-4 bg-blue-600 text-white p-2 rounded"
      >
        Submit Resignation
      </button>
      <button
        onClick={logout}
        className="mt-4 bg-red-600 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default EmployeeDashboard;
