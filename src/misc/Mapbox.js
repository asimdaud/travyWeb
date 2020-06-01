// import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import * as parkDate from "../../data/skateboard-parks.json";

// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   Container,
//   Row,
//   Col,
//   Modal,
// } from "reactstrap";
// // import DemoNavbar from "components/Navbars/DemoNavbar";
// import UserNavbar from "components/Navbars/UserNavbar";
// // import {profilePic} from "../examples/Profile";
// import * as firebase from "firebase";
// import { Link } from "react-router-dom";
// import Interests from "./Interests";

// // const user3 = JSON.parse(localStorage.getItem("uid"));

// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYXNpbWRhdWQiLCJhIjoiY2thaTR3ZHBlMDZ0eDJ4b2R0MzVmczF3dCJ9.2cyTQ4M-y1edGcN_nwmb1g";

// class Mapbox extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: -90,
//       lat: 45,
//       zoom: 13,
//     };
//   }

//   componentDidMount() {
//     // const map = new mapboxgl.Map({
//     //   container: this.mapContainer,
//     //   style: 'mapbox://styles/mapbox/streets-v11',
//     //   center: [this.state.lng, this.state.lat],
//     //   zoom: this.state.zoom
//     // });

//     var map = new mapboxgl.Map({
//       container: this.mapContainer, // HTML container id
//       style: "mapbox://styles/mapbox/streets-v11", // style URL
//       center: [-21.92661562, 64.14356426], // starting position as [lng, lat]
//       zoom: 13,
//     });

//     var popup = new mapboxgl.Popup().setHTML(
//       "<h3>Reykjavik Roasters</h3><p>A good coffee shop</p>"
//     );

//     var marker = new mapboxgl.Marker()
//       .setLngLat([-21.92661562, 64.14356426])
//       .setPopup(popup)
//       .addTo(map);
//   }

//   render() {
//     return (
//       <>
//         <UserNavbar />
//         <main className="profile-page" ref="main">
//           <section className="section-profile-cover section-shaped my-0">
//             {/* Circles background */}
//             <div className="shape shape-style-1 shape-default alpha-4">
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//             </div>
//             {/* SVG separator */}
//             <div className="separator separator-bottom separator-skew">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 preserveAspectRatio="none"
//                 version="1.1"
//                 viewBox="0 0 2560 100"
//                 x="0"
//                 y="0"
//               >
//                 <polygon
//                   className="fill-white"
//                   points="2560 0 2560 100 0 100"
//                 />
//               </svg>
//             </div>
//           </section>
//           {/* Page content */}
//           <section className="section">
//             <Container className="mt--8 pb-5" fluid>
//               <Row>
//                 <div className="col">
//                   <Card className="shadow border-0 shadow mt--900">
//                     <div
//                       ref={(element) => (this.mapContainer = element)}
//                       className="mapContainer"
//                     />
//                   </Card>
//                 </div>
//               </Row>
//             </Container>
//           </section>
//         </main>
//       </>
//     );
//   }
// }

// export default Mapbox;
