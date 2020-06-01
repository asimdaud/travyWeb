import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  // Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  // Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  // TabContent,
  // TabPane,
  // UncontrolledTooltip,
  // Card,
  // CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup, 
  Label
} from "reactstrap";


class UserNavbar extends React.Component {
//   state = {
//     searchWord: "", 
//     searchResults: [],
//     // profilePic: Images.ProfilePicture,  for error
//     foundUser: "",
//     found: false
//   };


  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/timeline" tag={Link}>
                <img alt="..." src={require("assets/img/brand/logo.png")} />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar_global">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/logo.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>


                <Nav
                  className="navbar-nav-hover align-items-lg-center ml-lg-auto"
                  navbar
                >
                  <NavItem className="nav-link-icon">
                    <NavLink to="/register" tag={Link}>
                      <i className="ni ni-world" />
                      <span className="nav-link-inner--text">Register</span>
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-link-icon">
                    <NavLink to="/login" tag={Link}>
                      <i className="ni ni-circle-08" />
                      <span className="nav-link-inner--text">Login</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default UserNavbar;
