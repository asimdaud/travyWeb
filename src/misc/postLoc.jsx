import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col, Modal } from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

import { isUserSignedIn } from "../../services/authServices";
import * as firebase from "firebase";
import Post from "../../components/post";
import { Redirect, Link } from "react-router-dom";

import UserNavbar from "components/Navbars/UserNavbar";
class postLoc extends React.Component {
  

  constructor(props) {
    super(props);

    this.state = {
      user3: JSON.parse(localStorage.getItem("uid")),
      uid: "uid",
      profilePic:
        "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
      username: "Username",
      defaultModal: false,
      modalItem:      this.props.location.state.id
    };
  }

  state = {};
  
 
  componentWillMount = async () => {
      }
      
      componentDidMount() {
  }


  render() {
    
return (
      <>
        <UserNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                
              <Post item={this.state.modalItem} />
              

              </Card>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default postLoc;
