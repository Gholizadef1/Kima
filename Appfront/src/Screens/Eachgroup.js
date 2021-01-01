import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert, ScrollView,Modal } from 'react-native';
//  import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';


const Eachgroup = (prop) => {

  const [more, setmore] = useState(false);
  const [showmore, setshowmore] = useState('بیشتر...');
  const commentt = `${prop.discription}`.toString();
  const linenumber = (commentt.split('').length)
  // console.log(linenumber+'  LINE NUMBER')
  const commenttt = `${prop.discription}`.toString().split('');
  // console.log(commentt)
  // const[comment4,setcomment4]=useState('')
  let comment4 = '';
  if (linenumber > 250) {
    for (let i = 0; i < 250; i++)
          comment4 += commenttt[i]
    // console.log(comment4+'  COMMENT4 FOR')
    // comment4 += commenttt[]
  }
  else {
    comment4 = prop.discription
    // console.log(comment4+'  COMMENT4 ELSE')
  }
  // console.log('****'+comment4)
  // console.log('*****************'+prop.discription+'  prop discription*********************')
 
    return(
      
      <View>
      {/* {prop.discription!='' ? (<View > */}
          <View style={styles.avatarname}>
     
     <TouchableOpacity style={styles.avatar}
       onPress={() => { }}>
       {prop.groupphoto === 'http://505a2dd8d5cc.ngrok.io/media/default.png' ? <ImageBackground borderRadius={100}

         source={require('../../assets/group.jpg')}
         style={ { height: hp('8%'),
        width: wp('16%'),
         borderRadius: 100,
        position: 'absolute',borderColor:'#1f7a8c'
        ,borderWidth:wp('0.3%'),
        // borderBottomColor:'red',borderBottomWidth:2,borderRightWidth:2,borderRightColor:'green'
        }}

       >

       </ImageBackground> : <ImageBackground borderRadius={100}

         source={{uri:prop.groupphoto}}
         style={styles.avatar}

       >

         </ImageBackground>}
     </TouchableOpacity>
     {/* <Text style={styles.username}><Text>#</Text>{prop.title}</Text> */}

     <Text style={styles.username}>{prop.title}</Text>

     {prop.isowner?<Text style={styles.yourgroup}>#گروه شما</Text>:null}
     <Text style={styles.date}>{prop.membernumber}<Text style={{color:'gray'}}> عضو</Text></Text>


    
   </View>
  
   <View style={{ flexDirection: 'row' }}>

   <View style={styles.comment}>

        {/* <Text style={{color:'black'}}>{prop.discription}</Text> */}
        
        {/* {!more ? <Text>{comment4}</Text> : <Text>{prop.comment}</Text>} */}
        {!more ? <Text style={{color:'black'}}>{comment4}</Text>:<Text style={{color:'black'}}>{prop.discription}</Text>}
        {linenumber>= 250 ? <TouchableOpacity
      
          onPress={async() => {
            // if(likeshode===true)
            // await setlikeshode(false)
            // else
            // await setlikeshode(true)
            if (more === false) {
              setmore(true)
              setshowmore('کم تر')

            }
            else {
              setmore(false)
              setshowmore('بیشتر...')
            }
          }}
          style={{ marginTop:hp('1%'),left:wp('75%')}}
        ><Text style={{ color: '#1f7a8c' }}>{showmore}</Text>
        </TouchableOpacity> : null}
 </View>
 
  
   {/* </Card> */}
 </View>
 
 <Image
     source={require('../../assets/line2.png')}
     style={{ width: wp('100%'), height: 1}}
   ></Image>
            {/* <Text>
                Groups
            </Text> */}
        {/* </View>):(<Text style={{ color: 'blue', alignSelf: 'center', marginTop: hp('30%'),
         fontWeight: 'bold' }}>نقل قولی وجود ندارد</Text>)} */}
         </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    yourgroup:{
      position:'absolute',
      marginLeft:wp('74%'),
      marginTop:hp('1%'),
      color:'#1f7a8c',
      fontSize:hp('1.5%'),
      // fontWeight:'bold'
    },
    username: {
        position: 'absolute',
        marginTop: '5%',
        left: wp('20%'),
        fontSize: hp('1.7%'),
        fontWeight: 'bold'
    
    
      },
      comment: {
    
        marginBottom:hp('2%'),
        marginTop: hp('2%'),
        marginRight: '5%',
        marginLeft: '5%',
      },
      avatar: {
        height: hp('8%'),
        width: wp('16%'),
        borderRadius: 100,
        position: 'absolute',
        // borderColor:'#1f7a8c'
    
      },
      date: {
        position: 'absolute',
        marginTop: '17%',
        left: 80,
        fontSize: 12,
        color: 'gray'
      },
      avatarname: {
        marginTop: '5%',
        marginLeft: '5%',
        flexDirection: 'row',
    
        width: '50%',
        height: 65,
        borderRadius: 100
      },

  });
  export default Eachgroup;