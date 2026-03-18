import { useState } from "react";
import "../cssf/home.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Home() {

  const [show, setShow] = useState(false);
 const [showp, setShowp] = useState(false);
  return (
    <div className="home">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">AIS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>

              <NavDropdown
                title="Dropdown"
                id="basic-nav-dropdown"
                show={show}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
              >
                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#">Something</NavDropdown.Item>
              </NavDropdown>












            </Nav>
          </Navbar.Collapse>
          <NavDropdown className="{}}"
                title="admin"
                id="basic-nav-dropdown"
                show={showp}
                onMouseEnter={() => setShowp(true)}
                onMouseLeave={() => setShowp(false)}
              >
                <NavDropdown.Item href="#">Help</NavDropdown.Item>
                <NavDropdown.Item href="#">LogOut</NavDropdown.Item>
              
              </NavDropdown>
          <span>Profile</span>

        </Container>
      </Navbar>
      <div className="slideBar">
        <h4>Adminstration</h4>
        <h4>Dashboard</h4>
        <h4>Face Recognition</h4>
        <h4>Sales & Price Prediction</h4>

        <h4>Question And Answer</h4>
        <h4>Chatbot</h4>
        <h5>Segmentation</h5>
        <h6>Time Serise</h6>

      </div>
    </div>
  )
}

export default Home;