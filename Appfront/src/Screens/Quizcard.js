import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert, ScrollView, Modal } from 'react-native';
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
  const [senoghte, setsenoghte] = useState(false)
  const [kamshodde, setkamshodde] = useState();
  const [kamshodde2, setkamshodde2] = useState();
  const [comment4,setcomment4]=useState();
  const [linenumber,setlinenumber]=useState();
 
  useEffect(()=>{
    var commentt = `${prop.discription}`.toString();
    var linenumberr = (commentt.split('').length)
    console.log(linenumberr+" prop discription")
    var commenttt = `${prop.discription}`.toString().split('');
    var comment42 = '';

  if (linenumberr > 250) {
    for (let i = 0; i < 250; i++)
      comment42 += commenttt[i]
    // console.log(comment4+'  COMMENT4 FOR')
  }
  else {
    console.log("in jaaa;slkfd;alskjdf")
    comment42 = prop.discription

  }
  setlinenumber(linenumberr)
  setcomment4(comment42)

  var kamshode = "";
  var a = prop.title.toString();
  var b = a.lenght;
  for (var i = 0; i <= 18; i++) {
    if (a[i] != undefined) {
      kamshode += a[i]
      // console.log(kamshode);
    }
  }

  if (a === kamshode) {
    //  setsenoghte(false)
  }
  else {
    //setsenoghte(true);
    kamshode += "..."
  }
  setkamshodde(kamshode);
}, [])
  return (

    <View>

      <View style={styles.avatarname}>

        <TouchableOpacity style={styles.avatar}
          onPress={() => { }}>
          {prop.quizphoto === '/media/default.png' ? <ImageBackground borderRadius={100}

            source={require('../../assets/quizz.png')}
            style={{
              height: hp('8%'),
              width: wp('16%'),
              borderRadius: 100,
              position: 'absolute'
              //,borderColor:'#1f7a8c'
              // ,borderWidth:wp('0.3%'),
            }}

          >

          </ImageBackground> : <ImageBackground borderRadius={100}

            source={{ uri:"http://cabc8a571308.ngrok.io/media/quiz_photos/test_iS65hkA.jpg"}}
            style={styles.avatar}

          >

            </ImageBackground>}
        </TouchableOpacity>

        <Text style={styles.username}>{kamshodde}</Text>

        {/* {prop.isowner?<Text style={styles.yourgroup}>#گروه شما</Text>:null} */}
        <Text style={styles.date}><Text style={{ color: 'gray', fontSize: hp("1.3.9%") }}>تعداد سوال : </Text>{prop.membernumber}</Text>


        {/* <TouchableOpacity
     onPress={async()=>{
        await prop.seeresul(true);
        setTimeout(()=>prop.seeresul(false),2000)
     }}
            style={{backgroundColor:"#B7E4C7",height:hp("4.5%"),bottom:hp("1.7%"),marginTop:hp("0%"),width:wp("18%"),borderRadius:50,left:wp("68.5%"),marginBottom:hp("0%"),alignSelf:"flex-end"}}
            >
            <Text style={{fontSize:hp("1.5.5%"),color:"#1f7a8c",fontWeight:"bold",alignSelf:"center",marginTop:hp("1.1%")}}>پاسخ ها</Text>
            </TouchableOpacity> */}
      </View>

      <View style={{ flexDirection: 'row' }}>

        <View style={styles.comment}>

          <Text style={{ fontSize: hp('1.6%'), fontWeight: 'bold', color: 'lightblue', marginBottom: hp('2%'), marginTop: hp('-1%'), marginHorizontal: wp("0%") }}>#<Text style={{ color: "#1f7a8c" }}> سازنده : {prop.creator.username}</Text>  </Text>
          {!more ? <Text style={{ color: 'black' }}>{comment4}</Text> : <Text style={{ color: 'black' }}>{comment4}</Text>}
          {linenumber >= 250 ? <TouchableOpacity

            onPress={async () => {

              if (more === false) {
                setmore(true)
                setshowmore('کم تر')

              }
              else {
                setmore(false)
                setshowmore('بیشتر...')
              }
            }}
            style={{ marginTop: hp('1%'), left: wp('75%') }}
          ><Text style={{ color: '#1f7a8c' }}>{showmore}</Text>
          </TouchableOpacity> : null}
        </View>


        {/* </Card> */}
      </View>

      <Image
        source={require('../../assets/line2.png')}
        style={{ width: wp('100%'), height: hp("0.1%") }}
      ></Image>
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
  yourgroup: {
    position: 'absolute',
    marginLeft: wp('74%'),
    marginTop: hp('1%'),
    color: '#1f7a8c',
    fontSize: hp('1.5%'),
    // fontWeight:'bold'
  },
  username: {
    position: 'absolute',
    marginTop: hp("1.3%"),
    left: wp('20%'),
    fontSize: hp('1.7%'),
    fontWeight: 'bold'


  },
  comment: {

    marginBottom: hp('2%'),
    marginTop: hp('2%'),
    marginRight: wp("5%"),
    marginLeft: wp('5%'),
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
    marginTop: hp("4.2%"),
    marginLeft: wp("20%"),
    fontSize: hp("1.5%"),
    color: '#1f7a8c'
  },
  avatarname: {
    marginTop: hp('2.4%'),
    marginLeft: wp('5%'),
    flexDirection: 'row',

    width: wp('50%'),
    height: hp("7.9%"),
    borderRadius: 100
  },

});
export default Eachgroup;