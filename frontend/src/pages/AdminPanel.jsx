import { useEffect, useState, useContext } from "react";
import {
  fetchResignations,
  updateResignationStatus,
  fetchExitResponses,
} from "../api/apiService";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { logout } = useContext(AuthContext);
  const [resignations, setResignations] = useState([]);
  const [exitResponses, setExitResponses] = useState([]);
  const [exitDate, setExitDate] = useState({});

  const token = localStorage.getItem("token");
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchResignations(token);
      console.log(res.data.data);

      setResignations(res.data.data);
      const responses = await fetchExitResponses(token);
      setExitResponses(responses.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleDecision = async (resignationId, approved) => {
    if (approved && !exitDate[resignationId]) {
      alert("Please select an exit date.");
      return;
    }

    try {
      await updateResignationStatus(resignationId, approved, exitDate[resignationId], token);
      alert(`Resignation ${approved ? "approved" : "rejected"} successfully.`);
      setResignations(resignations.filter((res) => res._id !== resignationId));
    } catch (error) {
      console.error("Error processing resignation:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
      <h2 className="text-xl font-semibold mb-4">HR Panel - Manage Resignations</h2>
      {resignations.length === 0 ? (
        <p>No pending resignations.</p>
      ) : (
        resignations.map((res) => (
          <div key={res._id} className="border p-4 mb-4">
            <p><strong>Employee ID:</strong> {res.employeeId.username}</p>
            <p><strong>Last Working Day:</strong> {res.lwd}</p>
            <p><strong>Reason:</strong> {res.reason}</p>
            <label className="block mt-2">Set Exit Date:</label>
            <input
              type="date"
              value={exitDate[res._id] || ""}
              onChange={(e) => setExitDate({ ...exitDate, [res._id]: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={() => handleDecision(res._id, true)}
              className="bg-green-600 text-white p-2 rounded mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleDecision(res._id, false)}
              className="bg-red-600 text-white p-2 rounded"
            >
              Reject
            </button>
          </div>
        ))
      )}

      <h2 className="text-lg font-semibold mt-6">Exit Interviews</h2>
      {exitResponses.length === 0 && <p>No exit interviews submitted yet.</p>}
      {exitResponses.map((response, index) => (
        <div key={index} className="p-4 bg-white shadow-md rounded mt-2">
          <p>
            <strong>Employee ID:</strong> {response.employeeId}
          </p>
          {response.responses.map((q, i) => (
            <p key={i}>
              <strong>{q.questionText}:</strong> {q.response}
            </p>
          ))}
        </div>
      ))}

      <button
        onClick={logout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
