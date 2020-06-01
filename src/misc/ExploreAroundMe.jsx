  
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    ActivityIndicator,
    RefreshControl
} from "react-native";
import Icon from '../components/Icon';
import Category from '../components/Category';
import PlaceCard from "../components/PlaceCard";

import * as firebase from 'firebase';

import {key} from '../../googleAPIKey';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { Images } from '../constants';
import { FlatList } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window')
class Explore extends Component {
    user = firebase.auth().currentUser;
    firestoreUsersRef = firebase.firestore().collection("users");
    firestorePostRef = firebase.firestore().collection("posts");
    firestoreFollowingRef = firebase.firestore().collection("following").doc(this.user.uid)
    .collection("userFollowing");

    state = {
        places: [],
        refreshing: false,
        currentLocation: {},
        placeType: 'tourist_attraction'
        
      };  

    componentWillMount() {
        // this.startHeaderHeight = 80
        // if (Platform.OS == 'android') {
        //     this.startHeaderHeight = 100 + StatusBar.currentHeight
        // }
        this.getCurrentLocation().then(()=>{
            this.getPlaces();
        })
    }

    
getCurrentLocation = async()=>{
    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if (status !== 'granted') {
    //   this.setState({
    //     errorMessage: 'Permission to access location was denied',
    //   });
    // }
  
    let location = await Location.getCurrentPositionAsync({});
    let currentLocation = {
            lat: location.coords.latitude,
            long: location.coords.longitude
    }
    
    this.setState({ currentLocation: currentLocation});
    // console.log(this.state.currentLocation);
    
}

getPlacesUrl = (lat, long, radius, type)=> {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    
    const api = `&key=${key}`;
    return `${baseUrl}${location}${typeData}${api}`;
  }



  getPlaces = ()=> {
    const {currentLocation, placeType } = this.state;
    const lat = currentLocation.lat;
    const long = currentLocation.long;
    const markers = [];
    const url = this.getPlacesUrl(lat, long, 15000, placeType);
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(res => {
        //   console.log(res.results);
        res.results.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          marketObj.place_id = element.place_id;
          marketObj.name = element.name;
          marketObj.photos = element.photos;
          marketObj.rating = element.rating;
          marketObj.vicinity = element.vicinity;
          marketObj.marker = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng
          };

          markers.push(marketObj);
        });
        //update our places array
        this.setState({ places: markers });
        // console.log(this.state.places);
      });
  }

  
onRefresh = () => {
    this.setState({refreshing: true});
  
    this.getPlaces().then(() => {
      this.setState({refreshing: false});
    });
  }
  
  getMorePlaces =()=>{}





    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {/* <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: 'white', marginHorizontal: 20,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            marginTop: Platform.OS == 'android' ? 30 : null
                        }}>
                            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Try New Delhi"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />
                        </View>
                    </View> */}
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                        {/* <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                What can we help you find, Varun?
                            </Text>

                            <View style={{ height: 130, marginTop: 20 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <Category imageUri="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"
                                        name="Home"
                                    />
                                    <Category imageUri="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"
                                        name="Experiences"
                                    />
                                    <Category imageUri="https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk"
                                        name="Resturant"
                                    />
                                </ScrollView>
                            </View>
                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    Introducing Airbnb Plus
                                </Text>
                                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                                    A new selection of homes verified for quality & comfort

                                </Text>
                                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={{uri:"https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk" }}
                                    />

                                </View>
                            </View>
                        </View> */}
                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Places around You
                            </Text>
                                {this.state.places.length==0 && <ActivityIndicator size="large" />}
                            <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                onScrollEndDrag={this.getMorePlaces}
                                refreshControl={
                                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                                data={this.state.places}
                                renderItem={({ item}) => (
          
                                <PlaceCard width={width*1.85}
                                    item={item}
                                />
                                    )}
                                    keyExtractor={item => item.id}
                                />
                                {/* <PlaceCard width={width}
                                    name="The Cozy Place"
                                    type="PRIVATE ROOM - 2 BEDS"
                                    price={82}
                                    rating={4}
                                />
                                <PlaceCard width={width}
                                    name="The Cozy Place"
                                    type="PRIVATE ROOM - 2 BEDS"
                                    price={82}
                                    rating={4}
                                />
                                <PlaceCard width={width}
                                    name="The Cozy Place"
                                    type="PRIVATE ROOM - 2 BEDS"
                                    price={82}
                                    rating={4.5}
                                /> */}
                            </View>
                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});