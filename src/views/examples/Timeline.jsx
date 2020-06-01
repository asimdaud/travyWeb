import React from "react";
import { Link } from "react-router-dom";
import Post from "../../components/post.jsx";
import {
  // Button,
  Card,
  // CardHeader,
  // CardBody,
  // NavItem,
  // NavLink,
  // Nav,
  // Progress,
  // Table,
  Container,
  Jumbotron,
  Row,
  Col,
} from "reactstrap";
//  import * as firebase from 'firebase';
import { firebase } from "../../services/firebase";
// import {
//   CardImg, CardText,  CardTitle, CardSubtitle
// } from 'reactstrap';
// import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import UserNavbar from "components/Navbars/UserNavbar.jsx";

const user3 = JSON.parse(localStorage.getItem("uid"));

// const user3 = "niKoNaL9NeOPx7iW4jDUi5Cqyht2"

class Timeline extends React.Component {
  // _isMounted = false;

  // user3 = firebase.auth().currentUser;
  firestoreUsersRef = firebase.firestore().collection("users");
  firestorePostRef = firebase.firestore().collection("posts");
  // firestoreFollowingRef = firebase
  //   .firestore()
  //   .collection("following")
  //   .doc(user3)
  //   .collection("userFollowing");

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     user3: JSON.parse(localStorage.getItem("uid")),
  //     posts: [],
  //     userData: {},
  //     followedUsers: [],
  //     avatar: "",
  //     isLoading: true,
  //   };
  // }

  state = {
    user3: JSON.parse(localStorage.getItem("uid")),
    posts: [],
    userData: {},
    followedUsers: [],
    avatar: "",
    isLoading: true,
  };

  componentWillMount = () => {
    // this.getPosts();
    user3: JSON.parse(localStorage.getItem("uid"));

    this.getProfilePic();
    this.getFollowedUsers();
    this.getFollowingPosts();
  };

  componentDidMount = () => {
    // this.getProfilePic();
    // this.getFollowingPosts();
    // this._isMounted = true;
    // this.getFollowedUsers().then(result => {
    //   if (this._isMounted) {
    //     this.setState({isLoading: false})
    //   }
    // });
  
  
    // localStorage.removeItem("Fuid");
  
  };

  componentWillUnmount() {
    this.getFollowedUsers();
    this.getFollowingPosts();
  }
  // Get all the users the current user3 is following
  getFollowedUsers = async () => {
    let users = [];
    await firebase
      .firestore()
      .collection("following")
      .doc(this.state.user3)
      .collection("userFollowing")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
          users.push(docSnap.id);
        });
        // this.setState({followedUsers: users});
      });
    this.setState({ followedUsers: users });
    // console.log(this.state.followedUsers);
  };

  // Get all posts of each user3 and push them in a same array
  getFollowingPosts = async () => {
    // 1. Get all the users the current user3 is following
    await this.getFollowedUsers().then(async () => {
      // console.log(this.state.followedUsers);

      let users = this.state.followedUsers;
      let allPosts = [];

      // 2. Get posts of each user3 seperately and putting them in one array.
      //  users.forEach(async (user3) => {
      for (const eachUser of users) {
        await this.getProfilePic(eachUser).then(async () => {
          // console.log("Avatar:" + this.state.avatar);
          await this.firestoreUsersRef
            .doc(eachUser)
            .get()
            .then(async (document) => {
              this.setState({ userData: document.data() });

              // console.log(document.data());
              await this.firestorePostRef
                .doc(eachUser)
                .collection("userPosts")
                .orderBy("time", "desc")
                // .limit(9)
                .get()
                .then((snapshot) => {
                  snapshot.forEach((doc) => {
                    let article = {
                      username: this.state.userData.username,
                      userId: eachUser,
                      title: "post",
                      avatar: this.state.avatar,
                      image: doc.data().image,
                      cta: "cta",
                      caption: doc.data().caption,
                      location: doc.data().location.coordinates,
                      locName: doc.data().location.locationName,
                      postId: doc.data().postId,
                      timeStamp: doc.data().time,
                      // likes:0,
                      locLatLng: "Address",
                    };
                    allPosts.push(article);
                  });
                });
              this.setState({ posts: allPosts });
            });
        });
        // allPosts.sort(function(a,b){
        //   // Turn your strings into dates, and then subtract them
        //   // to get a value that is either negative, positive, or zero.
        //   return new Date(b.timeStamp) - new Date(a.timeStamp) ;
        // });

        // this.setState({posts: allPosts});
        // console.log(this.state.posts);
      }
    });
  };

  getProfilePic = async (user) => {
    const firebaseProfilePic = await firebase
      .storage()
      .ref()
      .child("profilePics/(" + user + ")ProfilePic");
    firebaseProfilePic
      .getDownloadURL()
      .then((url) => {
        // console.log("got profile pic of" +user3 + url);
        this.setState({ avatar: url });
        console.log(this.state.avatar);

        return url;
      })
      .catch((error) => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            this.setState({
              avatar:
                "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif",
            });
            return "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif";
          // break;
        }
        console.log(error);
      });
  };

  writeNewPost(
    user3,
    // username,
    picture,
    caption,
    location
  ) {
    // A post entry.
    var postData = {
      username: this.state.userData.username,
      userId: user3,
      title: "post",
      avatar: this.state.avatar,
      cta: "cta",
      image: picture,
      caption: caption,
      location: location,
      postId: "",
      timeStamp: "",
    };
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child("posts").push().key;

    // Write the new post's data simultaneously in the posts list and the user3's post list.
    var updates = {};
    updates["/posts/" + newPostKey] = postData;
    updates["/user3-posts/" + user3 + "/" + newPostKey] = postData;

    return firebase.database().ref().update(updates);
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
          <section className="section section-blog-info mt--300">
            <Row className="mt--200">
              <Col sm="3" md="2" lg="1" className=".hidden-xs">
                {/* <Card
                  body
                  inverse
                  style={{ backgroundColor: "#333", borderColor: "#333" }}
                >
                  <a>sup</a>
                </Card> */}
              </Col>
              <Col sm="6" md="8" lg="9">
                {/* <div className="col-md-8 mx-auto"> */}
                {/* <div className="card"> */}
                {/* <div className="card-header"> */}
                {/* <h5 className="h3 mb-0">Timeline</h5> */}
                {/* </div> */}
                {/* <div className="container card-profile mt--300"> */}

                {this.state.posts.map((post, postindex) => (
                  <Post item={post} key={postindex} />
                ))}
              </Col>

              <Col sm="3" md="2" lg="2" className=".hidden-xs">
                <Card >
                  <Jumbotron to="/loc" tag={Link} style={{background:"transparent" }}>
                    {/* <h1 className="display-3 text-black">View your friends' posts on Map</h1> */}
                    <p className="lead text-black">
                      View your friends' posts on the map
                    </p>
                  </Jumbotron>
                </Card>
              </Col>
            </Row>
            {/* </div> */}
            {/* </div> */}
          </section>
        </main>
      </>
    );
  }
}
export default Timeline;
