import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../cssf/Basic.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios"
import { registrationUser } from "../services/RegistrationService";


function Registration() {
  const [regData, setData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Password: "",
    ConfirmPassword: "",
    Age: "",
  });

  // Common input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...regData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   // console.log("Final Data:", regData);

    const payload = {
      FirstName : regData.FirstName,
      LastName : regData.LastName,
      Age :  Number( regData.Age),
      Phone :regData.Phone,
      Password : regData.Password,
      ConfirmPassword : regData.ConfirmPassword,
      Email : regData.Email,
    }

    try{
      const regResponse =  registrationUser(payload);
      console(regResponse)
      alert("Registration successful")
    }
    catch(error)
    {
      alert("Sorry try again please!")
    }
  };

  return (
    <>
      <div className="bgui">
        <form onSubmit={handleSubmit}>
          <div style={{ paddingTop: 50 }}></div>
          <div className="my-row">
            <div className="my-col">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  value={regData.FirstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your first name"
                  className="form-control"
                />
              </div>
            </div>

            <div className="my-col">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  value={regData.LastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="my-row">
            <div className="my-col">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="Email"
                  value={regData.Email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="form-control"
                />
              </div>
            </div>

            <div className="my-col">
              <div className="form-group">
              <label >Phone</label>

              <PhoneInput
                country={"bd"}
                enableSearch={true}
                countryCodeEditable={false}
                value={regData.Phone}
                onChange={(value) =>
                  setData({ ...regData, Phone: value })
                }
              inputStyle={
                {
                  width : 200,
                }
              }
              />
              </div>
            </div>
          </div>

          <div className="my-row">
            <div className="my-col">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="Password"
                  value={regData.Password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="form-control"
                />
              </div>
            </div>

            <div className="my-col">
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  value={regData.ConfirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          {/* Age */}
          <div className="my-row">
            <div className="my-col">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="Age"
                  value={regData.Age}
                  onChange={handleChange}
                  required
                  placeholder="How old are you?"
                  className="form-control"
                />
              </div>
                 <Button
            type="submit"
            variant="success"
          >
            Submit
          </Button>
            </div>
          </div>

       
        </form>
      </div>
    </>
  );
}

export default Registration;