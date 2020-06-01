import React from "react";
import moment from "moment";
// reactstrap components
import { Button, Card, Container, Row, Col, Modal } from "reactstrap";
import SmoothImage from "react-smooth-image";
// core components
// import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

// import UserHeader from "components/Headers/UserHeader.jsx";
import { isUserSignedIn } from "../../services/authServices";
import * as firebase from "firebase";
// import PostModal from "components/Modal/postModal";
import Post from "../../components/post";
import { Redirect, Link } from "react-router-dom";


import UserNavbar from "components/Navbars/UserNavbar";
// import defModal from "components/Modal/defModal";
// import postModal from "components/Modal/postModal";
// import Modals from "components/Modal/Modals";

// const user3 = JSON.parse(localStorage.getItem("uid"));

// user3 ? console.log("cSAnt") : console.log("lll");

// const ModalPost = ({showM, handleClose})=> {

//   // const {showM, handleClose} = this.props;

//       // const [modal, setModal] = useState(false);

//       // const toggle = () => setModal(!modal);

//       return (
//       <div>
//         {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
//         <Modal
//         isOpen={showM}
//         >
//           <ModalHeader >Modal title</ModalHeader>
//           <ModalBody>
//   <Post/>
//           </ModalBody>
//           <ModalFooter>
//             {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
//             <Button color="secondary" onClick={handleClose}>Cancel</Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );

//   }

class Profile extends React.Component {
  // componentDidMount() {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.main.scrollTop = 0;
  // }'

  constructor(props) {
    super(props);

    this.state = {
      user3: JSON.parse(localStorage.getItem("uid")),
      uid: "uid",
      profilePic:
        "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
      username: "Username",
      bio: "This is my bio",
      name: "Name",
      email: "email@default.com",
      posts: [],
      loading: true,
      followedUsers: "00",
      // showModal: false,
      defaultModal: false,
      modalItem:""
    };
  }

  state = {};
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };


  
  componentWillMount =   () => {
   
    
    // this.getFollowedUsers();

this.getProfilePic();

      this.getFollowedUsers();
      this.getPosts();
  };
  componentDidMount() {

    // this.getFollowedUsers();
    // this.getPosts();
  }


  getProfilePic = () => {

    if (isUserSignedIn) {
      console.log(this.state.user3);
    }

    firebase
      .firestore()
      .collection("users")
      .doc(this.state.user3)
      .onSnapshot(doc => {
        const res = doc.data();

        if (res != null) {
          this.setState({
            username: res.username,
            bio: res.bio,
            name: res.name,
            email: res.email
          });
        }
        console.log(res);
        });
    // profile pic
    const firebaseProfilePic =   firebase
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
        console.log(error);
      });


  }
  getPosts = () => {
    const cloudImages = [];
    firebase
      .firestore()
      .collection("posts")
      .doc(this.state.user3)
      .collection("userPosts")
      .orderBy("time", "desc")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {    let article = {
          username: this.state.username,
          userId: this.state.user3,
          title: "post",
          avatar: this.state.profilePic,
          image: doc.data().image,
          // cta: "cta",
          caption: doc.data().caption,
          location: doc.data().location.coordinates,
          locName: doc.data().location.locationName,
          postId: doc.data().postId,
          timeStamp: doc.data().time,
          // likes:0,
          locLatLng: "Address"
        };
        cloudImages.push(article);
        });
      });
    this.setState({ posts: cloudImages });
  } 


  editprofile() {
    return <Redirect to="/edit-profile" tag={Link} />;
  }




  logOut() {
    localStorage.clear();
  }

  // Get all the users the current user is following
  getFollowedUsers = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(this.state.user3)
      .collection("userFollowing")
      .onSnapshot(snapshot => {
        let num = snapshot.size;
        console.log(num);
        this.setState({ followedUsers: num });
      });
  };

  render() {
    // if (this.state.loading){
    //   return <div>My sweet spinner</div>;
    // }
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
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={this.state.profilePic}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        {/* <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          Follow
                        </Button> */}
                        <Button
                          className="float-right"
                          color="default"
                          size="sm"
                          to="/edit-profile"
                          tag={Link}
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">
                            {this.state.followedUsers}
                          </span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {this.state.username}{" "}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    {/* <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div> */}
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {this.state.bio}
                    </div>
                    {/* <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="11">
                        <div className="container-fluid bg-3 text-center">
                          <h3>Posts</h3>
                          <div className="row">
                            {this.state.posts.map((post, index) => (
                              <Card
                                className="col-sm-4"
                                style={{ padding: "10px" }}
                                key={index}
                                onClick={() =>{
                                  this.setState({modalItem: post})
                                  this.setState({defaultModal:true})
                                  }}
                              >
                                <img
                                  src={post.image}
                                  className="img-fluid"
                                  alt=""
                                  // style={{height:'98%'}}
                                  // onClick={() => <Modals/>}
                                />
                              </Card>
                            ))}
                          </div>
                        </div>
                        <a
                          href="#"
                          onClick={() => this.toggleModal("defaultModal")}
                        >
                          Show more
                        </a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>

        <Modal
size="lg"
          isOpen={this.state.defaultModal}
          toggle={() => this.toggleModal("defaultModal")}
          className="fluid"
        >     {this.state.modalItem&&
                <Post item={this.state.modalItem}  
                />
              }
         
        </Modal>
        <SimpleFooter />
      </>
    );
  }
}

export default Profile;
