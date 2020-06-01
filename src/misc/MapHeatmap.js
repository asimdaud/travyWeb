// /*global google*/


// import React from 'react'
// import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, HeatmapLayer } from "react-google-maps";
// import Autocomplete from 'react-google-autocomplete';
// import Geocode from "react-geocode";
// import { firebase } from "../../services/firebase";
// import Post from "../../components/post";


// Geocode.setApiKey("AIzaSyC3jftuRYj7vJ5cB-HGvzq6fC60WXOCtoM");
// Geocode.enableDebug();

// const userId = JSON.parse(localStorage.getItem("uid"));


// class MapHeatmap extends React.Component{

//     firestoreUsersRef = firebase.firestore().collection("users");
//     firestorePostRef = firebase.firestore().collection("posts");
//     firestoreFollowingRef = firebase
//       .firestore()
//       .collection("following")
//       .doc(userId)
//       .collection("userFollowing");

// constructor( props ){
//   super( props );
//   this.state = {
//    address: '',
//    city: '',
//    area: '',
//    state: '',
//    followedUsers: [],
//    user: JSON.parse(localStorage.getItem("uid")),
//    posts: [],
//    heatMapData: [],
//    postId: [],
//    mapPosition: {
//     lat: this.props.center.lat,
//     lng: this.props.center.lng
//    },
//    markerPosition: {
//     lat: this.props.center.lat,
//     lng: this.props.center.lng
// }
//   }
//  }
// /**
//   * Get the current address from the default map position and set those values in the state
//   */
//  componentDidMount() {
//   Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
//    response => {
//     const address = response.results[0].formatted_address,
//      addressArray =  response.results[0].address_components,
//      city = this.getCity( addressArray ),
//      area = this.getArea( addressArray ),
//      state = this.getState( addressArray );
  
//     console.log( 'city', city, area, state );
  
//     this.setState( {
//      address: ( address ) ? address : '',
//      area: ( area ) ? area : '',
//      city: ( city ) ? city : '',
//      state: ( state ) ? state : '',
//     } )
//    },
//    error => {
//     console.error(error);
//    }
//   );
//  };
// /**
//   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
//   *
//   * @param nextProps
//   * @param nextState
//   * @return {boolean}
//   */
//  shouldComponentUpdate( nextProps, nextState ){
//   if (
//    this.state.markerPosition.lat !== this.props.center.lat ||
//    this.state.address !== nextState.address ||
//    this.state.city !== nextState.city ||
//    this.state.area !== nextState.area ||
//    this.state.state !== nextState.state
//   ) {
//    return true
//   } else if ( this.props.center.lat === nextProps.center.lat ){
//    return false
//   }
//  }
// /**
//   * Get the city and set the city input value to the one selected
//   *
//   * @param addressArray
//   * @return {string}
//   */
//  getCity = ( addressArray ) => {
//   let city = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
//     city = addressArray[ i ].long_name;
//     return city;
//    }
//   }
//  };
// /**
//   * Get the area and set the area input value to the one selected
//   *
//   * @param addressArray
//   * @return {string}
//   */
//  getArea = ( addressArray ) => {
//   let area = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    if ( addressArray[ i ].types[0]  ) {
//     for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
//      if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
//       area = addressArray[ i ].long_name;
//       return area;
//      }
//     }
//    }
//   }
//  };
// /**
//   * Get the address and set the address input value to the one selected
//   *
//   * @param addressArray
//   * @return {string}
//   */
//  getState = ( addressArray ) => {
//   let state = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    for( let i = 0; i < addressArray.length; i++ ) {
//     if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
//      state = addressArray[ i ].long_name;
//      return state;
//     }
//    }
//   }
//  };
// /**
//   * And function for city,state and address input
//   * @param event
//   */
//  onChange = ( event ) => {
//   this.setState({ [event.target.name]: event.target.value });
//  };
// /**
//   * This Event triggers when the marker window is closed
//   *
//   * @param event
//   */
//  onInfoWindowClose = ( event ) => {
// };
// /**
//   * When the user types an address in the search box
//   * @param place
//   */
//  onPlaceSelected = ( place ) => {
// const address = place.formatted_address,
//    addressArray =  place.address_components,
//    city = this.getCity( addressArray ),
//    area = this.getArea( addressArray ),
//    state = this.getState( addressArray ),
//    latValue = place.geometry.location.lat(),
//    lngValue = place.geometry.location.lng();
// // Set these values in the state.
//   this.setState({
//    address: ( address ) ? address : '',
//    area: ( area ) ? area : '',
//    city: ( city ) ? city : '',
//    state: ( state ) ? state : '',
//    markerPosition: {
//     lat: latValue,
//     lng: lngValue
//    },
//    mapPosition: {
//     lat: latValue,
//     lng: lngValue
//    },
//   })
//  };
// /**
//   * When the marker is dragged you get the lat and long using the functions available from event object.
//   * Use geocode to get the address, city, area and state from the lat and lng positions.
//   * And then set those values in the state.
//   *
//   * @param event
//   */
//  onMarkerDragEnd = ( event ) => {
//   console.log( 'event', event );
//   let newLat = event.latLng.lat(),
//    newLng = event.latLng.lng(),
//    addressArray = [];
// Geocode.fromLatLng( newLat , newLng ).then(
//    response => {
//     const address = response.results[0].formatted_address,
//      addressArray =  response.results[0].address_components,
//      city = this.getCity( addressArray ),
//      area = this.getArea( addressArray ),
//      state = this.getState( addressArray );
// this.setState( {
//      address: ( address ) ? address : '',
//      area: ( area ) ? area : '',
//      city: ( city ) ? city : '',
//      state: ( state ) ? state : ''
//     } )
//    },
//    error => {
//     console.error(error);
//    }
//   );
//  };
 


//  getHeatMapData = () => {
//     let data = [];
//     let postTag = [];
//     let posts = this.state.posts;
//     posts.forEach(post => {
//       let point = new google.maps.LatLng(post.location.lat, post.location.lng);
//       data.push(point);
//       postTag.push(post.postId);
//     });
//     this.setState({ heatMapData: data, postId: postTag });
//   };

//   getFollowingPosts = async () => {
//     // 1. Get all the users the current user3 is following
//     await this.getFollowedUsers().then(async () => {
//       // console.log(this.state.followedUsers);

//       let users = this.state.followedUsers;
//       let allPosts = [];

//       // 2. Get posts of each user3 seperately and putting them in one array.
//       //  users.forEach(async (user3) => {
//       for (const user of users) {
//         await this.getProfilePic(user).then(async () => {
 
//           await this.firestoreUsersRef
//             .doc(user)
//             .get()
//             .then(async document => {
//               this.setState({ userData: document.data() });
//              await this.firestorePostRef
//                 .doc(user)
//                 .collection("userPosts")
//                 .orderBy("time", "desc")
//                 .get()
//                 .then(snapshot => {
//                   snapshot.forEach(doc => {
//                     let article = {
//                       username: this.state.userData.username,
//                       userId: user,
//                       title: "post",
//                       avatar: this.state.avatar,
//                       image: doc.data().image,
//                       cta: "cta",
//                       caption: doc.data().caption,
//                       location: doc.data().location.coordinates,
//                       postId: doc.data().postId,
//                       timeStamp: doc.data().time
//                     };
//                     allPosts.push(article);
//                   });
//                 });

//               this.setState({ posts: allPosts });
//             });
//         });
//       }
//     });
//   };

//   getFollowedUsers = async () => {
//     let users = [];
//     await this.firestoreFollowingRef.get().then(querySnapshot => {
//       querySnapshot.forEach(docSnap => {
//         users.push(docSnap.id);
//       });
//     });
//     this.setState({ followedUsers: users });
//   };


//   componentWillMount = () => {
    
//     this.getFollowingPosts().then(() => {
//       this.getHeatMapData();
//     //   this.getUserLocation();

//     });
//   };

// render(){
// const AsyncMap = withScriptjs(
//    withGoogleMap(
//     props => (
//      <GoogleMap google={this.props.google}
//       defaultZoom={this.props.zoom}
//       defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
//       styles={this.props.styles}
//       options={this.props.options}
//      >
//       {/* For Auto complete Search Box */}
//       <Autocomplete
//        style={{
//         width: '100%',
//         height: '40px',
//         paddingLeft: '16px',
//         marginTop: '2px',
//         marginBottom: '100px'
//        }}
//        onPlaceSelected={ this.onPlaceSelected }
//        types={['(regions)']}
//       />
// {/*Marker*/}
//       {/* <Marker google={this.props.google}
//        name={'Dolores park'}
//           draggable={true}
//           onDragEnd={ this.onMarkerDragEnd }
//              position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
//       />
//       <Marker /> */}

//       {props.heatMapData.map((mark, index) => (
//             <Marker
//               onClick={() => {
//                 console.log(
//                   mark +
//                     "\n" +
//                     props.postId[index] +
//                     "\n" +
//                     props.posts[index] +
//                     // "\nmeat\n" +
//                     // props.posts.post +
//                     // "\nnope\n" +
//                     // postmodal +
//                     // "\nindex number:\n" +
//                     // postmodalval +
//                     "\n" +
//                     this.state.posts[index]
//                 );
//                 //  postmodal = true;
//                 //  postmodalval= index;
//                 this.setState({ defaultModal: true });
//                 this.setState({ modalItem: this.state.posts[index] });
//               }}
//               position={mark}
//               title="Clickable marker"
//               animation="drop"
//               // animation={new google.maps.Animation}
//             ></Marker>
//           ))}

// <HeatmapLayer
//             options={
//               { radius: 120 }
//               //   ,{ opacity: 1 },
//               // { maxIntensity: 200 },
//               // { //   gradient: [
//               //     "rgba(0, 255, 255, 0)",
//               //     "rgba(0, 255, 255, 1)",
//               //     "rgba(0, 191, 255, 1)",
//               //     "rgba(0, 127, 255, 1)",
//               //     "rgba(0, 63, 255, 1)",
//               //     "rgba(0, 0, 255, 1)",
//               //     "rgba(0, 0, 223, 1)",
//               //     "rgba(0, 0, 191, 1)",
//               //     "rgba(0, 0, 159, 1)",
//               //     "rgba(0, 0, 127, 1)",
//               //     "rgba(0, 0, 127, 1)",
//               //     "rgba(63, 0, 91, 1)",
//               //     "rgba(127, 0, 63, 1)",
//               //     "rgba(191, 0, 31, 1)",
//               //     "rgba(255, 0, 0, 1)"
//               //   ]
//               // }
//             }
//             data={props.heatMapData}
//           />



// {/* InfoWindow on top of marker */}
//       <InfoWindow
//        onClose={this.onInfoWindowClose}
//        position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
//       >
//        <div>
//         <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
//        </div>
//       </InfoWindow>
// </GoogleMap>
// )
//    )
//   );
// let map;
//   if( this.props.center.lat !== undefined ) {
//    map = <div>
//           <AsyncMap
//                     heatMapData={this.state.heatMapData}
//                       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC3jftuRYj7vJ5cB-HGvzq6fC60WXOCtoM&libraries=visualization,places"
//                       loadingElement={
//        <div style={{ height: `100%` }} />
//       }
//       containerElement={
//        <div style={{ height: this.props.height }} />
//       }
//       mapElement={
//        <div style={{ height: `100%` }} />
//       }
//      />
//     </div>
// } else {
//    map = <div style={{height: this.props.height}} />
//   }
//   return( map )
//  }
// }
// export default MapHeatmap