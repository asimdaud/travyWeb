import React, { Component } from "react";
import Map from "./Map";
import mapStyle from "./customMap";
import { Card, Container, Row, Modal, Button } from "reactstrap";
import UserNavbar from "components/Navbars/UserNavbar.jsx";

class Location2 extends Component {
  render() {
    const mapOptions = {
      styles: [
        {
          featureType: "all",
          elementType: "all",
		  stylers:
		   [            {              invert_lightness: true,            },           {              saturation: "-9",            },            {              lightness: "0",            },            {              visibility: "simplified",            },          ],        },        {          featureType: "landscape.man_made",          elementType: "all",          stylers: [            {              weight: "1.00",            },          ],        },        {          featureType: "road.highway",          elementType: "all",          stylers: [            {              weight: "0.49",            },          ],        },        {          featureType: "road.highway",          elementType: "labels",          stylers: [            {              visibility: "on",            },            {              weight: "0.01",            },            {              lightness: "-7",            },            {              saturation: "-35",            },          ],        },        {          featureType: "road.highway",          elementType: "labels.text",          stylers: [            {              visibility: "on",            },          ],        },        {          featureType: "road.highway",          elementType: "labels.text.stroke",          stylers: [            {              visibility: "off",            },          ],        },        {          featureType: "road.highway",          elementType: "labels.icon",          stylers: [            {              visibility: "on",            },          ],        },      ],    };

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
          <section className="section mt--200">
            <Container className="mt--8 pb-5" fluid>
              <Row>
                <div className="col">
                  <Card className="shadow border-0 shadow mt--300">
                    <div style={{ margin: "100px" }}>
                      <Map
                        google={this.props.google}
                        center={{ lat: 33.6844, lng: 73.0479 }}
                        height="300px"
                        zoom={15}
                        // style={this.props.mapStyle}
                        options={mapOptions}
                      />
                    </div>
                  </Card>
                </div>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Location2;
