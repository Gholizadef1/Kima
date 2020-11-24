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



const Profile = ({navigation}) => {

    const val = useContext(AuthContext);  

    return(
      
        <View style={styles.container}>
          <ScrollView>
        <Header style={{marginTop:35,backgroundColor:'white',position:'absolute'}}></Header>
        <Text style={styles.kima}>کیما</Text>
        
        <Avatar.Image style={styles.avatar} size={80}
        source={require('../../assets/avatar.png')}
        ></Avatar.Image>
        <Text style={{marginTop:200,marginRight:42,color:"#1F7A8C"}}>نام کاربری <Text style={styles.donoghte}>:  </Text><Text style={{color:'black',width:100}}>سلام</Text></Text>
        <AntDesign name="user" size={24} color="#BFDBF7"  style={styles.Icon}/>
    
        <Text style={styles.info}>ایمیل <Text style={styles.donoghte}>:</Text><Text style={{color:'black',width:100}}>hi@hi.hi</Text></Text>
        <Feather name="mail" size={20} color="#BFDBF7" style={{ position:'absolute', height:20, marginTop:347, marginLeft:375}} />

        <Button style={styles.edit}>
            <Text style={{marginLeft:55,color:'#1F7A8C'}}>ویرایش پروفایل</Text>
        </Button>
        <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:472,marginHorizontal:10,width:50,height:1,position:'absolute',marginLeft:45}}
         ></Image>
          <Image
         source={require('../../assets/line3.png')}
         style={{marginTop:472,marginHorizontal:10,width:50,height:1,position:'absolute',marginLeft:310}}
         ></Image>

        <Button style={styles.logout} title='logout'
            onPress={()=>{
                console.log(navigation);
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