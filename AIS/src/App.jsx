import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Registration from './jsxf/Registration';
import './App.css';
import Button from 'react-bootstrap/Button';

function Login() {
  return (
    <div className='lgb'>
      <div className='lg'>
        <form>
          <div className='col-sm-4'>
            <label>Email :
            <input type='text' required placeholder='Enter your email Address' />
          </label>
          </div>
         <div className='col-sm-4'>
   <label>Password :
            <input type='password' required placeholder='Enter your password' />
          </label>
         </div>

       <div className='col-sm-4'>
  <Button style={{ margin: 10 }} variant="success">
            LogIn
          </Button>
       </div>
        <div className='col-sm-3'>
  <Link style={{color:'red'}} to="/registration">Registration</Link>
        </div>
        
        </form>

         
      </div>

   
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;