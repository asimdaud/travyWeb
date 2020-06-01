/*global google*/

import React from "react";
import moment from "moment";
import { Favorite, FavoriteBorder, Comment } from "@material-ui/icons";
import SmoothImage from "react-smooth-image";
// reactstrap components
import {
  // UncontrolledCollapse,
  // NavbarBrand,
  // Navbar,
  // NavItem,
  // NavLink,
  // Nav,
  Button,
  Card,
  // CardHeader,
  CardBody,
  // FormGroup,
  // Form,
  Input,
  UncontrolledTooltip,
  // Row,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
  Form,
  Container,
  UncontrolledCollapse,
  Collapse,
  Modal,
} from "reactstrap";
import * as firebase from "firebase";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CommentItem from "../components/CommentItem";

// const user3 = JSON.parse(localStorage.getItem('uid'));
// const firestorePostRef =  firebase.firestore().collection("posts").doc(user3).collection("userPosts");
// const user = JSON.parse(localStorage.getItem("user"));

class Post extends React.Component {
  user = firebase.auth().currentUser;

  state = {
    user: firebase.auth().currentUser,
    likes: 0,
    comments: [],
    ifLiked: false,
    newLikeDocId: "(" + this.user.uid + ")like",
    userId: this.props.item.userId,
    commentsArray: [],
    getComments: false,
    // openCommentInput: false,
    profilePic:
      "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
    commentInput: "",
    currentUsername: "",
    defaultModal: false,
    modalItem: "",
    locLatLng: "",
    comment: "",
  };

  firestorePostRef = firebase
    .firestore()
    .collection("posts")
    .doc(this.state.userId)
    .collection("userPosts");

  firestoreUsersRef = firebase.firestore().collection("users");

  componentDidMount = () => {
    const { item } = this.props;

    // this.setState({userId: item.userId});

    // console.log("state userId: " + this.state.userId);
    this.firestorePostRef
      .doc(item.postId)
      .collection("likes")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          this.setState({ likes: querySnapshot.size });
        }
      });
    // this.renderComments();
    this.getCommentData();
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  componentWillMount = () => {
    this.getProfilePic();
    // this.mOver();

    const { item } = this.props;
    //     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    // // console.log(new Date())
    // console.log(props.post)
    // console.log("hahahaha" + item.image);

    this.firestorePostRef
      .doc(item.postId)
      .collection("likes")
      .doc(this.state.newLikeDocId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          this.setState({ ifLiked: true });
        } else {
          this.setState({ ifLiked: false });
        }
      });
  };

  getProfilePic = (friendId) => {
    const firebaseProfilePic = firebase
      .storage()
      .ref()
      .child("profilePics/(" + this.user.uid + ")ProfilePic");
    firebaseProfilePic
      .getDownloadURL()
      .then((url) => {
        // Inserting into an State and local storage incase new device:
        this.setState({ profilePic: url });
      })
      .catch((error) => {
        // Handle any errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            this.setState({
              profilePic:
                "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop",
            });
            break;
          default:
        }
        //   alert(error);
      });
  };

  toggleLike = () => {
    // document.body.style.color = "red";
    const noOfLikes = this.state.likes;
    const { item } = this.props;
    if (!this.state.ifLiked) {
      this.firestorePostRef
        .doc(item.postId)
        .collection("likes")
        .doc(this.state.newLikeDocId)
        .set({
          userId: this.user.uid,
        })
        .then(() => {
          this.state.likes = noOfLikes + 1;
          this.setState({ ifLiked: true });
        });
    } else {
      this.firestorePostRef
        .doc(item.postId)
        .collection("likes")
        .doc(this.state.newLikeDocId)
        .delete()
        .then(() => {
          if (noOfLikes === 0) this.state.likes = 0;
          this.state.likes = noOfLikes - 1;
          this.setState({ ifLiked: false });
        });
    }
  };

  getCurrentUsername() {
    this.firestoreUsersRef
      .doc(this.user.uid)
      .get()
      .then((document) => {
        this.setState({ currentUsername: document.data().username });
      });
  }

  postComment = (e) => {
    e.preventDefault();
    const { item } = this.props;
    let myComment = this.state.commentInput;
    let myusername = this.state.currentUsername;
    let myuserId = this.user.uid;

    if (myComment != "") {
      firebase
        .firestore()
        .collection("comments")
        .doc(item.postId)
        .collection("userComments")
        .add({})
        .then((comment) => {
          firebase
            .firestore()
            .collection("comments")
            .doc(item.postId)
            .collection("userComments")
            .doc(comment.id)
            .set({
              commentId: comment.id,
              username: myusername,
              userId: myuserId,
              comment: myComment,
            })
            .then(() => {
              this.setState({ commentInput: "" });

              this.getCommentData();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getCommentData() {
    let commArray = [];
    const { item } = this.props;
    // this.firestorePostRef.doc(this.state.userId).collection("userPosts").doc(this.props.item.postId).collection("comments").
    //POST K hisab sa lao
    firebase
      .firestore()
      .collection("comments")
      .doc(item.postId)
      .collection("userComments")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let article = {
            commentData: doc.data(),
            postId: item.postId,
          };

          commArray.push(article);

          // console.log(doc.data()+commArray);
        });
        this.setState({ commentsArray: commArray });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderAvatar() {
    const { item } = this.props;

    // if (!item.avatar) return null;
    return (
      <Link to="/friendspage">
        <img
          // className="rounded-circle"
          className="avatar"
          width="45"
          src={item.avatar}
          // src={this.user.uid}
          alt=""
          // onClick={localStorage.setItem('Fuid', JSON.stringify(this.state.userId))}
        />
      </Link>
    );
  }

  togglePage = () => {
    // document.body.style.color = "red";
    // const frndId = this.state.userId;
    const { item } = this.props;
    // if (!this.state.ifLiked) {
    this.firestorePostRef
      .doc(item.postId)
      .collection("likes")
      .doc(this.state.newLikeDocId)
      .set({
        userId: this.user.uid,
      })
      .then(() => {
        {
          // localStorage.setItem("Fuid", JSON.stringify(this.state.userId));
        }
      });
  };

  handleChange = (e) => {
    // this.setState({
    //   [e.target.id]: e.target.value
    // });
    this.setState({ commentInput: e.target.value });
    this.setState({ username: this.getCurrentUsername() });
  };

  // commentFunc = () => (
  //   <>
  //     {/* <Button   color="outline-info"
  //           size="sm"
  //           className="mr-4"
  //          id="toggler" style={{ marginBottom: '1rem' }}>
  //       Comment
  //     </Button> */}
  //     <UncontrolledCollapse toggler="#toggler">
  //       <Card>
  //         <Input
  //           // className="form-control-alternative"
  //           // defaultValue=""
  //           id="commentInput"
  //           placeholder="Add a comment!"
  //           type="text"
  //           onChange={this.handleChange}
  //           // onChange={word => this.setState({commentInput: word})}
  //           value={this.state.commentInput}
  //         />
  //         <Button type="submit" onClick={this.postComment}>
  //           Comment
  //         </Button>
  //       </Card>
  //     </UncontrolledCollapse>
  //   </>
  // );

  //   renderComments = () =>{

  //     // const {navigation} = this.props;
  //     {this.state.commentsArray.map((comment, postindex) => (
  //       <CommentItem item={comment} key={postindex} />

  //     ))}

  //     if(this.state.commentsArray.length){
  //       console.log(this.state.commentsArray);

  //     return (
  //       <div>

  // {this.state.commentsArray.map((comment, postindex) => (
  //                   <CommentItem item={comment} key={postindex} />

  //                 ))}

  //         {/* <FlatList
  //         data={this.state.commentsArray}
  //         renderItem={({ item}) => (
  //           <CommentItem
  //             updateComments={this.getCommentData}
  //             comment = {item}
  //             postId = {this.props.item.postId}
  //             userId = {this.state.userId}
  //             // navigation = {navigation}
  //             />
  //             )}
  //             keyExtractor={item => item.commentId}
  //         /> */}
  //       </div>

  //     )
  //   }
  //   }

  returnPostId() {
    const { item } = this.props;
    return item.postId;
  }

  onHover = () => {
    localStorage.setItem("Fuid", JSON.stringify(this.state.userId));
  };

  mOver = () => {
    const { item } = this.props;

    var geocoder = new google.maps.Geocoder();

    // var latlng = {lat: this.state.locLat, lng: this.state.locLng};
    var latlng = {
      lat: parseFloat(item.location.lat),
      lng: parseFloat(item.location.lng),
    };
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === "OK") {
        if (results[0]) {
          // console.log(results[0].formatted_address);
          // this.state.locLatLng=results[0].formatted_address;
          item.locLatLng = results[0].formatted_address;
          console.log(item.locLatLng);
          // this.setState({ locLatLng:results[0].formatted_address });
          // map.setZoom(11);
          // var marker = new google.maps.Marker({
          //   position: latlng,
          //   map: map
          // });
          // infowindow.setContent(results[0].formatted_address);
          // infowindow.open(map, marker);
        } else {
          console.log("No address found");
        }
      }
    });
    return;
  };

  render() {
    const { item } = this.props;
    return (
      <Container style={{ zoom: "90%" }}>
        <section style={{ padding: "16px" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <div className="card  shadow">
                  {/* <div className="card-header">
                <h5 className="h3 mb-0">Timeline</h5>
              </div> */}
                  <div
                    className="card-header d-flex align-items-center"
                    // onClick={this.togglePage()}
                  >
                    <div
                      className="d-flex align-items-center"
                      onClick={() => {
                        this.togglePage();
                      }}
                      onMouseOver={this.onHover}
                      href="javascript:;"
                    >
                      {/* <i
                        href="javascript:;"
                        onClick={this.togglePage()}
                        // onMouseOver={this.mOver()}
                        // id={this.returnPostId()}
                      > */}
                      {this.renderAvatar()}
                      {this.togglePage()}

                      {/* </a> */}

                      {/* <UncontrolledPopover
                        trigger="focus"
                        placement="right"
                        target={this.returnPostId()}
                      >

                       <PopoverBody>
    
<a href="javascript:;">
<Link to="friendspage">View profile</Link>
                          
</a>
                        </PopoverBody>
                      </UncontrolledPopover> */}

                      <div className="mx-3">
                        <a
                          href="javascript:;"
                          className="text-dark font-weight-600 text-sm"
                        >
                          {/* {this.getCurrentUsername} */}
                          {item.username}
                          {/* {item.userId} */}
                          {/* {this.user.username} */}
                        </a>
                        <small className="opacity-60">
                          <small className="d-block text-muted">
                            {/* {moment(Number(item.timeStamp.toDate())).format(
                              "ll"
                            )} */}
                            {/* {item.timeStamp} */}
                          </small>
                        </small>
                      </div>
                    </div>
                    <div className="text-right ml-auto">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary btn-icon"
                        onClick={() => {
                          this.mOver();
                        }}
                      >
                        <span className="btn-inner--icon icon-big">
                          <i
                            className="fa fa-map-marker"
                            id="tooltip556394744"
                          ></i>
                        </span>
                        {/* <span className="btn-inner--text">{item.locLatLng}</span> */}
                        <span className="btn-inner--text">{item.locName}</span>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="mb-4">{item.caption}</p>
                    <SmoothImage
                      alt="Image placeholder"
                      src={item.image}
                      className="img-fluid rounded"
                    />
                    <div className="row align-items-center my-3 pb-3 border-bottom">
                      <div className="col-sm-6">
                        <div className="icon-actions">
                          {this.state.ifLiked === true ? (
                            <Favorite color="error" onClick={this.toggleLike} />
                          ) : (
                            <FavoriteBorder
                              color="secondary"
                              onClick={this.toggleLike}
                            />
                          )}

                          <span className="text-muted">
                            {" "}
                            {" " + this.state.likes}
                            {" likes "}
                          </span>

                          <Comment color="primary" />

                          <span className="text-muted">
                          {/* d-none d-lg-block */}
                            {" "}
                            {" " + this.state.commentsArray.length}
                            {" comments "}
                          </span>

                          {/* {this.commentFunc()} */}
                        </div>
                      </div>
                    </div>

                    {/* <!-- Comments --> */}
                    <div className="mb-1">
                      {this.state.commentsArray.map((comment, postindex) => (
                        <CommentItem item={comment} key={postindex} />
                      ))}
                      <div className="media align-items-center mt-1">
                        <img
                          alt="Image placeholder"
                          className="avatar"
                          src={this.state.profilePic}
                        />
                        <div className="media-body">
                          <Form
                            id="formComment"
                            role="form"
                            onSubmit={this.postComment}
                          >
                            <Input
                            class="form-control"
                              id="commentInput"
                              placeholder="Write your comment"
                              onChange={this.handleChange}
                              value={this.state.commentInput}
                              rows="1"
                            ></Input>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Modal
          isOpen={this.state.defaultModal}
          toggle={() => this.toggleModal("defaultModal")}
        >
          {/* <div className="modal-header">
      <h6 className="modal-title" id="modal-title-default">
        Type your modal title
      </h6>
      <button
        aria-label="Close"
        className="close"
        data-dismiss="modal"
        type="button"
        onClick={() => this.toggleModal("defaultModal")}
      >
        <span aria-hidden={true}>×</span>
      </button>
    </div> */}
          <div>
            {/* {this.state.posts((post, postindex) => ( */}
            {this.state.modalItem && <a>this.state.modalItem</a>}

            {/* </Container>   */}
          </div>
          <div className="modal-footer">
            {/* <Button color="primary" type="button">
        Save changes
      </Button> */}
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("defaultModal")}
            >
              Close
            </Button>
          </div>
        </Modal>
      </Container>
    );
  }
}

// Post.propTypes = {
//   item: PropTypes.object
// };

export default Post;
