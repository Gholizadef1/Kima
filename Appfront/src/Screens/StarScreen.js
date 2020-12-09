import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class StarScreen extends Component {

constructor(props){
  super(props);
  this.state={
    Default_Rating:0,
    Max_rating:5
  }
  this.star="http://reactapp.ir/wp-content/uploads/full_star.png";
  this.star_with_border="http://reactapp.ir/wp-content/uploads/border_star.png";
}
UpdateRating(key){
  this.setState({Default_Rating:key})
}
  render() {
    let React_Native_Rating_Bar=[];
    for(var i=1;i<=this.state.Max_rating;i++)
    {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          onPress={this.UpdateRating.bind(this,i)}
          >
          <Image
            style={styles.ImageStyle}
            source={(i<=this.state.Default_Rating)?{uri:this.star}:{uri:this.star_with_border}}
            />
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.childView}>
          {React_Native_Rating_Bar}
        </View>
        {/* <Text style={styles.textStyle}>
          {this.state.Default_Rating}/{this.state.Max_rating}
        </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  ImageStyle:{
    width:40,
    height:30,
    resizeMode:'cover'
  },
  childView:{
    flexDirection:'row',
    justifyContent:'center'
  },
  textStyle:{
    textAlign:'center',
    fontSize:23,
    color:'#000',
    marginTop:15
  }
});
