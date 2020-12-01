import React,{useContext,useState,useRef} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet} from 'native-base';
import { TouchableOpacity } from 'react-native';
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
import {Formik,formik} from 'formik';
import * as yup from 'yup';
import axiosinst from '../api/axiosinst';
import * as permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';





const userschema=yup.object({

    Username:yup.string()
    .required("لطفا نام کاربری جدید خود را وارد کنید")
    .min(4, "نام کاربری نمیتواند کم تر از 4 حرف باشد"),
  
  })
  const passschema=yup.object({
    Password:yup.string()
    .required("رمز عبور نمیتواند خالی باشد.")
    .min(5,"لطفا رمزی به طول حداقل 5 کاراکتر وارد کنید"),
    newPassword:yup.string()
    .required("رمز جدید شما نمیتواند خالی باشد.")
    .min(5,"اندازه رمز شما باید حداقل 5 کرارکتر باشد"),
    repeatnewPassword:yup.string()
    .required("لطفا رمز جدید خود را تکرار کنید")
    .min(5,"طول رمز شما حداقل 5 کلمه است")
    .oneOf([yup.ref('newPassword'),''],'رمز ها باید یکی باشند')
  
  })
  // const loggg=async()=>{
  //   console.log(await AsyncStorage.getItem('token'));
  // }
const EditProfile = () => {
  const [image,setimage]=useState(null);
  const photoresponse=async ()=>{
    const id=await AsyncStorage.getItem('id');
    // console.log(id)
    try{
    const response = await axiosinst.get("http://47fa53e7c300.ngrok.io/api/user-profile/"+id)
        
    
  //  console.log(response)
      if(response.data.profile_photo!="/media/default.png"){
        setimage(response.data.profile_photo)
      }
   console.log(response.data.profile_photo)
  //  setimage(require(response.data.profile_photo))
  
}
catch(err){
    // console.log(err);
    Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
        

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
            }])
}
}
photoresponse();
  const pickfromgallery = async ()=>{
    await console.log(await AsyncStorage.getItem('token'));
    console.log('gallery')
      const {granted}=await permissions.askAsync(permissions.CAMERA_ROLL)
      if(granted){
          console.log(granted)
          let data=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1
          })
          console.log(data);
          console.log(data.uri)
          const formdata = new FormData();
          const newfile={uri:data.uri,
            type:`test/${data.uri.split(".")[3]}`,
            name:`test.${data.uri.split(".")[3]}`}
          console.log(newfile)

          formdata.append('profile_photo',newfile)
          
          if(data.cancelled===false){
          const back={        
            profile_photo:data
          }
           const backk=JSON.stringify(back);
          const response=await axiosinst.put('http://47fa53e7c300.ngrok.io/api/update-profile/',formdata,{
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
            }
               )
          .then( function(response){
            console.log(response)
            console.log('1')
            console.log(response.data.profile_photo);
            console.log('1')
            setimage(response.data.profile_photo);
            console.log(image);
            console.log('akasjhdflksjafhlksjhdflkasjhdflkajhfdlskjhf')
          
            
          })
          .catch( function(error){
            console.log(error)
          })
          // photoresponse();
          // setimage(data.uri);
         
     
          }
          bs.current.snapTo(1);
      }
      else
      {
        Alert.alert('oops',' برای تغییر عکس پروفایل باید اجازه دسترسی به ما بدید',[{
          Title:'فهمیدم',onPress:()=>console.log('alert closed')
          }])
      }
  
  }
  
  const pickfromcamera = async ()=>{
    
    console.log('cameraaa')
    const {granted}=await permissions.askAsync(permissions.CAMERA)
    if(granted){
  
        let data=await ImagePicker.launchCameraAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          // aspect:[1,1],
          quality:1
        })
        console.log(data);
        response();
        setimage(data.uri);
        // this.bs.current.snapTo(1);
    }
    else
    {
      Alert.alert('oops',' برای تغییر عکس پروفایل باید اجازه دسترسی به ما بدید',[{
        Title:'فهمیدم',onPress:()=>console.log('alert closed')
        }])
    }
  
  }
  
// loggg();
   
    // const val = useContext(AuthContext);  
    //nd
   
    const [name,setname]=useState(null);
    // const [password,setpassword]=useState(null);
    // const oldpassword=null;
    const response=async ()=>{
      const id=await AsyncStorage.getItem('id');
      // console.log(id)
      try{
      const response = await axiosinst.get("http://47fa53e7c300.ngrok.io/api/user-profile/"+id)
          
      if(response.data.profile_photo!="/media/default.png"){
        setimage(response.data.profile_photo)
        
      }
      // else
      // setimage('../../assets/avatar.png')
   console.log(response.data.profile_photo)
    //  console.log(response)
    console.log(response.data)
     setname(response.data.username)
     console.log(response.data.profile_photo)
    //  setimage(require(response.data.profile_photo))
    
  }
  catch(err){
      // console.log(err);
      Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
          

              Title:'فهمیدم',onPress:()=>console.log('alert closed')
              }])
  }
  }
      response();
  

     const renderHeader=()=>{
      console.log('header')
      return(
    
      
        <View style={{backgroundColor:'white',flex:1
        }}
        
        >
        <View style={{}}>
            <View style={{}}>
            {/* <Image
         source={require('../../assets/line3.png')}
         style={{width:300,height:3}}
         ></Image> */}
            <Image
         source={require('../../assets/line3.png')}
         style={{width:100,height:5,marginLeft:155}}
         ></Image>
            <Text style={{marginLeft:150,width:100,fontWeight:'bold',color:'#1F7A8C',marginTop:15,fontSize:16 }}>انتخاب عکس</Text>
            </View>
        </View>

        </View>
        )
    }
    const print=console.log('1111')
     const renderInner=()=>{
      return(
        // console.log('inner');
      <View style={{backgroundColor:'gray'}}>

         <Image
         source={require('../../assets/bottomsheet.jpeg')}
         style={{width:420,height:300,position:'absolute'}}
         ></Image>

         <Button
         bordered rounded style={styles.button}
        
        onPress={async()=>await pickfromgallery()}
        style={{marginLeft:86,marginTop:50,borderColor:'#BFDBF7',backgroundColor:'#1F7A8C',borderRadius:15}}
        >

         <Text style={{color:'white', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:84}
         }>گرفتن عکس</Text>
        </Button>

        <Button
         bordered rounded style={styles.button}
        onPress={()=>console.log('camera')}
        style={{marginLeft:86,marginTop:30,borderColor:'#BFDBF7',backgroundColor:'#1F7A8C',borderRadius:15}}
        >

         <Text style={{color:'white', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:72}
         }>انتخاب از گالری</Text>
        </Button>
      
        </View>
      )
    }
         const bs = React.useRef(null)
         const fall=new Animated.Value(1);
        console.log('2222')
       
console.log(image)
    return(
      
        <View style={styles.container}>
      
        <BottomSheet
             snapPoints={[380, 0, 0]}
            ref={bs}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
            renderContent={renderInner}
            renderHeader={renderHeader}
         
            

                        
               // style={{position:'absolute',height:200,width:250,marginTop:400}}
            backgroundColor={'white'}
        
       />
        
        <View style={{position:'absolute',height:100,width:100,marginTop:57,marginLeft:150,borderRadius:15}}>
        <TouchableOpacity
         onPress={async()=>await pickfromgallery()}>
        
        <ImageBackground borderRadius={15}
        source={{uri:image}}
        style={{height:100,width:100,borderRadius:1}}
        
        >

        </ImageBackground>
        </TouchableOpacity>
        </View>

        <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
      initialValues={{Username:''}}
      validationSchema={userschema}
      

        onSubmit={async(values,actions)=>{
        //  signup(values);
        const back={
          username:values.Username,
        
        }
        // const token=AsyncStorage.getItem('token');
        // console.log(token)
        // await console.log(await AsyncStorage.getItem('token'))
         const backk=JSON.stringify(back);
        const params=JSON.stringify({username:'Hi'});
        const response=await axiosinst.put('http://47fa53e7c300.ngrok.io/api/update-profile/',backk,{
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
          }
             )
        .then( function(response){
          // console.log(response);
          // console.log(response.data.username)
          // console.log(response.username)
          Alert.alert('oops','نام کاربری شما با موفقیت تغییر کرد ',[{
            

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
            }])
          
          
        })
        .catch( function(error){
          // await console.log(AsyncStorage.getItem('token'))
            // console.log(error);
            // console.log(response)
            // console.log('eroor')
            // console.log('1111')
            // console.log(error)
            // console.log(error[0])
            // console.log(error.toString().split('\n')[0])
            // console.log(error.toString().split('\n')[0]==='Request failed with status code 400')
            // console.log('2222')
            if(error.toString().split('\n')[0]==='Error: Request failed with status code 400'){
              Alert.alert('oops','نام کاربری ای که انتخاب کردید تکراریه لطفا یکی دیگه امتحان کنید :)',[{
            

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
            }])
            }
            else
            {
              Alert.alert('oops','مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم',[{
            

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
            }])
            }

         
            
           
         
        })

      }}
     >
     {(props)=>(
     <View style={{alignItems:'center', marginTop:215,marginHorizontal:40}}>

     <Item style={styles.input}>

         <Input style={styles.Input} autoCapitalize='words' autoCorrect={true}
         onChangeText={props.handleChange('Username')}
         onBlur={props.handleBlur('Username')}
         value={props.values.Username}
         placeholder={name} placeholderTextColor='gray' style={{}}>
         </Input>
         <AntDesign name="user" size={24} color="#BFDBF7" style={styles.Icon} />
        
       </Item>
       <Text style={{fontSize:10, color:'red'}}>{props.touched.Username&&props.errors.Username}</Text>
      
       <View style={{flexDirection:'row',width:400,marginRight:10,marginLeft:10}}>
       
    
          
   
     <Button bordered rounded style={styles.button}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#E1E5F2', fontSize:15,fontWeight:'bold', marginHorizontal:60,marginLeft:70}}>تایید</Text>
        </Button>
      
     </View>
    
     </View>
       
       
     )}

     </Formik>
     <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
      initialValues={{Password:'',newPassword:'',repeatnewPassword:'' }}
      validationSchema={passschema}
      

        onSubmit={async(values,actions)=>{
        //  signup(values);
        // loggg();
        const back={
          
          old_password:values.Password,
          new_password:values.newPassword,
        
        }
        // console.log(back);
         const backk=JSON.stringify(back);
        const params=JSON.stringify({password:'12345',password2:'12345'});
        const response=axiosinst.put('http://47fa53e7c300.ngrok.io/api/change-password/',backk,{
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()},
          })
         
        .then( function(response){
          // console.log(response);
          // console.log(response.data.username)
          // console.log(response.username)
          Alert.alert('oops','رمزتون با موفقیت تغییر کرد',[{
            

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
          }])
      
          
          
        })
        .catch( function(error){
         
          // await console.log(AsyncStorage.getItem('token'))
            // console.log(error);
            if(error.toString().split('\n')[0]==='Error: Request failed with status code 400'){
              Alert.alert('oops','رمزتون رو اشتباه وارد کردید',[{
            

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
            }])
            }
            else
            {
              Alert.alert('oops','مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم',[{
            

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
            }])
            }
           
         
        })

      }}
     >
     {(props)=>(
     <View style={{alignItems:'center', marginTop:110,marginHorizontal:40}}>

     <Item style={styles.input}>

         <Input style={styles.Input} autoCapitalize='none' autoCorrect={false}
         secureTextEntry
         onChangeText={props.handleChange('Password')}
         onBlur={props.handleBlur('Password')}
         value={props.values.Password}
         placeholder="رمز خود را وارد کنید  ..." placeholderTextColor='lightgray'>
         </Input>
         <AntDesign name="user" size={24} color="#BFDBF7" style={styles.Icon} />
       
        
       </Item>
       <Text style={{fontSize:10, color:'red'}}>{props.touched.Password&&props.errors.Password}</Text>
       <Item style={styles.input}>
         <Input  style={styles.Input} 
          secureTextEntry
          autoCapitalize='none' autoCorrect={false}
         onChangeText={props.handleChange('newPassword')}
         value={props.values.newPassword}
         onBlur={props.handleBlur('newPassword')}
         placeholder="رمز جدید خود را وارد کنید ..." placeholderTextColor='lightgray'>
         </Input>
         <AntDesign name="lock" size={24} color="#BFDBF7"  style={styles.Icon}/>
       </Item>

    
      
       <Text style={{fontSize:10, color:'red'}}>{props.touched.newPassword&&props.errors.newPassword}</Text>

       
       <Item style={{}}>
         <Input  style={styles.Input} 
          secureTextEntry
          autoCapitalize='none' autoCorrect={false}
          onChangeText={props.handleChange('repeatnewPassword')}
          value={props.values.repeatnewPassword}
          onBlur={props.handleBlur('repeatnewPassword')}
          placeholder="رمز جدید خود را تکرار کنید" placeholderTextColor='lightgray'>
         </Input>
         <Feather name="check" size={24} color="#BFDBF7" style={styles.Icon} />
       </Item>
      
       <Text style={{fontSize:10, color:'red'}}>{props.touched.repeatnewPassword&&props.errors.repeatnewPassword}</Text>
       



  

      
       <View style={{flexDirection:'row',width:400,marginRight:10,marginLeft:10}}>
       
       
       
    
          
   
     <Button bordered rounded style={styles.button}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#E1E5F2', fontSize:15,fontWeight:'bold', marginHorizontal:60,marginLeft:70}}>تایید</Text>
        </Button>
      
     </View>
    
     </View>
       
       
     )}

     </Formik>
        
        {/* </View>
        </TouchableOpacity>
  */}
  {/* //<View style={{position:'absolute',marginTop:700,width:380,height:100}}> */}
   
        {/* </TouchableOpacity> */}
      
    {/* </ScrollView> */}
     
    <StatusBar backgroundColor='#BFDBF7' style='light' />
        </View>
        
   
        // {/* <Text>HI</Text>
        // </ScrollView> */}
    );
}

const styles = StyleSheet.create({
    container: {

      
      height:850,
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
        marginTop:80,
      
    },
    button:{
        position:'absolute',
        marginTop:30,
        marginLeft:10,
        width:170,
        backgroundColor:'#1f7a8c',
        borderColor:'#BFDBF7',
        marginLeft:112,
        borderRadius:17
        
      },
      Input:{
        fontSize:15,
        fontStyle:'normal',
        marginLeft:20
        
        
      },
//         input:{
//      marginTop:5,
//      marginLeft:5,
//      marginRight:5

     
//     // fontWeight:'100'
//   },
  });
  export default EditProfile;