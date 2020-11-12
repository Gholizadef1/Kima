
import { StatusBar } from 'expo-status-bar';
import React ,{useState,useContext} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground, TouchableOpacity } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import * as Animatable from 'react-native-animatable';
import {Formik,formik} from 'formik';
import * as yup from 'yup';
import Home from './Home';
import TabScreen from './TabScreen';
import Axios from 'axios';
import { Context } from '../context/Authcontext';   

const logschema=yup.object({

  Email:yup.string()
  .required()
  .min(8)
  .email('invalid email format'),

  Password:yup.string()
  .required()
  .min(5),

})

 const Login=(pro)=> {
     
  const { state, signin, clearErrorMessage } = useContext(Context);      
  return (
    
     <Container backgroundColor='white'>
     
     <View>
      <Image source={require('../../assets/kima7.jpg')} style={styles.imagee}></Image>

     </View>
     <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
      initialValues={{Email:'',Password:''}}
      validationSchema={logschema}


      onSubmit={(values,actions)=>{
         
        //  window.location='home';
        //  Axios.post(urll+'login',valuesl)
        //  .then(function(response){
        //    if(response.data.placeholderTextColor===200)
        //  })
        
        // {signin};

         pro.navigation.navigate('mainFlow');
        
         actions.resetForm();
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
        

       
         placeholder="Email..." placeholderTextColor='lightgray'>
         
         </Input>
         <Feather name="mail" size={24} color="#BFDBF7" style={styles.Icon} />
       </Item>
       
      
       <Text style={{fontSize:9, color:'red'}}>{props.touched.Email&&props.errors.Email}</Text>
       
       


       <Item style={styles.input}>
         <Input name='passs' style={styles.Input} autoCapitalize='none' autoCorrect={false}

          onChangeText={props.handleChange('Password')}
          value={props.values.Password}
          onBlur={props.handleBlur('Password')}
          placeholder="Password..."placeholderTextColor='lightgray'>

         </Input>


         <AntDesign name="lock" size={24} color="#BFDBF7" style={styles.Icon}/>
       </Item>

      
       
       <Text style={{fontSize:9, color:'red'}}>{props.touched.Password&&props.errors.Password}</Text>
      
       <View style={{flexDirection:'row',width:400,marginHorizontal:15}}>
      
       
       
        <TouchableOpacity
        
         onPress={() =>{pro.navigation.navigate('Sign')}}

         
         >
         <Text style={{color:'#1F7A8C', fontSize:12,fontWeight:'300',width:170,marginLeft:25,marginTop:20}}>Dont have an account?Signup</Text>
         
        </TouchableOpacity>
        <Button
         bordered rounded style={styles.button}
         onPress={props.handleSubmit}
        >
         <Text style={{color:'#1F7A8C', fontSize:15,fontWeight:'300', alignItems:'center',width:100,marginLeft:85}
         }>Login</Text>
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
    marginTop:60,
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
















