import React from "react";
import * as firebase from "firebase";
import {
  Card,
  Col,
  UncontrolledTooltip,
  UncontrolledPopover,
  PopoverBody,
  Button,
  PopoverHeader,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Badge,
  Media
} from "reactstrap";
import {DeleteOutline} from '@material-ui/icons';

class CommentItem extends React.Component {
  state = {
    currentUserId: JSON.parse(localStorage.getItem("uid")),
    profilePic:
      "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
    commentDeleted: false
  };


  componentWillMount = () => {
    this.getProfilePic();
  };


  componentDidMount = () => {
    // this.getProfilePic();
  };

  getProfilePic = friendId => {
    const { item } = this.props;

    const firebaseProfilePic = firebase
      .storage()
      .ref()
      .child("profilePics/(" + item.commentData.userId + ")ProfilePic");
    firebaseProfilePic
      .getDownloadURL()
      .then(url => {
        this.setState({ profilePic: url });
      })
      .catch(error => {
        console.log("No picture found for: " + item.commentData.userId);
      });
  };

  deleteComment = async () => {
    const { item } = this.props;

    // if (item.userId == this.state.currentUserId) {
      await firebase
        .firestore()
        .collection("comments")
        .doc(item.postId)
        .collection("userComments")
        .doc(item.commentData.commentId)
        .delete()
        .then(() => {
          alert("Comment Deleted!");
          this.setState({ commentDeleted: true });
        })
        .catch(err => {
          alert(err);
        });
    // }
  };
  render() {
    const { item } = this.props;
     return (
      <div className="media-list">
        <div className="media media-comment">
          <img
            alt="Image placeholder"
            className="media-comment-avatar avatar rounded-circle"
            src={this.state.profilePic}
          />
          <div className="media-body">
            <div className="media-comment-text">
              
              <h4><Badge color="secondary">{item.commentData.username}</Badge></h4>
              <p className="text-sm lh-160">{item.commentData.comment}</p>
            </div>
          </div>
 

{item.commentData.userId == this.state.currentUserId ? (
  <DeleteOutline onClick={this.deleteComment} />
                          ) : (
""
                          )}

          {/* <UncontrolledDropdown>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-settings-gear-65" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="navbar-success_dropdown_1" right>
              <DropdownItem onClick={this.deleteComment}>
                <i className="ni ni-fat-remove" />
                Location
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </div>
      </div>
    );
  }
}

export default CommentItem;
