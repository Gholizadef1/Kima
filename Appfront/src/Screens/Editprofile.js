import React,{useContext} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
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
import AuthContext,{AuthProvider} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';



const Profile = ({navigation}) => {

    const val = useContext(AuthContext);  
    //nd
 
    const fall=new Animated.Value(1);
    const renderheader=()=>{
        return(
        <View style={{backgroundColor:'white',
       
        
        }}
        
        >
        <View>
            <View style={{}}>
            <Image
         source={require('../../assets/line3.png')}
         style={{width:100,height:5,marginLeft:155}}
         ></Image>
            <Text style={{marginLeft:150,width:100,fontWeight:'bold',color:'#1F7A8C',marginTop:10,fontSize:16 }}>انتخاب عکس</Text>
            </View>
        </View>

        </View>
        )
    }
    const renderinner=()=>{
        console.log('inner');
        return(
      <View style={{backgroundColor:'gray'}}>
         <Image
         source={require('../../assets/bottomsheet.jpeg')}
         style={{width:420,height:300,position:'absolute'}}
         ></Image>
         <Button
         bordered rounded style={styles.button}
        onPress={()=>{}}
        style={{marginLeft:86,marginTop:50,borderColor:'#BFDBF7',backgroundColor:'#1F7A8C',borderRadius:15}}
    
        >
         <Text style={{color:'white', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:84}
         }>گرفتن عکس</Text>
        </Button>
        <Button
         bordered rounded style={styles.button}
        onPress={()=>{}}
        style={{marginLeft:86,marginTop:30,borderColor:'#BFDBF7',backgroundColor:'#1F7A8C',borderRadius:15}}
    
        >
         <Text style={{color:'white', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:72}
         }>انتخاب از گالری</Text>
        </Button>
      
        </View>


    
        )
    }
    const bs=React.useRef(null);
    
    return(
      <>
        <Animated.View style={{
             flex: 1,
      opacity:Animated.add(0.1,Animated.multiply(fall,1.0)),
      
      
      backgroundColor: '#fff',
        }}>
      
     
       
          {/* <ScrollView style={{height:1000}}> */}
        <Header style={{marginTop:35,backgroundColor:'white',position:'absolute'}}></Header>
        <Text style={styles.kima}>کیما</Text>
        <Text>Editprofile</Text>
        {/* <Avatar.Image style={styles.avatar} size={80}
        source={require('../../assets/avatar.png')}
        ></Avatar.Image> */}
        {/* <TouchableOpacity style={{position:'absolute'}}> */}
      
        {/* <TouchableOpacity >
        <View style={{marginTop:100,position:'absolute'}}> */}
        <BottomSheet
             snapPoints={[280, 0, -10]}
            ref={bs}
            initialSnap={1}
            callbackNode={fall}
            // enabledGestureInteraction={true}
            renderContent={renderinner}
            renderHeader={renderheader}
            
               // style={{position:'absolute',height:200,width:250,marginTop:400}}
            backgroundColor={'white'}
        
        ></BottomSheet>
        
        <View style={{position:'absolute',height:100,width:100,marginTop:200,marginLeft:50,borderRadius:15}}>
        <TouchableOpacity
        onPress={()=>{bs.current.snapTo(0)}}
        >
        <ImageBackground borderRadius={15}
        source={require('../../assets/avatar.png')}
        style={{height:100,width:100,borderRadius:15}}
        
        >

        </ImageBackground>
        </TouchableOpacity>
        </View>
        {/* </View>
        </TouchableOpacity>
  */}
  {/* //<View style={{position:'absolute',marginTop:700,width:380,height:100}}> */}
   
        {/* </TouchableOpacity> */}
        <Text style={{marginTop:200,marginRight:42,color:"#1F7A8C"}}>نام کاربری <Text style={styles.donoghte}>:  </Text><Text style={{color:'black',width:100}}>سلام</Text></Text>
        <AntDesign name="user" size={24} color="#BFDBF7"  style={styles.Icon}/>
    
        <Text style={styles.info}>ایمیل <Text style={styles.donoghte}>:</Text><Text style={{color:'black',width:100}}>hi@hi.hi</Text></Text>
        <Feather name="mail" size={20} color="#BFDBF7" style={{ position:'absolute', height:20, marginTop:367, marginLeft:378}} />

        <Button style={styles.edit}>
            <Text style={{marginLeft:55,color:'#1F7A8C'}}>ویرایش پروفایل</Text>
        </Button>
        <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:492,marginHorizontal:10,width:50,height:1,position:'absolute',marginLeft:45}}
         ></Image>
          <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:492,marginHorizontal:10,width:50,height:1,position:'absolute',marginLeft:310}}
         ></Image>

         

    
    {/* </ScrollView> */}
     
    <StatusBar backgroundColor='#BFDBF7' style='light' />
        </Animated.View>
        </>
   
        // {/* <Text>HI</Text>
        // </ScrollView> */}
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      opacity:Animated.add(0.1,Animated.multiply(fall,1.0)),
      
      
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
    
      
        marginTop:300,
        marginLeft:378
    },
    avatar:{
        position:'absolute',
        marginTop:190,
        marginLeft:50,
        
    },
    edit:{
        height:50,
        width:200,
        backgroundColor:'#E1E5F2',
        borderRadius:25,
        marginLeft:105,
        marginTop:80
    }
  });
  export default Profile;