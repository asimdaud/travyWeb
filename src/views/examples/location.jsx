/*global google*/

import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  TrafficLayer,
  Circle,

  InfoWindow

} from "react-google-maps";

// import Geosuggest from "react-geosuggest";

// reactstrap components
import { Card, Container, Row, Modal, Button, Jumbotron } from "reactstrap";
import Post from "../../components/post";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
// import { HeatmapLayer } from '@react-google-maps/api';
import UserNavbar from "components/Navbars/UserNavbar.jsx";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { firebase } from "../../services/firebase";
import Timeline from "../examples/Timeline";
import { Redirect, Link } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyC3jftuRYj7vJ5cB-HGvzq6fC60WXOCtoM");
Geocode.enableDebug();


const userId = JSON.parse(localStorage.getItem("uid"));
// const that = this.setTimeout(() => that.setState({ overlay: false }), 1500)

class location extends React.Component {
  firestoreUsersRef = firebase.firestore().collection("users");
  firestorePostRef = firebase.firestore().collection("posts");
  firestoreFollowingRef = firebase
    .firestore()
    .collection("following")
    .doc(userId)
    .collection("userFollowing");

  state = {
    posts: [],
    followedUsers: [],
    user: JSON.parse(localStorage.getItem("uid")),
    userData: {},
    avatar: "",
    heatMapData: [],
    marks: [],
    selectedMarker: false,
    postId: [],
    defaultModal: false,
    userLastSeen: "N/A",
    userLongitude: 0,
    userLatitude: 0,
    markerImage: "",
    modalItem: "",
    // address: "",
    // city: "",
    // area: "",
    // state: "",
    showMyLoc: false,




    address: "",
      city: "",
      area: "",
      state: "",
      mapPosition: {
        lat: 33.738045,
        lng: 73.084488 ,
      },
      markerPosition: {
        lat: 33.738045,
        lng: 73.084488 ,
      },
    // mapPosition: {
    //  lat: this.props.center.lat,
    //  lng: this.props.center.lng
    // },
    //     markerPosition: {
    //      lat: this.props.center.lat,
    //      lng: this.props.center.lng
    //  }
  };

  // setMark = e => {
  //   this.setState({ marks: [...this.state.marks, e.latLng] });
  // };

  // deleteMark = () => {
  //   this.setState({
  //       marks: []
  //   });
  // };

  componentWillMount = () => {
    this.getFollowingPosts().then(() => {
      this.getHeatMapData();
      this.getUserLocation();

      // this.onClick();
    });
  };

  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components;
 

        this.setState({
          address: address ? address : ""    });
      },
      (error) => {
        console.error(error);
      }
    );
  }

// /**
//    * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
//    *
//    * @param nextProps
//    * @param nextState
//    * @return {boolean}
//    */
//   shouldComponentUpdate(nextProps, nextState) {
//     if (
//       this.state.markerPosition.lat !== this.props.center.lat ||
//       this.state.address !== nextState.address
//     ) {
//       return true;
//     } else if (this.props.center.lat === nextProps.center.lat) {
//       return false;
//     }
//   };
  /**
  * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {};
  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };



  // Get all the users the current user3 is following
  getFollowedUsers = async () => {
    let users = [];
    await this.firestoreFollowingRef.get().then((querySnapshot) => {
      querySnapshot.forEach((docSnap) => {
        users.push(docSnap.id);
      });
      // this.setState({followedUsers: users});
    });
    this.setState({ followedUsers: users });
    // console.log(this.state.followedUsers);
  };


  getFollowingPosts = async () => {
    // 1. Get all the users the current user3 is following
    await this.getFollowedUsers().then(async () => {
      // console.log(this.state.followedUsers);

      let users = this.state.followedUsers;
      let allPosts = [];

      // 2. Get posts of each user3 seperately and putting them in one array.
      //  users.forEach(async (user3) => {
      for (const user of users) {
        await this.getProfilePic(user).then(async () => {
          console.log("Avatar:" + this.state.avatar);
          await this.firestoreUsersRef
            .doc(user)
            .get()
            .then(async (document) => {
              this.setState({ userData: document.data() });

              console.log(document.data());
              await this.firestorePostRef
                .doc(user)
                .collection("userPosts")
                .orderBy("time", "desc")
                .get()
                .then((snapshot) => {
                  snapshot.forEach((doc) => {
                    let article = {
                      username: this.state.userData.username,
                      userId: user,
                      title: "post",
                      avatar: this.state.avatar,
                      image: doc.data().image,
                      cta: "cta",
                      caption: doc.data().caption,
                      location: doc.data().location.coordinates,
                      postId: doc.data().postId,
                      timeStamp: doc.data().time,
                      // likes:0,
                      // horizontal: true
                    };
                    allPosts.push(article);
                  });
                });

              this.setState({ posts: allPosts });
            });
        });
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
        alert(error);
      });
  };

  getUserLocation = () => {
    let lastSeen = "";
    let latitude = 0;
    let longitude = 0;

    lastSeen = this.state.userData.location.lastSeen;
    latitude = this.state.userData.location.latitude;
    longitude = this.state.userData.location.longitude;

    this.setState({
      userLastSeen: lastSeen,
      userLatitude: latitude,
      userLongitude: longitude,
    });

    console.log(lastSeen);
  };

  markerImage = () => {
    // let mImage= this.state.
    // this.setState({ markerImage: mImage});

    this.getProfilePic(this.state.user);
  };

  showMyLoc = () => {
    this.setState({ showMyLoc: true });
  };

  hideMyLoc = () => {
    this.setState({ showMyLoc: false });
  };

  getHeatMapData = () => {
    let data = [];
    let postTag = [];
    let posts = this.state.posts;
    posts.forEach((post) => {
      let point = new google.maps.LatLng(post.location.lat, post.location.lng);
      data.push(point);
      postTag.push(post.postId);
    });
    this.setState({ heatMapData: data, postId: postTag });
    console.log(this.state.heatMapData);
    console.log("oioioioio");
    // console.log(this.state.userData.location.lastSeen);
    console.log(data);
    console.log(this.state.postId);
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  render() {
    const { marks } = this.state;
    // let postmodal = false;
    // let postmodalval = 0;

    // const mapOptions = {
    //   styles: [
    //     {
    //       featureType: "all",
    //       elementType: "all",
    //       stylers: [
    //         { invert_lightness: true },
    //         { saturation: "-9" },
    //         { lightness: "0" },
    //         { visibility: "simplified" },
    //       ],
    //     },
    //     {
    //       featureType: "landscape.man_made",
    //       elementType: "all",
    //       stylers: [{ weight: "1.00" }],
    //     },
    //     {
    //       featureType: "road.highway",
    //       elementType: "all",
    //       stylers: [{ weight: "0.49" }],
    //     },
    //     {
    //       featureType: "road.highway",
    //       elementType: "labels",
    //       stylers: [
    //         { visibility: "on" },
    //         { weight: "0.01" },
    //         { lightness: "-7" },
    //         { saturation: "-35" },
    //       ],
    //     },
    //     {
    //       featureType: "road.highway",
    //       elementType: "labels.text",
    //       stylers: [{ visibility: "on" }],
    //     },
    //     {
    //       featureType: "road.highway",
    //       elementType: "labels.text.stroke",
    //       stylers: [{ visibility: "off" }],
    //     },
    //     {
    //       featureType: "road.highway",
    //       elementType: "labels.icon",
    //       stylers: [{ visibility: "on" }],
    //     },
    //   ],
    // };

    const MapWrapper = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          // styles={{
          //   elementType: "geometry",
          //   stylers: [
          //     {
          //       featureType: "all",
          //       elementType: "all",
          //       stylers: [
          //         { invert_lightness: true },
          //         { saturation: "-9" },
          //         { lightness: "0" },
          //         { visibility: "simplified" },
          //       ],
          //     },
          //     {
          //       featureType: "landscape.man_made",
          //       elementType: "all",
          //       stylers: [{ weight: "1.00" }],
          //     },
          //     {
          //       featureType: "road.highway",
          //       elementType: "all",
          //       stylers: [{ weight: "0.49" }],
          //     },
          //     {
          //       featureType: "road.highway",
          //       elementType: "labels",
          //       stylers: [
          //         { visibility: "on" },
          //         { weight: "0.01" },
          //         { lightness: "-7" },
          //         { saturation: "-35" },
          //       ],
          //     },
          //     {
          //       featureType: "road.highway",
          //       elementType: "labels.text",
          //       stylers: [{ visibility: "on" }],
          //     },
          //     {
          //       featureType: "road.highway",
          //       elementType: "labels.text.stroke",
          //       stylers: [{ visibility: "off" }],
          //     },
          //     {
          //       featureType: "road.highway",
          //       elementType: "labels.icon",
          //       stylers: [{ visibility: "on" }],
          //     },
          //   ],
          // }}
          
          defaultZoom={8}
          // defaultCenter={{ lat: 33.738045, lng: 73.084488 }}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
          getClickableIcons={true}
          // options={mapOptions}
          defaultOptions={{
            styles: [
              {
                featureType: "all",
                elementType: "all",
                stylers: [
                  { invert_lightness: true },
                  { saturation: "-9" },
                  { lightness: "0" },
                  { visibility: "simplified" },
                ],
              },
              {
                featureType: "landscape.man_made",
                elementType: "all",
                stylers: [{ weight: "1.00" }],
              },
              {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{ weight: "0.49" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels",
                stylers: [
                  { visibility: "on" },
                  { weight: "0.01" },
                  { lightness: "-7" },
                  { saturation: "-35" },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text",
                stylers: [{ visibility: "on" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.stroke",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.icon",
                stylers: [{ visibility: "on" }],
              },
            ],

            scrollwheel: false,
            streetViewControl: false,
            disableDoubleClickZoom: false,
            // ,mapTypeId: google.maps.MapTypeId.TERRAIN
            // ,mapTypeId: google.maps.MapTypeId.ROADMAP

            // new stuff -->
            panControl: true,
            mapTypeControl: true,
            panControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER,
            },
            zoomControl: true,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.LARGE,
              position: google.maps.ControlPosition.RIGHT_CENTER,
            },
            scaleControl: false,
            streetViewControl: false,
            streetViewControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER,
            },
          }}
        >

{/* For Auto complete Search Box */}
<Autocomplete
                      controlPosition={google.maps.ControlPosition.TOP}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `100%`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />

          {/* <SearchBox
            // ref={props.onSearchBoxMounted}
            // bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP}
            // // onPlacesChanged={props.onPlacesChanged}
            // onPlaceSelected={props.onPlaceSelected}
            // onPlacesChanged={props.onPlaceSelected}
            // // onPlaceSelected={this.onPlaceSelected}
            // types={["(regions)"]}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}

          >
            <input
              type="text"
              placeholder="Enter a location"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            />
          </SearchBox> */}


          
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
              
            }}
          />
          <Marker />

          {/* InfoWindow on top of marker */}
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>






          {this.state.showMyLoc ? (





<InfoWindow
 onClick={() => {
  this.hideMyLoc();
}}
onClose={this.onInfoWindowClose}

position={{ lat: props.getUserLat  + 0.0018, lng: props.getUserLong }}
>
<div>
                <img
                  height="50"
                  width="50"
                  alt="..."
                  className="avatar"
                  src={this.state.avatar}
                  
                />
                <pre>
                {props.getUserLocation}</pre>
              </div>
</InfoWindow>





                   ) : null}

          {props.heatMapData.map((mark, index) => (
            <Marker
              onClick={() => {
                console.log(
                  mark +
                    "\n" +
                    props.postId[index] +
                    "\n" +
                    props.posts[index] +
                    // "\nmeat\n" +
                    // props.posts.post +
                    // "\nnope\n" +
                    // postmodal +
                    // "\nindex number:\n" +
                    // postmodalval +
                    "\n" +
                    this.state.posts[index]
                );
                //  postmodal = true;
                //  postmodalval= index;
                this.setState({ defaultModal: true });
                this.setState({ modalItem: this.state.posts[index] });
              }}
              position={mark}
              title="Clickable marker"
              animation="drop"
              // animation={new google.maps.Animation}
            ></Marker>
          ))}

          <HeatmapLayer
            options={
              { radius: 120 }
              //   ,{ opacity: 1 },
              // { maxIntensity: 200 },
              // { //   gradient: [
              //     "rgba(0, 255, 255, 0)",
              //     "rgba(0, 255, 255, 1)",
              //     "rgba(0, 191, 255, 1)",
              //     "rgba(0, 127, 255, 1)",
              //     "rgba(0, 63, 255, 1)",
              //     "rgba(0, 0, 255, 1)",
              //     "rgba(0, 0, 223, 1)",
              //     "rgba(0, 0, 191, 1)",
              //     "rgba(0, 0, 159, 1)",
              //     "rgba(0, 0, 127, 1)",
              //     "rgba(0, 0, 127, 1)",
              //     "rgba(63, 0, 91, 1)",
              //     "rgba(127, 0, 63, 1)",
              //     "rgba(191, 0, 31, 1)",
              //     "rgba(255, 0, 0, 1)"
              //   ]
              // }
            }
            data={props.heatMapData}
          />
          {/* <TrafficLayer   onLoad={onLoad}/> */}
        </GoogleMap>
      ))
    );

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
          <section className="section mt--300">
            <Container className="mt--200 pb-5" fluid>
              <Jumbotron  fluid body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <Container fluid>
                  <h1 className="display-3 text-white">Reactive Maps</h1>
                  <p className="lead text-white">View your friend's posts on the map.</p>
                  <Button
                    outline
                    color="info"
                    onClick={() => {
                      this.showMyLoc();
                    }}
                  >
                    Show my location!
                  </Button>{" "}
                </Container>
              </Jumbotron>
              <Row>
                {/* <div className="col">
                  <Card className="mt--3">
                    <div>
                      <Autocomplete
                        style={{
                          width: "100%",
                          height: "40px",
                          paddingLeft: "16px",
                          marginTop: "2px",
                          marginBottom: "100px"
                        }}
                        onPlaceSelected={this.onPlaceSelected}
                        types={["(regions)"]}
                      />
                    </div>
                  </Card>
                </div> */}
                <div className="col">
                  <Card className="shadow border-0 shadow">
                    <MapWrapper
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3jftuRYj7vJ5cB-HGvzq6fC60WXOCtoM&libraries=visualization,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      heatMapData={this.state.heatMapData}
                      // onMapClick={this.displayMarkers}
                      // onClick={this.displayMarkers}
                      // onMarkerClick={()=>this.onMarkClick}
                      // marks={marks}
                      // onChange={this.onChange()}
                      // postModal={this.postModal}
                      markerImage={this.state.markerImage}
                      getUserLocation={this.state.userLastSeen}
                      getUserLat={this.state.userLatitude}
                      getUserLong={this.state.userLongitude}
                      onPlacesChanged={this.onPlacesChanged}
                      onPlaceSelected={this.onPlaceSelected}
                      posts={this.state.posts}
                      postId={this.state.postId}
                      containerElement={
                        <div
                          style={{ height: `600px` }}
                          className="map-canvas"
                          id="map-canvas"
                        />
                      }
                      mapElement={
                        <div style={{ height: `100%`, borderRadius: "on" }} />
                      }
                    />
                  </Card>
                </div>
              </Row>
            </Container>
          </section>
        </main>

        <Modal fluid
          size="lg"
          isOpen={this.state.defaultModal}
          toggle={() => this.toggleModal("defaultModal")}
        >
          {this.state.modalItem && <Post item={this.state.modalItem} />}
        </Modal>

        {/* onClick={() =>{
                                  console.log(post);
                                  this.setState({modalItem: post})
                                  this.setState({defaultModal:true})
                                  }} */}

        {/* {this.state.hover 
   ? <InfoBox 
      onClick={()=>{this.setPinAsCenter({
                      lat: this.state.lat, 
                      lng: this.state.lng
              })}
      lat={this.state.lat}
      lng={this.state.lng}
      facility={this.state.facility}
  : null
} */}
      </>
    );
  }
}

export default location;
