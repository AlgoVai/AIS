import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { Navigate } from "react-router-dom";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Django backend
  headers: {
    "Content-Type": "application/json",
  },
});


export const registrationUser = async (payload) => {
  try {
    const response = await api.post("/aiwgs/profile/CreateUser/", payload); 
    console.log(response.data);
    return response.data;
  } catch (err) {
  console.error("FULL ERROR:", err);
  console.error("BACKEND ERROR:", err.response?.data); 
    throw err; 
  }
};

export const logInUser = async(payload)=>{
  try{
    const response = await api.post("/aiwgs/Profile/LoginUser/",payload);
     
    localStorage.setItem("userInfo",response.data);
    return true;
    
   
    return response.data;
    //console.log("login_data",response.data);
  }
  catch(err){
    toast.error("Please check your username or password")
    throw err;
  }
}