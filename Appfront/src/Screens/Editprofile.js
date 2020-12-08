import React,{useContext,useState,useRef, useEffect} from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Avatar } from 'react-native-paper';
// import { State } from 'react-native-gesture-handler';
import App from '../../App';
import AuthContext,{AuthProvider} from '../context/Authcontext';
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
import { useFocusEffect } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';







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
  const [picture,setpicture]=useState(null);
  const photoresponse=async ()=>{
    console.log('**'+'\n'+'PHOTRESPONSE'+'\n'+'**')
    const id=await AsyncStorage.getItem('id');
    // console.log(id)
    try{
    const response = await axiosinst.get("/api/user-profile/"+id)
        
    
  //  console.log(response)
  console.log('*****')
        console.log(`http://aef3d2c5594f.ngrok.io${response.data.profile_photo}`)
        setpicture(`http://aef3d2c5594f.ngrok.io${response.data.profile_photo}`)
        console.log(picture)
      
   console.log(response.data.profile_photo)
   console.log(!(picture==="http://aef3d2c5594f.ngrok.io/media/default.jpg"))
   console.log(picture===null)
  //  setimage(require(response.data.profile_photo))
  setname(response.data.username);

}
catch(err){
     console.log(err);
    Alert.alert('oops',' مشکلی پیش اومده دوباره امتحان کن :)',[{
        

            Title:'فهمیدم',onPress:()=>console.log('alert closed')
            }])
}
}
useFocusEffect(
  React.useCallback((picture) => {
      photoresponse();
      //   console.log('Listenn')
      alert('in')
        return() => alert('lost')
  },[])
 
  )
// useEffect(()=>{photoresponse(),[]})
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
          const response=await axiosinst.put('/api/update-profile/',formdata,{
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
            console.log('*************')
            console.log('\n')
            const a=response.data.profile_photo
            console.log(picture)
            setpicture(a);

           
            console.log(picture);
            console.log('\n'+'this')
            console.log(response.data.profile_photo)
            console.log('***********')

          
            
          })
          .catch( function(error){
            console.log(error)
          })
          // photoresponse();
          // setimage(data.uri);
         
     
          }
           //bs.current.snapTo(0);
      }
      else
      {
        Alert.alert('oops',' برای انتخاب از گالری باید اجازه دسترسی به گالریتون رو به ما بدید',[{
          Title:'فهمیدم',onPress:()=>console.log('alert closed')
          }])
      }
  
  }
  // await console.log(await AsyncStorage.getItem('token'));
  // console.log('cameraaa')
  // const {granted}=await permissions.askAsync(permissions.CAMERA)
  //   if(granted){
  //       console.log(granted)
  //       let data=await ImagePicker.launchCameraAsync({
  //         mediaTypes:ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing:true,
  //         // aspect:[1,1],
  //         quality:1
  //       })
  // let data=await ImagePicker.launchCameraAsync({
  //   mediaTypes:ImagePicker.MediaTypeOptions.Images,
  //   allowsEditing:true,
  //   // aspect:[1,1],
  //   quality:1
  // })
  const pickfromcamera = async ()=>{
    await console.log(await AsyncStorage.getItem('token'));
    console.log('cameraaa')
    const {granted}=await permissions.askAsync(permissions.CAMERA)
      if(granted){
          console.log(granted)
          let data=await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            // aspect:[1,1],
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
          const response=await axiosinst.put('/api/update-profile/',formdata,{
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
            console.log('*************')
            console.log('\n')
            const a=response.data.profile_photo
            console.log(picture)
            setpicture(a);
            console.log(picture)
           
            console.log(picture);
            console.log('\n'+'this')
            console.log(response.data.profile_photo)
            console.log('***********')

          
            
          })
          .catch( function(error){
            console.log(error)
          })
          // photoresponse();
          // setimage(data.uri);
         
     
          }
           //bs.current.snapTo(1);
      }
      else
      {
        Alert.alert('oops',' برای گرفتن عکس باید اجازه دسترسی به دوربینتون رو به ما بدید',[{
          Title:'فهمیدم',onPress:()=>console.log('alert closed')
          }])
      }
   
  }
  
// loggg();
   
    // const val = useContext(AuthContext);  
    //nd
   
    const [name,setname]=useState(null);
  
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
        
        onPress={async()=>await pickfromcamera()}
        style={{marginLeft:86,marginTop:50,borderColor:'#BFDBF7',backgroundColor:'#1F7A8C',borderRadius:15}}
        >

         <Text style={{color:'white', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:84}
         }>گرفتن عکس</Text>
        </Button>

        <Button
         bordered rounded style={styles.button}
        onPress={async()=>await pickfromgallery()}
        style={{marginLeft:86,marginTop:30,borderColor:'#BFDBF7',backgroundColor:'#1F7A8C',borderRadius:15}}
        >

         <Text style={{color:'white', fontSize:15,fontWeight:'bold', alignItems:'center',marginHorizontal:72}
         }>انتخاب از گالری</Text>
        </Button>
      
        </View>
      )
    }
         const bs = React.createRef()
         const fall=new Animated.Value(1);
        console.log('2222')
       

// const[pic,setpic]=useState('http://3097034fddc8.ngrok.io/media/profile_photos/test_spQxL7A.jpg')
    return(
      
        <View style={styles.container}>
      
        <BottomSheet
             snapPoints={[380, 0, 0]}
            ref={bs}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
            enabledContentTapInteraction={false}
            renderContent={renderInner}
            renderHeader={renderHeader}            
               // style={{position:'absolute',height:200,width:250,marginTop:400}}
            backgroundColor={'white'}
        
       />
       <Animated.View style={{
        opacity: Animated.add(0.4, Animated.multiply(fall, 1.0)),
    }}>
        
        <View style={{position:'absolute',height:150,width:150,marginTop:30,marginLeft:128,borderRadius:100}}>
        <TouchableOpacity style={{}}
         onPress={async()=>await bs.current.snapTo(0)}>
      {picture==='http://aef3d2c5594f.ngrok.io/media/default.png'?<ImageBackground borderRadius={100}
      
        source={require('../../assets/avatar.png')}
        style={{height:150,width:150,borderRadius:100}}
        
        >

        </ImageBackground>:<ImageBackground borderRadius={100}
      
      source={{uri:picture}}
      style={{height:150,width:150,borderRadius:100}}
      
      >

      </ImageBackground>}
      {/* <Feather style={{position:'absolute',Top:'70%',Left:'40%',
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }} name="camera" size={24} color="black" /> */}
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
        const response=await axiosinst.put('/api/update-profile/',backk,{
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
        const response=axiosinst.put('/api/change-password/',backk,{
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
    </Animated.View>
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
  // React.memo(EditProfile);
  export default EditProfile;