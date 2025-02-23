import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { submitExitInterview } from "../api/apiService";

const ExitQuestionnaire = () => {
  const { logout } = useContext(AuthContext);
  const [responses, setResponses] = useState([
    { questionText: "Why are you leaving?", response: "" },
    { questionText: "What did you like most about your job?", response: "" },
    { questionText: "Any suggestions for improvement?", response: "" },
  ]);

  const handleSubmit = async () => {
    try {
      await submitExitInterview({ responses }, localStorage.getItem("token"));
      alert("Exit interview submitted successfully!");
    } catch (error) {
      console.error("Error submitting exit interview", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold">Exit Questionnaire</h1>
      {responses.map((q, index) => (
        <div key={index} className="mt-4">
          <p className="font-semibold">{q.questionText}</p>
          <textarea
            className="border p-2 w-80"
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[index].response = e.target.value;
              setResponses(newResponses);
            }}
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white p-2 rounded"
      >
        Submit
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

export default ExitQuestionnaire;
