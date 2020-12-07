import React,{useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView, ImageEditor} from 'react-native';
import {Container,Header,Title,Button,Form,Item,Input, Icon} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { Avatar } from 'react-native-paper';
// import Login from './Login';
// import { Context as AuthContext } from '../context/AuthContext'; 
// import { Button } from 'native-base';
// import TabScreen from './TabScreen'
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { NavigationContainer } from "@react-navigation/native";
// import StackScreen from './StackScreen';
// import { State } from 'react-native-gesture-handler';
import App from '../../App';
import AuthContext,{AuthProvider} from '../context/Authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import axiosinst from '../api/axiosinst';
import Profilenavigation from './Profilenavigation';



 const Profile = ({navigation}) => {

    const val = useContext(AuthContext);  
    const [name,setname]=useState(null);
    const [picture,setpicture]=useState(null);
    const [email,setemail]=useState(null);
    const [Inage,setInage]=useState(require('../../assets/avatar.png'));
    // console.log(AsyncStorage.getItem('id'))
    const response=async (searchTerm)=>{
        const id=await AsyncStorage.getItem('id');
        console.log(id)
        try{
        const response = await axiosinst.get("http://376934692f88.ngrok.io/api/user-profile/"+id)
            
        
        // console.log(response)
       setname(response.data.username)
    //    console.log(name)
       setemail(response.data.email)
    
       
    }
    catch(err){
        // console.log(response)
        // console.log(err);
        Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
            

                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }

    // navigation.addListener('Focus', () => {
      
    //    response()
    //    console.log('akdfsj;lskafd')
    // });
    const photoresponse=async ()=>{
        console.log('**'+'\n'+'PHOTORESPONSE'+'\n'+'**')
        const id=await AsyncStorage.getItem('id');
        // console.log(id)
        try{
        const response = await axiosinst.get("http://376934692f88.ngrok.io/api/user-profile/"+id)
            
        
      //  console.log(response)
      console.log('*****')
            console.log(`http://376934692f88.ngrok.io${response.data.profile_photo}`)
            setpicture(`http://376934692f88.ngrok.io${response.data.profile_photo}`)
            console.log(picture);
          
       console.log(response.data.profile_photo)
      //  setimage(require(response.data.profile_photo))
      
    }
    catch(err){
         console.log(err);
        Alert.alert('oops',' مشکلی پیش اومده دوباره امتحان کن',[{
            
    
                Title:'فهمیدم',onPress:()=>console.log('alert closed')
                }])
    }
    }
 
    let a=0;
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          photoresponse();
          response();
          console.log('Listenn')
          console.log('\n'+'-----'+Profilenavigation+'-----')
        });
    
       
      }, [Profilenavigation,a]);
     

      
   
    return(
      
        <View style={styles.container}>
          <ScrollView>
        {/* <Header style={{marginTop:35,backgroundColor:'white',position:'absolute'}}></Header> */}
        <Text style={styles.kima}>کیما</Text>
        <Image
         source={require('../../assets/backprof4.jpeg')}
         style={{marginTop:37,width:350,height:300,position:'absolute',borderBottomRightRadius:300,borderBottomLeftRadius:50}}
         ></Image>
        
        {!(picture==="http://3097034fddc8.ngrok.io/media/default.jpg")? <Avatar.Image style={styles.avatar} size={100}
        source={{uri:picture}}
        ></Avatar.Image>: <Avatar.Image style={styles.avatar} size={100}
        source={require('../../assets/avatar.png')}
        ></Avatar.Image>}

        <Text style={{marginTop:200,marginRight:42,color:"#1F7A8C"}}>نام کاربری <Text style={styles.donoghte}>:  </Text><Text style={{color:'black',width:100}}>{name}</Text></Text>
        <AntDesign name="user" size={24} color="#BFDBF7"  style={styles.Icon}/>
    
        <Text style={styles.info}>ایمیل <Text style={styles.donoghte}>:</Text><Text style={{color:'black',width:100}}>{email}</Text></Text>
        <Feather name="mail" size={20} color="#BFDBF7" style={{ position:'absolute', height:20, marginTop:347, marginLeft:375}} />

        <Button style={styles.edit}
        onPress={()=>{navigation.navigate('Editprofile')}}
        >
            <Text style={{marginLeft:54,color:'#1f7a8c',fontWeight:'bold'}}>ویرایش پروفایل</Text>
        </Button>
        <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:472,marginHorizontal:10,width:50,height:1,position:'absolute',marginLeft:45}}
         ></Image>
          <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:472,marginHorizontal:10,width:50,height:1,position:'absolute',marginLeft:310}}
         ></Image>
         <Text style={{fontSize:15,fontWeight:'bold',marginTop:30,marginRight:20,color:"gray"}}>فعالیت ها</Text>
         <Image
         source={require('../../assets/Line.png')}
         style={{marginTop:600,width:80,height:2,position:'absolute'}}
         ></Image>
          <Image
         source={require('../../assets/Line.png')}
         style={{marginTop:700,width:80,height:2,position:'absolute'}}
         ></Image>
           <Image
         source={require('../../assets/Line.png')}
         style={{marginTop:800,width:80,height:2,position:'absolute'}}
         ></Image>
         

        <Button style={styles.logout} title='logout'
            onPress={()=>{
                // console.log(navigation);
                // navigation.navigate('loginFlow')}}
                AsyncStorage.removeItem('token')
                // AsyncStorage.setItem('token',null)
                val.changelogged(null);

            }}
      >

          <Text style={{marginLeft:80}}>logout</Text>
      </Button> 

    
    </ScrollView>
     
    <StatusBar backgroundColor='#BFDBF7' style='light' />
        </View>
   
        // {/* <Text>HI</Text>
        // </ScrollView> */}
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    kima:{
        color:'#1F7A8C',
        marginTop:50,
        marginRight:20,
        fontSize:20,
        fontWeight:'bold'
        
        
    },
    logout:{
        
        marginTop:800,
        marginBottom:30,
        width:210,
        backgroundColor:'#E1E5F2',
        borderColor:'#BFDBF7',
        marginLeft:98,
        height:43,
        // fontSize:20
        
    },
    info:{
        marginRight:45,
        marginTop:45,
        color:"#1F7A8C"
    },
    donoghte:{
        color:"black",marginLeft:100,position:'absolute'
    },
    Icon:{
        position:'absolute',
    
      
        marginTop:280,
        marginLeft:375
    },
    avatar:{
        position:'absolute',
        marginTop:190,
        marginLeft:40,
        
    },
    edit:{
        height:45,
        width:200,
        backgroundColor:'lightgray',
        borderRadius:17,
        marginLeft:105,
        marginTop:80
    }
  });
  export default Profile;