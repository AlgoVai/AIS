import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Registration from './jsxf/Registration';
import './App.css';
import Button from 'react-bootstrap/Button';
import Home from './jsxf/home';
import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { logInUser } from './services/RegistrationService';
function Login() {

  const [logData,setData] = useState({
    Email : " ",
    Password : " "
  });
 const navigate = useNavigate();

const handleChange = (e) =>{
  const {name,value} = e.target;
  setData({...logData,[name]:value})
}

const handleSubmit =  (e) =>{
  e.preventDefault();
  const logPayload = {
    Email : logData.Email,
    Password : logData.Password
  };

  try{
const logResponse =  logInUser(logPayload);

if(logResponse){
  toast.success("LogIn Successfull !")
  navigate("/Home")
}
else{
  toast.error("Please check your email or password !")
}

  }
  catch(error){
    throw error;
  }
}
  
  return (
    <>
           <Toaster
        position="top-right"
        reverseOrder={false}
      />
     <div className='lgb'>
      <div className='lg'>
      
        <form onSubmit={handleSubmit}>
          <div className='col-sm-4'>
            <label>Email :
            <input type='text' name="Email" onChange={handleChange} value={logData.Email} required placeholder='Enter your email Address' />
          </label>
          </div>
         <div className='col-sm-4'>
   <label>Password :
            <input type='password' name="Password" onChange={handleChange} value={logData.Password} required placeholder='Enter your password' />
          </label>
         </div>

       <div className='col-sm-4'>
  <Button type="submit" style={{ margin: 10 }} variant="success">
            LogIn
          </Button>
       </div>
        <div className='col-sm-3'>
  <Link style={{color:'red'}} to="/registration">Registration</Link>
        </div>
        
        </form>

         
      </div>

   
    </div>
    </>
   
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
           <Route path="/Home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;