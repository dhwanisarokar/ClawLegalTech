import axios from "axios";

const API_URL = "https://clawlegaltech-7o8x.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const submitResignation = (data, token) =>
  api.post("/user/resign", data, { headers: { Authorization: `Bearer ${token}` } });
export const fetchResignations = (token) =>
  api.get("/admin/resignations", { headers: { Authorization: `Bearer ${token}` } });
export const updateResignationStatus = (data, token) =>
  api.put("/admin/conclude_resignation", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const submitExitInterview = (data, token) =>
  api.post("/user/responses", data, { headers: { Authorization: `Bearer ${token}` } });
export const fetchExitResponses = (token) =>
  api.get("/admin/exit_responses", { headers: { Authorization: `Bearer ${token}` } });
