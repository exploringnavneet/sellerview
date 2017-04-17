import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';


export default class LocationButton extends Component {
  render(){
    return (
      <TouchableOpacity style={[styles.button,{width:this.props.width}]} onPress={()=>
        this.props.moveMaptoLocation(this.props.marker.latlng, this.props.name)}>
         <View style={styles.container}>
          <Image
          style={styles.thumbnail}
          source={require('../images/imageleft.gif')}
         />
        <View style={styles.rightContainer}>
        <Text style={styles.title}>{this.props.marker.title}</Text>
         
          <Text style={styles.year}>{this.props.marker.description}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    padding: 2,
    backgroundColor: 'lightgray',
    borderColor: 'black',
    marginBottom:1,
    height:100
  },
   container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom:1,
    padding:2,
    height:50,
    borderColor :'#ddd'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft:20
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingLeft :10,
    color  :'#FF4D5A',

  },
  year: {
    paddingLeft :10,
    textAlign: 'center',
    fontSize:14,
    color:'#000000'

  },
   thumbnail: {
    width: 70,
    height: 50,
  },
});
