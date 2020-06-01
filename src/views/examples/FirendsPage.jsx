import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col, Modal } from "reactstrap";

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

const friendId = JSON.parse(localStorage.getItem("Fuid"));
const currentUserUid = JSON.parse(localStorage.getItem("uid"));

class FriendsPage extends React.Component {
  firestoreUsersRef = firebase.firestore().collection("users");
  firestorePostRef = firebase.firestore().collection("posts");
  // componentDidMount() {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.main.scrollTop = 0;
  // }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     friendId: JSON.parse(localStorage.getItem("Fuid")),
  //     currentUserUid: JSON.parse(localStorage.getItem("uid")),
  //     uid: friendId,
  //     profilePic:
  //       "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
  //     username: "",
  //     bio: "",
  //     name: "",
  //     email: "",
  //     posts: [],
  //     postCount: 0,
  //     following: false,
  //     loading: true,
  //     followedUsers: "00"
  //     // showModal: false,
  //     // defaultModal: false
  //   };
  // }

  state = {
    friendId: JSON.parse(localStorage.getItem("Fuid")),
    currentUserUid: JSON.parse(localStorage.getItem("uid")),
    uid: friendId,
    profilePic:
      "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
    username: "",
    bio: "",
    name: "",
    email: "",
    posts: [],
    postCount: 0,
    following: false,
    loading: true,
    followedUsers: "00"
    // showModal: false,
    // defaultModal: false
  };

  // LOL = e => {
  //   console.log("wtf");
  // };

  // state = {};
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  componentWillMount =  () => {

    // const friendId = JSON.parse(localStorage.getItem("Fuid"));
    // const currentUserUid = JSON.parse(localStorage.getItem("uid"));

    // this.redirectToHome();
    this.getFollowedUsers();


    this.checkFollow();
    this.getPosts();
    this.getProfilePic();

  };
 


  

  componentDidMount() {
    this.getPosts();

        document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    // this.redirectToHome();

    // this.getRealTimeUpdates();

    // this.getPermissionAsync();

    this.checkFollow();
  }

 getProfilePic = () => {

  // if (isUserSignedIn) {
  //   console.log(friendId);
  // }

  firebase
    .firestore()
    .collection("users")
    .doc(this.state.friendId)
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
  const firebaseProfilePic =  firebase
    .storage()
    .ref()
    .child("profilePics/(" + this.state.friendId + ")ProfilePic");
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
      }
      alert(error);
    });


 }
  getPosts = () => {
    const cloudImages = [];
    firebase
      .firestore()
      .collection("posts")
      .doc(this.state.friendId)
      .collection("userPosts")
      .orderBy("time", "desc")
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {    let article = {
          username: this.state.username,
          userId: this.state.friendId,
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


  checkFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(currentUserUid)
      .collection("userFollowing")
      .doc(friendId)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          this.setState({ following: true });
        } else {
          this.setState({ following: false });
        }
      });
  };

  handleFollow = () => {
    if (!this.state.following) {
      console.log(currentUserUid + " is following " + this.state.uid);
      firebase
        .firestore()
        .collection("following")
        .doc(this.state.currentUserUid)
        .collection("userFollowing")
        .doc(this.state.uid)
        .set({
          userId: this.state.uid
        })
        .then(() => {
          this.setState({ following: true });
        });
    } else {
      console.log("UNFOLLOWED");
      firebase
        .firestore()
        .collection("following")
        .doc(this.state.currentUserUid)
        .collection("userFollowing")
        .doc(this.state.uid)
        .delete()
        .then(() => {
          this.setState({ following: false });
        });
    }
  };

  renderFollow = () => {
    if (this.state.following) {
      return (
        <a>
          <Button
            className="mr-4"
            color="outline-info"
            size="sm"
            onClick={this.handleFollow}
          >
            Following
          </Button>
          <Link to="/chat">
            <Button className="mr-4" color="outline-success" size="sm">
              Message
            </Button>
          </Link>
        </a>
      );
    } else {
      return (
        <Button
          className="mr-4"
          color="info"
          size="sm"
          // shadowless={false}
          onClick={this.handleFollow}
        >
          Follow
        </Button>
      );
    }
  };

  // Get all the users the current user is following
  getFollowedUsers = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(this.state.currentUserUid)
      .collection("userFollowing")
      .onSnapshot(snapshot => {
        let num = snapshot.size;
        console.log(num);
        this.setState({ followedUsers: num });
      });
  };

  // redirectToHome = () => {
  //   if(JSON.parse(localStorage.getItem("Fuid")) == null){
  //     return <Redirect to="/timeline" tag={Link} />;
  //   }
  //     }
  


  

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
                        </Button>

                        <Button
                          onClick={this.toggleFollow}
                          className={
                            this.state.ifFollowed === true ? "fa fa-heart" : "fa fa-heart-o"
                          }
                        >

                          {" " }
                        </Button> */}

                        {this.renderFollow()}

                        {/* <Button
                          onClick={this.toggleFollow}
                          className={
                            this.state.following === true ? (
                              <Button
                                className="mr-4 fa fa-heart"
                                color="info"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                                size="sm"
                              >
                                " " 
                              </Button>
                            ) : (
                              <Button
                                className="mr-4 fa fa-heart-o"
                                color="outline-info"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                                size="sm"
                              >
                                
                              </Button>
                            )
                          }
                        >
                          {" " + this.state.likes}
                        </Button> */}
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

export default FriendsPage;
