
import { StatusBar } from 'expo-status-bar';
import React ,{useState} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground, TouchableOpacity } from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon} from 'native-base';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import * as Animatable from 'react-native-animatable';
import {formik} from 'formik';



const formikform=()=>{
    return (
      
    
        <Container backgroundColor='white'>
        
        <View>
         <Image source={require('../../assets/kima2.png')} style={styles.imagee}></Image>
   
        </View>
        <formikform>
        <Form style={{borderStyle:'dashed',justifyContent:'space-around',marginHorizontal:15}}>
        <View style={{alignItems:'center', marginTop:230}}>
   
          <Item style={styles.input}>
   
            <Input autoCapitalize='none' autoCorrect={false} style={styles.Input} 
            onEndEditing={(e)=>handlevalidemail(e.nativeEvent.text)} 
            onChangeText={(val)=>handlevalidemail(val)}
          
            placeholder="Email..." placeholderTextColor='lightgray'>
            
            </Input>
            <Feather name="mail" size={24} color="lightgreen" style={styles.Icon} />
          </Item>
          {Inputs.isValidEmail===true ? null:
         
          <Text style={{fontSize:10, color:'purple'}}>email must be 4 characters long.</Text>
          
          }
   
   
          <Item style={styles.input}>
            <Input name='passs' style={styles.Input} autoCapitalize='none' autoCorrect={false}
   
             onTouchStart={()=>setShow([''])} 
             onChangeText={(value)=>handlepasswordchange(value)}
             onTouchEnd={temp=false}
             onTouchStart={temp=true}
             placeholder="Password..."placeholderTextColor='lightgray'>
   
            </Input>
   
            <TouchableOpacity style={{color:'blue',marginRight:10,position:"absolute"}}
               
            ><Text style={{color:'lightblue',marginLeft:300}}>{show}</Text></TouchableOpacity>
            <AntDesign name="lock" size={24} color="lightgreen" style={styles.Icon}/>
          </Item>
   
         
          
          <Text style={{fontSize:10, color:'purple'}}>{Inputs.epassword}.</Text>
         
          
          </View>
        </Form>
        </formikform>
        <View style={{flexDirection:'row',width:400,marginHorizontal:15}}>
            <Button bordered rounded style={styles.button}
            onPress={() =>{pro.navigation.navigate('Sign')}}
   
            
            >
            <Text style={{color:'#25DECC', fontSize:15,fontWeight:'300',width:110,marginLeft:63}}>Signup</Text>
           </Button>
           <Button
            bordered rounded style={styles.button}
           
           >
            <Text style={{color:'#25DECC', fontSize:15,fontWeight:'300', alignItems:'center',width:100,marginLeft:63}}>Login</Text>
           </Button>
           {/* <Button bordered success style={{position:'absolute', marginTop:90,marginHorizontal:40,width:300}}>
            <Text style={{color:'#25DECC', fontSize:17,fontWeight:'300',width:185}}>ورود ناشر</Text>
           </Button> */}
           
        </View>
        
        
       
       
        <StatusBar style="auto" />
       </Container>
      
     );

}