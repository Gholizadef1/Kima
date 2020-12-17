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
import { useFocusEffect } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



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
        const response = await axiosinst.get("/api/user-profile/"+id)
            
        console.log('.....')
         console.log('in')
         console.log('.....')
       setname(response.data.username)
    //    console.log(name)
       setemail(response.data.email)
       console.log('*****')
       console.log(response.data.profile_photo)

            console.log(`http://d30e06d5c109.ngrok.io${response.data.profile_photo}`)
            setpicture(`http://d30e06d5c109.ngrok.io${response.data.profile_photo}`)

            console.log(';;;;;')
            console.log(picture);
            console.log(picture)
            console.log(';;;;;')
          
       console.log(response.data.profile_photo)
    
       
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
    // const photoresponse=async ()=>{
    //     console.log('**'+'\n'+'PHOTORESPONSE'+'\n'+'**')
    //     const id=await AsyncStorage.getItem('id');
    //     // console.log(id)
    //     try{
    //     const response = await axiosinst.get("http://eb506fafbc32.ngrok.io/api/user-profile/"+id)
            
        
    //   //  console.log(response)
    // //   console.log('*****')
    // //         console.log(`http://eb506fafbc32.ngrok.io${response.data.profile_photo}`)
    // //         setpicture(`http://eb506fafbc32.ngrok.io${response.data.profile_photo}`)
    // //         console.log(picture);
          
    // //    console.log(response.data.profile_photo)
    //   //  setimage(require(response.data.profile_photo))
      
    // }
    // catch(err){
    //      console.log(err);
    //     Alert.alert('oops',' مشکلی پیش اومده دوباره امتحان کن',[{
            
    
    //             Title:'فهمیدم',onPress:()=>console.log('alert closed')
    //             }])
    // }
    // }
 
    let a=0;
    useFocusEffect(
        React.useCallback((name,picture,email) => {
            response();
            //   console.log('Listenn')
            // alert('in')
            //   return() => alert('lost')
        },[])
       
        )
    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener()
    //     const unsubscribee = navigation.addListener('focus', () => {
    //         //   photoresponse();
    //           response();
    //           console.log('Listenn')
    //           console.log('LISTENNNNNN')
    //         //   console.log('\n'+'-----'+Profilenavigation+'-----')
    //         });
        
       
    //   }, []);
     

      
   
    return(
      
        <View style={styles.container}>
          <ScrollView>
        {/* <Header style={{marginTop:35,backgroundColor:'white',position:'absolute'}}></Header> */}
        <Text style={styles.kima}>کیما</Text>
        <Image

         source={require('../../assets/backprof4.jpeg')}
         style={{   width:wp('100%'),
        height:hp('35%'),
        position:'absolute',
        
       
       }}

         ></Image>
         <View style={{position:'absolute',backgroundColor:'white',height:100,width:wp('100%'),marginTop:hp('30%'),borderTopStartRadius:30,borderTopEndRadius:30}}>

         </View>
         {/* <View style={styles.view}> */}
         <View style={styles.backpic}>

         </View>
         
        

        {picture==='http://d30e06d5c109.ngrok.io/media/default.png'?<Avatar.Image style={styles.avatar} size={100}

        source={require('../../assets/avatar.png')}
        ></Avatar.Image>:<Avatar.Image style={styles.avatar} size={100}
        source={{uri:picture}}
        ></Avatar.Image>}


        <Text style={{marginTop:hp('6%'),alignSelf:'flex-start',left:wp('10%'),color:"#1F7A8C"}}>نام کاربری <Text style={styles.donoghte}>:  </Text><Text style={{color:'black',width:100}}>{name}</Text></Text>
        <AntDesign name="user" size={24} color="#BFDBF7"  style={styles.Icon}/>
    
        <Text style={styles.info}>ایمیل <Text style={styles.donoghte}>:</Text><Text style={{color:'black',width:100}}>{email}</Text></Text>
        <Feather name="mail" size={20} color="#BFDBF7" style={{  position:'absolute',  marginTop:hp('43.5%'),
        alignSelf:'flex-start',left:wp('3%')}} />


        <Button style={styles.edit}
        onPress={()=>{navigation.navigate('Editprofile')}}
        >
            <Text style={{marginLeft:wp('12%'),color:'#1f7a8c',fontWeight:'bold'}}>ویرایش پروفایل</Text>
        </Button>
        <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:hp('57%'),position:'absolute',width:wp('14%'),height:hp('0.2%'),left:wp('10%')}}
         ></Image>
          <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:hp('57%'),position:'absolute',width:wp('14%'),height:hp('0.2%'),right:wp('10%')}}
         ></Image>

         <Text style={{fontSize:15,fontWeight:'bold',marginTop:hp('10%'),alignSelf:'flex-start',left:wp('10%'),color:"gray"}}>فعالیت ها</Text>
         <Image
         source={require('../../assets/Line.png')}
         style={{marginTop:hp('5%'),width:80,height:2,alignSelf:'flex-end'}}
         ></Image>
          <Image
         source={require('../../assets/Line.png')}
         style={{marginTop:hp('14%'),width:80,height:2,alignSelf:'flex-end'}}
         ></Image>
           <Image
         source={require('../../assets/Line.png')}
         style={{marginTop:hp('14%'),width:80,height:2,alignSelf:'flex-end'}}

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
      {/* </View> */}
    
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
      width:wp('100%'),
    //   borderTopStartRadius:100
      
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    // view:{
    //     backgroundColor:'#ffff',
    //     marginTop:hp('28%'),
        
    // },
    kima:{
        color:'#1F7A8C',

        marginTop:hp('8%'),
        marginLeft:wp('5%'),

        fontSize:20,
        fontWeight:'bold',
        position:'absolute'
       
        
        
    },
    logout:{
        
        marginTop:hp('40%'),
        marginBottom:30,
        width:210,
        backgroundColor:'#E1E5F2',
        borderColor:'#BFDBF7',
        // marginLeft:98,
        alignSelf:'center',
        height:43,
        // fontSize:20
        
    },
    info:{

        marginLeft:wp('10%'),
        marginTop:hp('3%'),

        color:"#1F7A8C"
    },

    donoghte:{
        color:"black",
        marginLeft:wp('1%'),
        position:'absolute'
    },

    Icon:{


         position:'absolute',
        marginTop:hp('37.5%'),
        alignSelf:'flex-start',left:wp('3%')
    },
    avatar:{
        position:'absolute',
        marginTop:hp('25%'),
        alignSelf:'center'

        
    },
    edit:{
        height:45,
        width:200,
        backgroundColor:'#EDF2F4',
        borderRadius:20,
        marginLeft:105,
        marginTop:hp('8%')
    },
    backpic:{
       
        width:wp('100%'),
        height:hp('32%'),
       
        
         
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50
    }
  });
  export default Profile;