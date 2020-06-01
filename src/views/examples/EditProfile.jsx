import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,  
  Col, 
  Modal 
} from "reactstrap";
// import DemoNavbar from "components/Navbars/DemoNavbar";
import UserNavbar from "components/Navbars/UserNavbar";
// import {profilePic} from "../examples/Profile";
import * as firebase from "firebase";
import {  Link } from "react-router-dom";

// const user3 = JSON.parse(localStorage.getItem("uid"));


class EditProfile extends React.Component {
  constructor(props){
    super(props);

  this.state = {
    user3 : JSON.parse(localStorage.getItem("uid")),
    uid: "uid",
    profilePic:
      "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
    username: "Username",
    bio: "This is my bio",
    name: "Name",
    email: "email@default.com",
    // posts: [],
    // loading: true
    // showModal: false,
    // defaultModal: false
    defaultModal: false,
    modalItem:""
  };}

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  componentWillMount = async () => {
    
    firebase
      .firestore()
      .collection("users")
      .doc(this.state.user3)
      .onSnapshot(doc => {
        const res = doc.data();

        this.setState({
          username: res.username,
          bio: res.bio,
          name: res.name,
          email: res.email
        });
        console.log(res);
      });
    // profile pic
    const firebaseProfilePic = await firebase
      .storage()
      .ref()
      .child("profilePics/(" + this.state.user3 + ")ProfilePic");
    firebaseProfilePic
      .getDownloadURL()
      .then(url => {
        // Inserting into an State and local storage incase new device:
        this.setState({ profilePic: url });
      })
      .catch(error => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            this.setState({
              profilePic:
                "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
            });
            break;
            default:
        }
        alert(error);
      });
  };


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
          {/* Page content */}
          <section className="section">
            <Container className="mt--7" fluid>
              <Row className="justify-content-center">
                <Col className="order-xl-1" xl="8">
                  <Card className="card-profile shadow mt--300">
                    <CardHeader className="bg-white border-0">
                      <Row className="align-items-center">
                        <Col xs="8">
                          <h3 className="mb-0">My account</h3>
                        </Col>
                        <Col className="text-right" xs="4">
                          <Button
                            color="info"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            size="sm"
                          >
                            Save
                          </Button>

                          <Button
                            color="default"
                            size="sm"
                            to="/profile" 
                            tag={Link}
                          >
                            Back to profile
                          </Button>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <div className="pl-lg-4">
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Profile Picture 
                                </label>
                                {" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  <img
                                    height="50"
                                    width="50"
                                    alt="..."
                                    src={this.state.profilePic}
                                  />
                                </a>
                                </FormGroup>
                             </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Username
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={this.state.username}
                                  id="input-username"
                                  placeholder="Username"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Name
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue=""
                                  id="input-name"
                                  placeholder="Name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <hr className="my-4" />
                        {/* Description */}
                        <h6 className="heading-small text-muted mb-4">
                          About me
                        </h6>
                        <div className="pl-lg-4">
                          <FormGroup>
                            <label>My Bio</label>
                            <Input
                              className="form-control-alternative"
                              placeholder="A few words about you ..."
                              rows="4"
                              defaultValue={this.state.bio}
                              type="textarea"
                            />
                          </FormGroup>
                        </div>
                        <hr className="my-4" />

                        {/* Address */}
                       
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>



      </>
    );
  }
}

export default EditProfile;
