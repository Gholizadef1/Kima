import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet} from 'native-base';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import {Formik,formik} from 'formik';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { log } from 'react-native-reanimated';

const signschema=yup.object({

  Username:yup.string()
  .required()
  .min(4),

  Email:yup.string()
  .required()
  .min(8)
  .email('invalid email format'),

  Password:yup.string()
  .required()
  .min(5),

  repeatPassword:yup.string()
  .required()
  .min(5)
  .oneOf([yup.ref('Password'),''],'Password must match')
  // .test('equaltopass','this should be the same as your password',(val)=>{
  //   return repeatPassword.string()===repeatPassword.string();
  // })




})
 const SignUp=(pro,{Users})=> {
  const[check,setcheck]=useState(false);
  return (
    
     <Container>

     
     {/* <Title style={{color:'blue',fontSize:30,marginLeft:20,marginTop:40}}>
     kima
     </Title> */}
     
     <View>
      <Image source={require('../../assets/kima6.jpg')} style={styles.imagee}></Image>

     </View>

     <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
      initialValues={{Email:'',Username:'',Password:'',repeatPassword:'' }}
      validationSchema={signschema}
      

      onSubmit={(values,actions)=>{
        
         actions.resetForm();
         pro.navigation.navigate('Log');

      }}
     >
     {(props)=>(
     <View style={{alignItems:'center', marginTop:80,marginHorizontal:20}}>

     <Item style={styles.input}>

         <Input style={styles.Input} autoCapitalize='words' autoCorrect={true}
         onChangeText={props.handleChange('Username')}
         onBlur={props.handleBlur('Username')}
         value={props.values.Username}
         placeholder="Name..." placeholderTextColor='lightgray'>
         </Input>
         <AntDesign name="user" size={24} color="#BFDBF7" style={styles.Icon} />
        
       </Item>
       
      
       <Text style={{fontSize:10, color:'red'}}>{props.touched.Username&&props.errors.Username}</Text>
 
       

       <Item style={styles.input}>

         <Input style={styles.Input} 
           onChangeText={props.handleChange('Email')}
           value={props.values.Email}
           onBlur={props.handleBlur('Email')}
         placeholder="Email..." placeholderTextColor='lightgray'>
        
         </Input>
         <Feather name="mail" size={24} color="#BFDBF7" style={styles.Icon} />
       </Item>

       
       <Text style={{fontSize:10, color:'red'}}>{props.touched.Email&&props.errors.Email}</Text>
     
       

  
       <Item style={styles.input}>
         <Input  style={styles.Input} 
         onChangeText={props.handleChange('Password')}
         value={props.values.Password}
         onBlur={props.handleBlur('Password')}
         placeholder="Password" placeholderTextColor='lightgray'>
         </Input>
         <AntDesign name="lock" size={24} color="#BFDBF7"  style={styles.Icon}/>
       </Item>

    
      
       <Text style={{fontSize:10, color:'red'}}>{props.touched.Password&&props.errors.Password}</Text>

       
       <Item style={styles.input}>
         <Input  style={styles.Input} 
          onChangeText={props.handleChange('repeatPassword')}
          value={props.values.repeatPassword}
          onBlur={props.handleBlur('repeatPassword')}
          placeholder="Repeat your password" placeholderTextColor='lightgray'>
         </Input>
         <Feather name="check" size={24} color="#BFDBF7" style={styles.Icon} />
       </Item>
      
       <Text style={{fontSize:10, color:'red'}}>{props.touched.repeatPassword&&props.errors.repeatPassword}</Text>
       
  
       <View style={{flexDirection:'row',width:400,marginRight:10,marginLeft:10}}>
       
     <CheckBox checked={check} onPress={()=>{if(check===true){setcheck(false)}else {setcheck(true)}}} 
     color='#BFDBF7' style={{marginTop:34,marginLeft:25}} />
            <Body>
              <Text  style={{marginTop:20,marginLeft:0,color:'#1F7A8C',fontSize:12}}>sign up as a publisher?</Text>
            </Body>
   
   
     <Button bordered rounded style={styles.button}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#1F7A8C', fontSize:15,fontWeight:'300',width:80, marginLeft:58}}>Signup</Text>
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
    height:100,
    width:100
    // alignItems: 'center',
    // justifyContent: 'center',
  },
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
    marginTop:20,
    width:170,
    backgroundColor:'#E1E5F2',
    borderColor:'#BFDBF7',
    marginRight:22,
 
  
    
   

    
    

  },
  input:{
     marginTop:16,
     marginLeft:20,
     marginRight:20

     
    // fontWeight:'100'
  },
  Input:{
    fontSize:14,
    fontStyle:'normal',
    marginLeft:30,
    
    
  },
  Icon:{
    marginRight:275,
    position:'absolute'
  }
});
export default SignUp;















