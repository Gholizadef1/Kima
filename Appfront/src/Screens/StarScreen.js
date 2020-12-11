// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity
// } from 'react-native';
// import axiosinst from '../api/axiosinst'
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export default class StarScreen extends Component {

// constructor(props){
//   super(props);
//   this.state={
//     Default_Rating:0,
//     Max_rating:5
//   }
//   this.star="http://reactapp.ir/wp-content/uploads/full_star.png";
//   this.star_with_border="http://reactapp.ir/wp-content/uploads/border_star.png";
// }
//  PostRating = async(value)=>{
//    console.log('&&')
//   if(value!=""){
//   const payload={
//       "Rate": value,
//   }
//   const back= JSON.stringify(payload);
//   axios.post('http://f9878e5c6e68.ngrok.io/api/bookrating/'+this.props.bookid,back,{
//     "headers":{"content-type":"application/json",
//     "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
//             }
//             })
//   .then(async function(response){
//     console.log(response.data+'@@@')
//     console.log('\n'+'++++++++'+'\n')
//   })
//   .catch(function (error) {
//      console.log(error);
//   });
// }
// }
// UpdateRating(key){
//   console.log('___')
//   this.setState({Default_Rating:key})
//   this.PostRating(this.state.Default_Rating)
// }
//   render() {

//     console.log(this.props.bookid +'****')
//     let React_Native_Rating_Bar=[];
//     for(var i=1;i<=this.state.Max_rating;i++)
//     {
//       console.log(i+'**')
//       React_Native_Rating_Bar.push(

//         <TouchableOpacity
        
//           key={i}
//           activeOpacity={0.7}
//           onPress={console.log('%')}
//           >
//           <Image
//             style={styles.ImageStyle}
//             source={(i<=this.state.Default_Rating)?{uri:this.star}:{uri:this.star_with_border}}
//             />
//         </TouchableOpacity>
                            
//       )
//       console.log('+++++')
//     }

//     console.log('+++++')
// //    console.log(this.state.Default_Rating+'+++++++')


//     return (
      

//       <View style={styles.container}>

//         <View style={styles.childView}>
//           {React_Native_Rating_Bar}
//         </View>
//         {/* <Text style={styles.textStyle}>
//           {this.state.Default_Rating}/{this.state.Max_rating}
//         </Text> */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',

//   },
//   ImageStyle:{
//     width:40,
//     height:30,
//     resizeMode:'cover'
//   },
//   childView:{
//     flexDirection:'row',
//     justifyContent:'center'
//   },
//   textStyle:{
//     textAlign:'center',
//     fontSize:23,
//     color:'#000',
//     marginTop:15
//   }
// });
