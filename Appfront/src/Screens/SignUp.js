import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert } from 'react-native';
import { Container, Header, Title, Form, Item, Input, Button, Icon, CheckBox, Body, ActionSheet } from 'native-base';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Formik, formik } from 'formik';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { log } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext, { AuthProvider } from '../context/Authcontext';
// import AuthContext,{AuthProvider} from '../context/AuthContext';
// import { Context as Authcontext } from '../context/AuthContext';  
import { Video } from 'expo-av';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import axios from 'axios';
import axiosinst from '../api/axiosinst';

const signschema = yup.object({

  Username: yup.string()
    .required("نام کاربری شما نمیتواند خالی باشد")
    .min(4, "نام کاربری شما باید حداقل به طول 4 کاراکتر باشد"),

  Email: yup.string()
    .required("ایمیل شما نمیتواند خالی باشد")
    .min(8, "امیل شما باید حداقل به طول 8 کاراکتر باشد")
    .email('فورمت ایمیل شما نادرست است '),

  Password: yup.string()
    .required("رمز عبور شما نمیتواند خالی باشد")
    .min(5, "رمز عبور شما باید حداقل به طول 5 باشد"),

  repeatPassword: yup.string()
    .required("رمز عبور شما نمیتواند خالی باشد")
    .min(5, "رمز شما باید حداقل به طول 5 کاراکتر باشد")
    .oneOf([yup.ref('Password'), ''], 'رمز های شما باید با هم بخواند')
  // .test('equaltopass','this should be the same as your password',(val)=>{
  //   return repeatPassword.string()===repeatPassword.string();
  // })




})

const SignUp = (pro, { Users }) => {
  const val = useContext(AuthContext);
  const [check, setcheck] = useState(false);
  // const { state, signup } = useContext(Authcontext);
  return (

    <Container>
      <Video
        source={require('../../assets/authvideo.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: wp('100%'), height: hp('69%'), position: 'absolute' }}
      ></Video>
      <Text style={{ color: '#EDF2F4', fontSize: hp('2.7%'), fontWeight: 'bold', marginTop: hp('7.3%'), marginLeft: wp('10%'), position: 'absolute' }}>کیما</Text>

      <AntDesign name="arrowleft" size={hp("2.9%")} color="#EDF2F4"
        style={{
          marginTop: hp('8%'),
          position: 'absolute',
          marginRight: wp('5%'),
          marginLeft: wp('85%')
        }}
        onPress={() => {
          pro.navigation.navigate('Log')
        }}
      />
      {/* <Title style={{color:'blue',fontSize:30,marginLeft:20,marginTop:40}}>
     kima
     </Title> */}

      <View style={{ marginTop: hp('13%') }}>
        <Image source={require('../../assets/kima7.jpg')} style={styles.imagee}></Image>

      </View>

      <Formik style={{ borderStyle: 'dashed', justifyContent: 'space-around' }}
        initialValues={{ Email: '', Username: '', Password: '', repeatPassword: '' }}
        validationSchema={signschema}


        onSubmit={async (values, actions) => {
          //  signup(values);
          const back = {
            username: values.Username,
            email: values.Email,
            password: values.Password,
            password2: values.repeatPassword,

          }
          const backk = JSON.stringify(back);
          // try{
          //  const response=await axios.post('http://127.0.0.1:8000/register',JSON.stringify({username:'Hi',email:'Hi@Hi.Hi',password:'12345',password2:'12345'}))
          //  }
          //  catch(errors){
          //    console.log(errors)
          //  }
          const params = JSON.stringify({ username: 'Hi', email: 'Hi@Hi.Hi', password: '12345', password2: '12345' });



          axiosinst.post('/register', backk, { "headers": { "content-type": "application/json", } })



            .then(async function (response) {
              // AsyncStorage.setItem('token',response.data.token)

              // await AsyncStorage.setItem('token',response.data.token)
              // val.changelogged(response.data.token)
              // console.log(response);
              // console.log(response.data.email);
              // console.log(response.data);
              // // console.log(response.data.email[0]);
              // // console.log(response.data.email[0]==="Enter a valid email address.");
              // console.log(response.response);
              // response.data.email[0]
              // console.log(back.email)
              // console.log(response.status);
              // console.log(response.data.email);
              // console.log(response.data.username);
              //  console.log(response);

              if (response.data.email !== back.email || response.data.username !== back.username) {
                if (response.data.email !== undefined && response.data.username !== undefined) {
                  console.log(response.data.username);
                  console.log(response.data.email);
                  Alert.alert('', 'کاربری با این ایمیل و نام کاربری از قبل وجود دارد', [{


                    text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
                  }], { cancelable: false }, { style: { height: 50 } })

                }
                else if (response.data.username !== undefined) {
                  Alert.alert('', 'کاربری با این نام کاربری از قبل وجود دارد', [{


                    text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
                  }], { cancelable: false }, { style: { height: 50 } })


                }
                else if (response.data.email !== undefined) {
                  Alert.alert('', 'کاربری با این ایمیل از قبل وجود دارد', [{


                    text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
                  }], { cancelable: false }, { style: { height: 50 } })

                }
                else {
                  Alert.alert('', 'لطفا ایمیل درستی را وارد کنید', [{


                    text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
                  }], { cancelable: false }, { style: { height: 50 } })


                }
              }
              else {
                AsyncStorage.setItem('token', response.data.token)
                console.log(response)
                console.log('inja')
                console.log(back.email);
                pro.navigation.navigate('Log');
                actions.resetForm();
              }




              //  console.log(response);
            })
            .catch(function (error) {
              console.log(error);

            })


          //  console.log('hi'); 

          // let res=await axiosinst.post('/register',values)

          //     axios.post(' http://127.0.0.1:8000/register',backk)
          //   .then((response) => {

          // console.log(response);
          // }, (error) => {
          // console.log(error);
          //   });
          //     // await axios.post('http://127.0.0.1:8000/register',backk)

          //   // .then(res => {
          //   //   console.log(res);
          //   //   console.log(res.data);
          //   // }))
          //  actions.resetForm();
          //  pro.navigation.navigate('Log');
        }}
      >
        {(props) => (
          <View style={{ alignItems: 'center', marginTop: hp("11%"), marginHorizontal: wp("4%") }}>

            <Item style={styles.input}>

              <Input style={styles.Input} autoCapitalize='words' autoCorrect={true}
                onChangeText={props.handleChange('Username')}
                onBlur={props.handleBlur('Username')}
                value={props.values.Username}
                placeholder="نام خود را وارد کنید ..." placeholderTextColor='lightgray'>
              </Input>
              <AntDesign name="user" size={hp("2.9%")} color="#BFDBF7" style={styles.Icon} />

            </Item>


            <Text style={styles.errorr}>{props.touched.Username && props.errors.Username}</Text>



            <Item style={styles.input}>

              <Input style={styles.Input}
                onChangeText={props.handleChange('Email')}
                value={props.values.Email}
                onBlur={props.handleBlur('Email')}
                placeholder="ایمیل خود را وارد کنید ..." placeholderTextColor='lightgray' >

              </Input>
              <Feather name="mail" size={hp("2.9%")} color="#BFDBF7" style={styles.Icon} />
            </Item>


            <Text style={styles.errorr}>{props.touched.Email && props.errors.Email}</Text>




            <Item style={styles.input}>
              <Input style={styles.Input}
                secureTextEntry
                onChangeText={props.handleChange('Password')}
                value={props.values.Password}
                onBlur={props.handleBlur('Password')}
                placeholder="رمز خود را وارد کنید ..." placeholderTextColor='lightgray'>
              </Input>
              <AntDesign name="lock" size={hp("2.9%")} color="#BFDBF7" style={styles.Icon} />
            </Item>



            <Text style={styles.errorr}>{props.touched.Password && props.errors.Password}</Text>


            <Item style={styles.input}>
              <Input style={styles.Input}
                secureTextEntry
                onChangeText={props.handleChange('repeatPassword')}
                value={props.values.repeatPassword}
                onBlur={props.handleBlur('repeatPassword')}
                placeholder="رمز خود را تکرار کنید" placeholderTextColor='lightgray'>
              </Input>
              <Feather name="check" size={hp("2.9%")} color="#BFDBF7" style={styles.Icon} />
            </Item>

            <Text style={styles.errorr}>{props.touched.repeatPassword && props.errors.repeatPassword}</Text>


            <View style={{ flexDirection: 'row', width: wp("96%"), marginRight: wp("2%"), marginLeft: wp("2%") }}>

              {/* <CheckBox checked={check} onPress={()=>{if(check===true){setcheck(false)}else {setcheck(true)}}} 
     color='#BFDBF7' style={{marginTop:43,marginLeft:332,position:'absolute'}} />
            <Body>
              {/* <Text  style={{marginTop:45,marginLeft:150,color:'#1F7A8C',fontSize:12,fontWeight:'bold'}}>ثبت نام به عنوان ناشر؟</Text> */}
              {/* </Body> */}


              <Button bordered rounded style={styles.button}
                onPress={props.handleSubmit}
                Title='ad'



              >
                <Text style={{ color: '#F0F9F7', width: wp("-10%"), fontSize: hp("1.8.5%"), fontWeight: 'bold', marginLeft: wp("19.4%"), marginRight: wp("19.4%") }}>ثبت نام</Text>
              </Button>

            </View>

          </View>


        )}

      </Formik>


      <StatusBar backgroundColor='#BFDBF7' style='light' />
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // ImageBackground:'./assets/download.jpg',
    // height:3050,
    // width:100
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imagee: {

    height: hp("30%"),
    width: wp("70%"),
    marginTop: hp("60%"),
    position: 'absolute',
    alignSelf: "center"

  },
  temp: {
    flexDirection: "row"
  },
  button: {
    position: 'absolute',
    marginTop: hp("3%"),
    width: wp("51%"),
    backgroundColor: '#2592A7',
    borderColor: '#BFDBF7',
    marginLeft: wp("23%"),


  },
  input: {
    marginTop: hp("1.5%"),
    marginLeft: wp("4%"),
    marginRight: wp("4%")


    // fontWeight:'100'
  },
  Input: {
    fontSize: hp("1.7%"),
    fontStyle: 'normal',
    // marginLeft:30,
    marginBottom: hp("-0.5%"),
    marginLeft: wp("7%"),
    // marginBottom:hp("-0.5%")


  },
  Icon: {
    alignSelf: "center",
    position: 'absolute'
  },
  errorr: {
    fontSize: hp("1.2.7%"), color: 'red', marginTop: hp("0.5%"), alignSelf: "flex-start", marginLeft: wp("12.1%")
  }
});
export default SignUp;