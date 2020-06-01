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
// import firebase from "firebase/app";
import { firebase } from "../../services/firebase";
import { logOutUser } from "../../services/authServices";

// import classnames from "classnames";
// import { Route, Redirect } from "react-router-dom";

class UserNavbar extends React.Component {
  state = {
    user3: JSON.parse(localStorage.getItem("uid")),
    searchWord: "",
    searchResults: [],
    profilePic:
      "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
    foundUser: "",
    found: false
  };

  // let citiesRef = db.collection('cities');
  // let query = citiesRef.where('capital', '==', true).get()
  //   .then(snapshot => {
  //     if (snapshot.empty) {
  //       console.log('No matching documents.');
  //       return;
  //     }

  //     snapshot.forEach(doc => {
  //       console.log(doc.id, '=>', doc.data());
  //     });
  //   })
  //   .catch(err => {
  //     console.log('Error getting documents', err);
  //   });

  searchUser(word) {
    let userCollectionRef = firebase.firestore().collection("users");
console.log(word)
    let users = [];
    userCollectionRef
      .where("username", "==", word)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          users.push(documentSnapshot.data());
          //   console.log(documentSnapshot.id);
          this.setState({ foundUser: documentSnapshot.id, found: true });
          // console.log(this.state.foundUser)
          // console.log(users);
        });
        // console.log(this.state.searchResults);
        // console.log(this.state.foundUser);

        if (users.length == 0) {
          this.setState({
            profilePic:
              "https://image.shutterstock.com/image-vector/vector-man-profile-icon-avatar-260nw-1473553328.jpg",
            searchResults: [],
            foundUser: "",
            found: false
          });
          console.log(this.state.found)
        } else {
          let profilePic = firebase
          .storage()
          .ref()
          .child(
            "profilePics/(" + this.state.foundUser + ")ProfilePic"
          );
          profilePic.getDownloadURL()
          .then(url => {
            this.setState({ profilePic: url });
          });
          this.setState({ searchResults: users });
          console.log(this.state.searchResults);
        }
      });
  }

  renderAvatar() {
    // const {
    //   //  avatar, styles,
    //   item
    // } = this.props;

    // if (!item.avatar) return null;
    return (
      <Link to="/friendspage">
        <img
          // className="rounded-circle"
          className="avatar"
          width="45"
          src={this.state.profilePic}
          alt=""
          // onClick={localStorage.setItem('Fuid', JSON.stringify(this.state.userId))}
        />
      </Link>
    );
  }

  // renderAvatar() {
  //   const { avatar, styles, item } = this.props;

  //   // if (!item.avatar) return null;
  //   return (
  //     <Link to="/friendspage">
  //       <img
  //         className="rounded-circle"
  //         width="45"
  //         src={item.avatar}
  //         alt=""
  //         // onClick={localStorage.setItem('Fuid', JSON.stringify(this.state.userId))}
  //       />
  //     </Link>
  //   );
  // }

  // togglePage = () => {
  //   // document.body.style.color = "red";
  //   const frndId = this.state.userId;
  //   const { item } = this.props;
  //   // if (!this.state.ifLiked) {
  //   this.firestorePostRef
  //     .doc(item.postId)
  //     .collection("likes")
  //     .doc(this.state.newLikeDocId)
  //     .set({
  //       userId: this.user.uid
  //     })
  //     .then(() => {
  //       {
  //         localStorage.setItem("Fuid", JSON.stringify(this.state.userId));
  //       }
  //     });
  // };
  // onHover=()=>{
  //   // localStorage.setItem("Fuid", JSON.stringify(this.state.userId));
  // }

  renderUserItem = () => {

    // const { item } = this.props;
    if (this.state.found) {
      return (
        <div 
        // onMouseOver={this.onHover}
        >
         
 {this.renderAvatar()}
         
              {/* {this.state.searchWord} */}
            

        
        </div>
      );
    }
    else return null;
  };




  textInput = word => {
    // word.preventDefault();
    this.setState({ searchWord: word });
    this.searchUser(word.target.value);
    // console.log("textinput+   " + word);
  };

  // handleChange(e) {
  //       // Variable to hold the original version of the list
  //   let currentList = [];
  //       // Variable to hold the filtered list before putting into state
  //   let newList = [];

  //       // If the search bar isn't empty
  //   if (e.target.value !== "") {
  //           // Assign the original list to currentList
  //     currentList = this.props.items;

  //           // Use .filter() to determine which items should be displayed
  //           // based on the search terms
  //     newList = currentList.filter(item => {
  //               // change current item to lowercase
  //       const lc = item.toLowerCase();
  //               // change search term to lowercase
  //       const filter = e.target.value.toLowerCase();
  //               // check to see if the current list item includes the search term
  //               // If it does, it will be added to newList. Using lowercase eliminates
  //               // issues with capitalization in search terms and search content
  //       return lc.includes(filter);
  //     });
  //   } else {
  //           // If the search bar is empty, set newList to original task list
  //     newList = this.props.items;
  //   }
  //       // Set the filtered state based on what our rules added to newList
  //   this.setState({
  //     filtered: newList
  //   });
  // }

  // renderSearchBar = () => {
  //   const { navigation } = this.props;
  //   return (
  //     <Input
  //       right
  //       color="black"
  //       // style={styles.search}
  //       placeholder="Search"
  //       placeholderTextColor={"#8898AA"}
  //       // onFocus={() => navigation.navigate('Pro')}
  //       onChangeText={word => this.textInput(word)}
  //       value={this.state.searchWord}
  //       // iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search" family="EvilIcons" />}
  //     />
  //   );
  // };

  // renderDropdown(array) {
  //   if (this.state.searchResults.length) {
  //     let searchResults = this.state.searchResults;
  //     searchResults.map(user => {
  //       return <li>user.username;</li>;
  //     });
  //   }
  // }

  // toggleDropdown(){
  //   if (this.state.searchResults.length) {
  //     let searchResults = this.state.searchResults;
  //     searchResults.map(user => {
  //       return <option>user.username;</option>;
  //     });
  //   }
  // }

  renderSearchBar=()=>{

    return (
      <InputGroup className="input-group-alternative">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className="ni ni-zoom-split-in" />
        </InputGroupText>
      </InputGroupAddon>
      <input
        // className="form-control-alternative"
        placeholder="Search"
        type="text"
        // onChange={this.textInput}
        // value={this.state.searchWord}
        onChange={word => this.textInput(word)}
        // value={this.state.searchWord}
      />
    </InputGroup>
    
    );
  }


 



  logOut() {
    logOutUser();
  }

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    this.renderUserItem();
    this.renderSearchBar();
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

                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  {/* <form> */}
                   {this.renderSearchBar()}
                   {this.renderUserItem()}
                    {/* {this.renderDropdown()} */}
                  {/* </form> */}
                </Nav>

                {/* <Nav>
                <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect">

           {this.toggleDropdown}
          
        </Input>
      </FormGroup>
                </Nav> */}

                <Nav
                  className="navbar-nav-hover align-items-lg-center ml-lg-auto"
                  navbar
                >
                  <NavItem className="nav-link-icon">
                    <NavLink to="/timeline" tag={Link}>
                      <i className="ni ni-world" />
                      <span className="nav-link-inner--text">Timeline</span>
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-link-icon">
                    <NavLink to="/profile" tag={Link}>
                      <i className="ni ni-circle-08" />
                      <span className="nav-link-inner--text">Profile</span>
                    </NavLink>
                  </NavItem>

                  <UncontrolledDropdown nav>
                    <DropdownToggle nav className="nav-link-icon">
                      <i className="ni ni-settings-gear-65" />
                      <span className="nav-link-inner--text d-lg-none">
                        Settings
                      </span>
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="navbar-success_dropdown_1"
                      right
                    >
                      <DropdownItem
                        to="/loc"
                        tag={Link}
                        // onClick={this.logOut}
                      >
                        <i className="ni ni-fat-remove" />
                        Location
                      </DropdownItem>

                      <DropdownItem to="/edit-profile" tag={Link}>
                        <i className="ni ni-scissors" />
                        Edit Profile
                      </DropdownItem>

                      <DropdownItem
                        to="/login"
                        tag={Link}
                        onClick={this.logOut}
                      >
                        <i className="ni ni-fat-remove" />
                        Log Out
                      </DropdownItem>

                      {/* <DropdownItem
                        //   to="/timeline"
                        onClick={this.logOut}
                      >
                       <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                      target="_blank"
                    >
                      <span className="btn-inner--icon">
                      <i className="ni ni-fat-remove" />
                      </span>
                      <span className="nav-link-inner--text ml-1">Log Out</span>
                    </Button>
                      </DropdownItem> */}
                    </DropdownMenu>
                  </UncontrolledDropdown>
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
