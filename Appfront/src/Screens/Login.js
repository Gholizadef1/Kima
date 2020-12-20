


import { StatusBar } from 'expo-status-bar';
import React ,{useState,useContext} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground, TouchableOpacity,Alert } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import {Formik,formik} from 'formik';
import * as yup from 'yup';
// import axios from 'axios';
import Home from './Home';
import TabScreen from './TabScreen';
import Axios from 'axios';
// import {creatStore} from 'redux'
// import { Context } from '../context/AuthContext';   
import axiosinst from '../api/axiosinst';
import axios from 'axios';
import AuthContext,{AuthProvider} from '../context/Authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const logschema=yup.object({
  Email:yup.string()
  .required("ایمیل شما نمیتواند خالی باشد")
  .min(8,"ایمیل شما باید حداقل 8 کاراکتر باشد")
  .email('فورمت ایمیل شما نادرست است'),

  Password:yup.string()
  .required("رمز عبور شما نمیتواند خالی باشد")
  .min(5,"رمز شما باید حداقل به طول 5 باشد"),

})

 const Login=(pro)=> {
   
  // const { state, signin } = useContext(Context);
  // const { state, signin, clearErrorMessage } = useContext(Context);      
  const val=useContext(AuthContext);
     
     
  return (
    
      // <navigationconta>
    
     <Container backgroundColor='white'>
     
     <View>
      <Image source={require('../../assets/kima7.jpg')} style={styles.imagee}></Image>
     </View>
     <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
      initialValues={{Email:'',Password:''}}
      validationSchema={logschema}


      onSubmit={async(values,actions)=>{
         
      
        const back={   
          email:values.Email,
          password:values.Password,
        }
         const backk=JSON.stringify(back);



         axios.post('http://dc39baf075fd.ngrok.io/login',backk,{"headers":{"content-type":"application/json",}})


        .then(async function(response){
          console.log(response.data.userid)
           console.log(response)
           console.log(response.data.token)
          await AsyncStorage.setItem('token',response.data.token)
          await AsyncStorage.setItem('id',response.data.userid.toString())
          // console.log(response)
          // console.log(response.status);
          val.changelogged(true);
          // pro.navigation.navigate('mainFlow');

          console.log('Hiiiiiiii')
          console.log('.....');
         
        
         
        })
        .catch(function(error){
          console.log('....')
          console.log(error);
          Alert.alert('oops','ایمیل و یا رمز عبور اشتباه است',[{
            

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
            }])
        console.log(error);
        console.log(error.status);
         
        })
         console.log(values);
      }}
     >
     {(props)=>(
    
     <View style={{alignItems:'center', marginTop:120}}>
       <Item style={styles.input}>
         <Input autoCapitalize='none' autoCorrect={false} style={styles.Input} 
         onChangeText={props.handleChange('Email')}
          value={props.values.Email}
          onBlur={props.handleBlur('Email')}       
          placeholder="ایمیل خود را وارد کنید ..." placeholderTextColor='lightgray'>
         </Input>
         <Feather name="mail" size={24} color="#BFDBF7" style={styles.Icon} />
       </Item>      
       <Text style={{fontSize:9, color:'red'}}>{props.touched.Email&&props.errors.Email}</Text>
       <Item style={styles.input}>
         <Input name='passs' style={styles.Input} autoCapitalize='none' autoCorrect={false}
          secureTextEntry
          onChangeText={props.handleChange('Password')}
          value={props.values.Password}
          onBlur={props.handleBlur('Password')}
          placeholder="رمز خود را وارد کنید ..."placeholderTextColor='lightgray'>

         </Input>


         <AntDesign name="lock" size={24} color="#BFDBF7" style={styles.Icon}/>
       </Item>

      
       
       <Text style={{fontSize:9, color:'red'}}>{props.touched.Password&&props.errors.Password}</Text>
      
       <View style={{flexDirection:'row',width:400,marginHorizontal:15}}>
      
       
       
        <TouchableOpacity
        
         onPress={() =>{pro.navigation.navigate('Sign')}} 
         >
         <Text style={{color:'#1F7A8C', fontSize:13,fontWeight:'300',width:140,marginTop:15,marginRight:25,marginLeft:25,position:'absolute'}}>هنوز ثبت نام نکرده اید؟</Text>
         <Text style={{color:'#1F7A8C', fontSize:14,fontWeight:'bold',marginTop:15,marginLeft:157}}>ثبت نام</Text>
         
        </TouchableOpacity>
        <Button
         bordered rounded style={styles.button}
         onPress={props.handleSubmit}
        >
         <Text style={{color:'#1F7A8C', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:88}
         }>ورود</Text>
        </Button>
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
  imagee:{
  
    height:320,
    width:300,
    marginTop:450,
    position:'absolute',
    marginLeft:50
    
  },
  temp:{
    flexDirection:"row"
  },
  button:{
    position:'absolute',
    marginTop:80,
    width:210,
    backgroundColor:'#E1E5F2',
    borderColor:'#BFDBF7',
    marginLeft:98,
    height:43

    

  },
  Input:{
    fontSize:14,
    fontStyle:'normal',
    marginLeft:30
    
  },
  input:{
    
     marginTop:30,
     marginLeft:25,
     marginRight:25
     
    // fontWeight:'100'
  },
  Icon:{
    marginRight:275,
    position:'absolute'
  }
});
export default Login;


