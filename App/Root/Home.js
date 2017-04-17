
import React, { Component }  from 'react';

import MapView from 'react-native-maps';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  ScrollView 
} from 'react-native';


var API_URL = 'https://just-get.com/Home/Sellers/?RerquestCategoryId=97&MinLatitude=59.37260860543225&MaxLatitude=59.42800874997488&MinLongitude=24.57352461303708&MaxLongitude=24.76475538696286&pageSize=18&pageNo=0';
import LocationButton from '../Component/LocationButton.js';
var markerImg = require('../images/marker.png');
class Home extends Component {

  constructor() {
    super();
    this.state = {
        dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      region :{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
         markers: [],
         isPortrait: true,
         width : Dimensions.get('window').width,
         height :  Dimensions.get('window').height *2 / 4
      
    };
      this.onRegionChange = this.onRegionChange.bind(this);
      this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
       this.onLayout = this.onLayout.bind(this);
  }

 componentDidMount(){
   navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        });
        alert(position.coords.latitude);
        this.fetchData();
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }

      this.onRegionChange(newRegion);
    });

     
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


   fetchData(){
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({loaded : true,
          markers:responseData.Sellers.map((y) => {
                            return {
                               latlng: {
                                latitude: y.LocationLat,
                                longitude: y.LocationLng
                        },
                             title: y.Name,
                             description: y.AddressLine,
                             sellerId :y.SellerId
                            };
                        })});
        
         
      })
       
       .done();
  }

  onLayout(e){
  var isPortrait = e.nativeEvent.layout.height > e.nativeEvent.layout.width;
  if (isPortrait != this.state.isPortrait) {
    this.setState({isPortrait: isPortrait});
  }

   this.setState({height:Dimensions.get('window').height * 2 / 4});

    this.setState({width:Dimensions.get('window').width});
}

  onRegionChange(region) {
    this.setState({region});
  }

  moveMaptoLocation(latlng, key) {
    this.refs.map.animateToRegion({
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
      ...latlng
    });
    setTimeout(() => { 
      this.refs[key].showCallout();
    }, 1500);
  }

    renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading data...
        </Text>
      </View>
    );
  }

  render() {
       if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
   <View style={[styles.container, {width:this.state.width, height:this.state.height}]} onLayout={this.onLayout}>
        <MapView ref="map" style={{width:this.state.width, height:this.state.height}} region={this.state.region} onRegionChange={this.onRegionChange}>
          {this.state.markers.map((marker, i) => (<MapView.Marker key={i} ref={i} coordinate={marker.latlng} image={markerImg} title={marker.title} description={marker.description}/>))}
        </MapView>
       
        <ScrollView  style={styles.container}>
          {this.state.markers.map((marker, i) => (<LocationButton key={i} name={i} moveMaptoLocation={this.moveMaptoLocation} marker={marker} width={this.state.width}/>))}
        </ScrollView >
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  

  }
  
});


export default Home;