import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Django backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Define a function that you call on form submit
export const registrationUser = async (payload) => {
  try {
    const response = await api.post("/aiwgs/profile/CreateUser/", payload); // note the trailing slash
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Registration error:", err);
    throw err; // rethrow if you want to handle it in the component
  }
};