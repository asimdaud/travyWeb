import React from "react";
import moment from "moment";
import { Button, Card, Container, Row, Col, Modal } from "reactstrap";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

import { isUserSignedIn } from "../../services/authServices";
import * as firebase from "firebase";
import Post from "../../components/post";
import { Redirect, Link } from "react-router-dom";
import UserNavbar from "components/Navbars/UserNavbar";

class Interests extends React.Component {
  // componentDidMount() {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.main.scrollTop = 0;
  // }'

  constructor(props) {
    super(props);

    this.state = {
      user3: JSON.parse(localStorage.getItem("uid")),
      //   uid: "uid",
      //   profilePic:
      //     "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
      //   username: "Username",
      //   bio: "This is my bio",
      //   name: "Name",
      //   email: "email@default.com",
      loading: true,
      defaultModal: false,
      modalItem: "",
      interested: false
    };
  }

  state = {};
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  componentWillMount = async () => {
    // if (isUserSignedIn) {
    //   console.log(this.state.user3);
    // }
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(this.state.user3)
    //   .onSnapshot(doc => {
    //     const res = doc.data();
    //     if (res != null) {
    //       this.setState({
    //         username: res.username,
    //         bio: res.bio,
    //         name: res.name,
    //         email: res.email
    //       });
    //     }
    //     console.log(res);
    //     });
    // // profile pic
    // const firebaseProfilePic = await firebase
    //   .storage()
    //   .ref()
    //   .child("profilePics/(" + this.state.user3 + ")ProfilePic");
    // firebaseProfilePic
    //   .getDownloadURL()
    //   .then(url => {
    //     // Inserting into an State and local storage incase new device:
    //     this.setState({ profilePic: url });
    //   })
    //   .catch(error => {
    //     // Handle any errors
    //     switch (error.code) {
    //       case "storage/object-not-found":
    //         // File doesn't exist
    //         this.setState({
    //           profilePic:
    //             "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
    //         });
    //         break;
    //       default:
    //     }
    //     console.log(error);
    //   });
  };

  componentDidMount() {}

  editprofile() {
    return <Redirect to="/edit-profile" tag={Link} />;
  }
  render() {
    // if (this.state.loading){
    //   return <div>My sweet spinner</div>;
    // }
    return (
      <>
        <Container>
          <Card className="card-profile shadow mt--300">
            <div className="px-4">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        // height="50"
                        // width="50"
                        className="rounded-circle"
                        src={require("../../assets/img/brand/asim.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Container>
      </>
    );
  }
}

export default Interests;
