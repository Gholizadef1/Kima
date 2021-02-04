import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Title, Form, Item, Input, Button, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Formik, formik } from 'formik';
import * as yup from 'yup';
// import axios from 'axios';
import Home from './Home';
import TabScreen from './TabScreen';
import Axios from 'axios';
// import {creatStore} from 'redux'
// import { Context } from '../context/AuthContext';   
import axiosinst from '../api/axiosinst';
import axios from 'axios';
import AuthContext, { AuthProvider } from '../context/Authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import AppLoading from 'expo-app-loading';
import { Modal } from 'react-native';




const logschema = yup.object({
  Email: yup.string()
    .required("ایمیل شما نمیتواند خالی باشد")
    .min(8, "ایمیل شما باید حداقل 8 کاراکتر باشد")
    .email('فورمت ایمیل شما نادرست است'),

  Password: yup.string()
    .required("رمز عبور شما نمیتواند خالی باشد")
    .min(5, "رمز شما باید حداقل به طول 5 باشد"),

})

const Login = (pro) => {
  const [videoo, setvideoo] = useState();
  const [videoloaded, setvideoloaded] = useState("خوشحالیم دوباره میبینیمت");
  // const { state, signin } = useContext(Context);
  // const { state, signin, clearErrorMessage } = useContext(Context);      
  const val = useContext(AuthContext);

 // setTimeout(() => console.log("aksdjf"), 1000)
  // if (videoloaded === false) {
  //   return (<AppLoading
  //     startAsync={() => {
  //       setvideoo(<Video
  //         source={require('../../assets/authvideo2.mp4')}
  //         rate={1.0}
  //         volume={1.0}
  //         isMuted={false}
  //         resizeMode="cover"
  //         shouldPlay
  //         isLooping
  //         onLoad={() => setvideoloaded(true)}
  //         style={{ width: wp('100%'), height: wp(hp('20%')), position: 'absolute' }}
  //       ></Video>)
  //     }}
  //     onFinish={() => setvideoloaded(false)}
  //     onError={console.warn}
  //   />)
  // }
  // else {
  return (<Container backgroundColor='white'>

    <Video
      source={require('../../assets/authvideo2.mp4')}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      isLooping
      onLoad={() => setTimeout(()=>setvideoloaded("کیما"),3000)
      }
      style={{ width: wp('100%'), height: wp(hp('20%')), position: 'absolute' }}
    ></Video>
    {/* <Modal
    ></Modal> */}
{/* 
  {videoloaded==="کیما"? */}
  <Text style={{ color: '#1f7a8c', fontSize: hp('2.7%'), fontWeight: 'bold', marginTop: hp('9.5%'), marginLeft: wp('10%'), position: 'absolute' }}>کیما</Text>
    {/* <Text style={{ color: '#1f7a8c', fontSize: hp("5%"), fontWeight: 'bold', marginTop: hp('9.5%'),alignSelf:"center", position: 'absolute' }}>به کیما خوش اومدی</Text>} */}
    
    <View style={{ marginTop: hp('12%') }}>

      <Image source={require('../../assets/kima7.jpg')} style={styles.imagee}></Image>
    </View>
    <Formik style={{ borderStyle: 'dashed', justifyContent: 'space-around' }}
      initialValues={{ Email: '', Password: '' }}
      validationSchema={logschema}


      onSubmit={async (values, actions) => {


        const back = {
          email: values.Email,
          password: values.Password,
        }
        const backk = JSON.stringify(back);



        axiosinst.post('/login', backk, { "headers": { "content-type": "application/json", } })


          .then(async function (response) {
            console.log(response.data.userid)
            console.log(response)
            console.log(response.data.token)
            await AsyncStorage.setItem('token', response.data.token)
            await AsyncStorage.setItem('id', response.data.userid.toString())
            // console.log(response)
            // console.log(response.status);
            val.changelogged(true);
            // pro.navigation.navigate('mainFlow');

          })
          .catch(function (error) {
            console.log('....')
            console.log(error);
            Alert.alert('oops', 'ایمیل و یا رمز عبور اشتباه است', [{


              Title: 'فهمیدم', onPress: () => console.log('alert closed')
            }])
            console.log(error);
            console.log(error.status);

          })
        console.log(values);
      }}
    >
      {(props) => (

        <View style={{ alignItems: 'center',  marginTop:hp("17%"),marginHorizontal:wp("4%") }}>
          <Item style={styles.input}>
            <Input autoCapitalize='none' autoCorrect={false} style={styles.Input}
              autoCapitalize='none'
              onChangeText={props.handleChange('Email')}
              value={props.values.Email}
              onBlur={props.handleBlur('Email')}
              placeholder="ایمیل خود را وارد کنید ..." placeholderTextColor='lightgray'>
            </Input>
            <Feather name="mail" size={hp("2.9%")} color="#BFDBF7" style={styles.Icon} />
          </Item>
          <Text style={styles.errorr}>{props.touched.Email && props.errors.Email}</Text>
          <Item style={styles.input}>
            <Input name='passs' style={styles.Input} autoCapitalize='none' autoCorrect={false}
              secureTextEntry
              onChangeText={props.handleChange('Password')}
              value={props.values.Password}
              onBlur={props.handleBlur('Password')}
              placeholder="رمز خود را وارد کنید ..." placeholderTextColor='lightgray'>

            </Input>


            <AntDesign name="lock" size={hp("2.9%")} color="#BFDBF7" style={styles.Icon} />
          </Item>



          <Text style={styles.errorr}>{props.touched.Password && props.errors.Password}</Text>

          <View style={{ flexDirection: 'row', width: wp("99%"), marginHorizontal: wp("4%") }}>



            <TouchableOpacity

              onPress={() => {

                pro.navigation.navigate('Sign')
              }}
            >
              <Text style={{ color: '#1F7A8C', fontSize: hp("1.5.6%"), fontWeight: '300', width: wp("35%"), marginTop: hp("1.9%"), marginRight: wp("9%"), marginLeft: wp("8%"), position: 'absolute' }}>هنوز ثبت نام نکرده اید؟</Text>
              <Text style={{ color: '#1F7A8C', fontSize: hp("1.7"), fontWeight: 'bold', marginTop: hp("1.9%"),marginLeft:wp("39.3%") }}>ثبت نام</Text>

            </TouchableOpacity>
            {/* <TouchableOpacity style={{flexDirection:"row",right:wp("46%"),width:wp("51%")}}> */}
            <Button
              bordered rounded style={styles.button}
              onPress={props.handleSubmit}
            >
              <Text style={{ color: '#1F7A8C', fontSize:hp("1.8.5%"),fontWeight:'bold', marginRight:wp("21.6%"),marginLeft:wp("21.6%"),fontWeight: 'bold',alignSelf:"center" }
              }>ورود</Text>
            </Button>
            {/* </TouchableOpacity> */}
            {/* <Button bordered success style={{position:'absolute', marginTop:90,marginHorizontal:40,width:300}}>
         <Text style={{color:'#25DECC', fontSize:17,fontWeight:'300',width:185}}>ورود ناشر</Text>
        </Button> */}

          </View>
        </View>

      )}

    </Formik>





    <StatusBar backgroundColor='#BFDBF7' style='light' />
  </Container>

  );
}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // backgroundColor: 'E8C2BA',
  //   // ImageBackground:'./assets/download.jpg',
  //   height:100,
  //   width:100
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  // },
  imagee: {

    height:hp("38%"),
    width:wp("70%"),
    marginTop:hp("55%"),
    position:'absolute',
    alignSelf:"center"

  },
  temp: {
    flexDirection: "row"
  },
  button: {
    position:'absolute',
    marginTop:hp("12%"),
    width:wp("51%"),
    marginLeft:wp("23%"),
    position: 'absolute',
 
  
    backgroundColor: '#E1E5F2',
    borderColor: '#BFDBF7',
  
    height: hp("5.5%")



  },
  Input: {
    fontSize:hp("1.7%"),
    fontStyle:'normal',
    // marginLeft:30,
    marginBottom:hp("-0.5%"),
    marginLeft:wp("7%"),

  },
  input: {
    marginTop:hp("1.5%"),
    marginLeft:wp("4%"),
    marginRight:wp("4%")

    // fontWeight:'100'
  },
  Icon: {
    alignSelf:"center",
    position:'absolute'
  },
  errorr:{
    fontSize:hp("1.2.7%"), color:'red',marginTop:hp("0.5%"),alignSelf:"flex-start",marginLeft:wp("14.4%")
  }
});
export default Login;


