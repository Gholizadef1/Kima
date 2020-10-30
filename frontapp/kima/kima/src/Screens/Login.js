
import { StatusBar } from 'expo-status-bar';
import React ,{useState} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground, TouchableOpacity } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import * as Animatable from 'react-native-animatable';
import {Formik,formik} from 'formik';
import * as yup from 'yup';


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
   
  

     
     
  return (
      
    
     <Container backgroundColor='white'>
     
     <View>
      <Image source={require('../../assets/kima2.png')} style={styles.imagee}></Image>

     </View>
     <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
      initialValues={{Email:'',Password:''}}
      validationSchema={logschema}


      onSubmit={(values,actions)=>{
         pro.navigation.navigate('log');
         actions.resetForm();
         console.log(values);

      }}
     >
     {(props)=>(

    
     <View style={{alignItems:'center', marginTop:230}}>

       <Item style={styles.input}>

         <Input autoCapitalize='none' autoCorrect={false} style={styles.Input} 
         onChangeText={props.handleChange('Email')}
          value={props.values.Email}
          onBlur={props.handleBlur('Email')}
        

       
         placeholder="Email..." placeholderTextColor='lightgray'>
         
         </Input>
         <Feather name="mail" size={24} color="lightgreen" style={styles.Icon} />
       </Item>
       
      
       <Text style={{fontSize:9, color:'red'}}>{props.touched.Email&&props.errors.Email}</Text>
       
       


       <Item style={styles.input}>
         <Input name='passs' style={styles.Input} autoCapitalize='none' autoCorrect={false}

          onChangeText={props.handleChange('Password')}
          value={props.values.Password}
          onBlur={props.handleBlur('Password')}
          placeholder="Password..."placeholderTextColor='lightgray'>

         </Input>

         {/* <TouchableOpacity style={{color:'blue',marginRight:10,position:"absolute"}}
            
         ><Text style={{color:'lightblue',marginLeft:300}}>{show}</Text></TouchableOpacity> */}


         <AntDesign name="lock" size={24} color="lightgreen" style={styles.Icon}/>
       </Item>

      
       
       <Text style={{fontSize:9, color:'red'}}>{props.touched.Password&&props.errors.Password}</Text>
      
       <View style={{flexDirection:'row',width:400,marginHorizontal:15}}>
      
       
       
        <TouchableOpacity
        
         onPress={() =>{pro.navigation.navigate('Sign')}}

         
         >
         <Text style={{color:'green', fontSize:12,fontWeight:'300',width:170,marginLeft:25,marginTop:20}}>Dont have an account?Signup</Text>
         
        </TouchableOpacity>
        <Button
         bordered rounded style={styles.button}
        
        >
         <Text style={{color:'#25DECC', fontSize:15,fontWeight:'300', alignItems:'center',width:100,marginLeft:85}}>Login</Text>
        </Button>
        {/* <Button bordered success style={{position:'absolute', marginTop:90,marginHorizontal:40,width:300}}>
         <Text style={{color:'#25DECC', fontSize:17,fontWeight:'300',width:185}}>ورود ناشر</Text>
        </Button> */}
        
     </View>
       </View>
            
       )}

</Formik>
   
     
     
    
    
     <StatusBar style='light' />
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
  
    height:220,
    width:200,
    marginTop:550,
    position:'absolute',
    marginLeft:23
    
  },
  temp:{
    flexDirection:"row"
  },
  button:{
    position:'absolute',
    marginTop:60,
    width:210,
    backgroundColor:'white',
    borderColor:'aqua',
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
















