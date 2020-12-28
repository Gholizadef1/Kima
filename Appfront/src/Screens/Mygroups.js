import React,{useState} from 'react';
import { StyleSheet, Text, View ,Modal,ImageBackground,Alert} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Item, Segment, Content,Input,Label,Textarea } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import Eachgroup from './Eachgroup';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import {Formik,formik} from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


const userschema=yup.object({

  Username:yup.string()
  .required("اسم گروه نمیتواند خالی باشد")
  .min(3, "اسم گروه نمیتواند کم تر از 3 حرف باشد"),

  Discription:yup.string()
  .required("توضیحات گروه نمیتواند خالی باشد")
  // .min(4, "نام کاربری نمیتواند کم تر از 4 حرف باشد"),

  // photo:yup.string()
  // .required("لطفا نام کاربری جدید خود را وارد کنید")
  // .min(4, "نام کاربری نمیتواند کم تر از 4 حرف باشد"),

})

const Mygroups = () => {

  const [picture,setpicture]=useState('../../assets/backprof5j.jpeg');

  const pickfromgallery = async (props,change)=>{
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

          formdata.append('photo',newfile)
          
          if(data.cancelled===false){
          const back={        
            photo:data
          }
           const backk=JSON.stringify(back);
           console.log(props.values.photo+'formik photo1')
            // props.values.photo="{uri:"+data.uri+'}'
           props.values.photo=data.uri
           //baraye in ke rerender beshe va photo formik form taghir kone
        
             props.handleChange('photo')
             setpicture(data.uri)
             console.log(picture+'  PICTURE')
            // change(data.uri)
           console.log(props.values.photo+'formik photo2')
           
          // const response=await axiosinst.put('http://6124bc8043de.ngrok.io/api/update-profile/',formdata,{

          //   headers:{
          //     "Content-Type":"application/json",
          //     "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
          //   }
          //      )
          // .then( function(response){
          //   const a=response.data.profile_photo
          //   setpicture(a);
            
          // })
          // .catch( function(error){
          //   console.log(error)
          // })
         
          }
      }
      else
      {
        Alert.alert('oops',' برای انتخاب از گالری باید اجازه دسترسی به گالریتون رو به ما بدید',[{
          Title:'فهمیدم',onPress:()=>console.log('alert closed')
          }])
      }
  
  }

    const [modalopen,setmodalopen]=useState(false)
    const [selectedValue, setselectedValue] = useState('none')
    const [information, setinformation] = useState(['as;df']);
    return(
     
     
    
        <View style={styles.container}>
        <View style={{}}>
       <Modal    transparent={true} StatusBar={{backgroundColor:'blue'}} style={{bottom:100,margin:20,position:'absolute'}} visible={modalopen} animationType='fade' >
        
        {/* <StatusBar backgroundColor='#BFDBF7' style='light' /> */}
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        {/* <View style={{alignSelf:'flex-end',top:hp('1%'),right:hp('1%'),backgroundColor:'blue'}}> */}
      <TouchableOpacity  style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%'),height:hp('5%'),width:wp('8%'),backgroundColor:'white',position:'absolute'}} onPress={()=>setmodalopen(false)}>
        <AntDesign style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%')}} onPress={()=>setmodalopen(false)}
         name="close" size={23} color="#D75A5A" />
         </TouchableOpacity>
       {/* </View> */}
        {/* <Text>Hi im in modall :)))))</Text> */}
       
     <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
      initialValues={{Username:'',Discription:'',photo:require('../../assets/backprof5j.jpeg')}}
      validationSchema={userschema}

      onSubmit={async(values,actions)=>{
          console.log('ON SUBMIT')
          const formdata = new FormData();
          formdata.append('title',values.Username)
          formdata.append('summary',values.Discription)
          formdata.append('photo',picture)
        // const back={
        //   username:values.Username,
        //   discription:Discription,
        //   groupimage:picture
        
        // }
      
        //  const backk=JSON.stringify(back);
        // const params=JSON.stringify({username:'Hi'});
        console.log(formdata.data+'formdata')

        const response=await axiosinst.post('http://a32f717e71fe.ngrok.io/api/grup',formdata,{
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
          }
             )
        .then( function(response){
          console.log(response)
          Alert.alert('','گروه با موفقیت ساخته شد ',[
            {
         text:'فهمیدم',style:'default',onPress:()=>console.log('alert closed')
            }
            ],{cancelable:false},{style:{height:50}})
          
          
        })
        .catch( function(error){  
            {
              console.log(error)
            
              Alert.alert('','مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم',[{
            

            text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
            }],{cancelable:false},{style:{height:50}})
            }     
        })

      }}
     >
      {(props)=>(
     <View style={{ marginTop:hp('5%')}}>
     <View style={{}}>
     {props.values.photo===require('../../assets/backprof5j.jpeg')?<TouchableOpacity style={styles.avatar}
       onPress={() => { pickfromgallery(props)}}>
      <ImageBackground borderRadius={20}
        
         source={props.values.photo}
         
         style={styles.avatar}
        //  onBlur={props.handleBlur('photo')}
     

       >

         </ImageBackground>
     </TouchableOpacity>:<TouchableOpacity style={styles.avatar}
       onPress={() => { pickfromgallery(props,props.handleChange)}}>
      <ImageBackground borderRadius={20}
        
         source={{uri:`${props.values.photo}`}}
         onChangeItem={props.handleChange('photo')}
         style={styles.avatar}
        //  onBlur={props.handleBlur('photo')}
     

       >

         </ImageBackground>
     </TouchableOpacity>}
    
     <Text style={{fontSize:hp('1.5%'),fontWeight:'bold', color:'#1f7a8c',marginBottom:hp('1%'),marginLeft:wp('33%')}}>نام گروه</Text>
     <Item style={styles.item} rounded >
     {/* <Label style={{fontWeight:'bold'}}>نام گروه</Label> */}
     
     <Input  style={styles.Input} autoCapitalize='words' autoCorrect={true}
         onChangeText={props.handleChange('Username')}
         onBlur={props.handleBlur('Username')}
         value={props.values.Username}
         placeholder={''} placeholderTextColor='gray' >
         </Input>
         <MaterialCommunityIcons name="account-group" size={hp('2.8%')} style={{left:wp('2%')}} color="#BFDBF7" />
       
  <Text style={{fontSize:hp('1.2%'),marginLeft:wp('-3.5%'),marginTop:hp('7%'), color:'red'}}>{props.touched.Username&&props.errors.Username}</Text>
      </Item>
    
      </View>
     
     {/* <Label style={{fontWeight:'bold'}}>نام گروه</Label> */}
   
     <View style={styles.item2}>
        <Text style={{fontSize:hp('1.5%'),fontWeight:'bold', color:'#1f7a8c',marginBottom:hp('1%'),marginLeft:wp('1%')}}>توضیحات</Text>
                <Textarea rowSpan={7.5} bordered borderRadius={8}
                  borderColor={'lightgray'}
                  onChangeText={props.handleChange('Discription')}
                  onBlur={props.handleBlur('Discription')}
                  value={props.values.Discription}
              
                  placeholder={'  '}  placeholderTextColor='black' fontSize={hp('1.6.5%')}  style={{ backgroundColor: 'white',fontSize:hp('1.5%')}}>

                </Textarea>
                <Text style={{fontSize:hp('1.2%'),marginTop:hp('0.5%'), color:'red'}}>{props.touched.Discription&&props.errors.Discription}</Text>
              </View>


     {/* <Input  style={styles.Input} autoCapitalize='words' autoCorrect={true}
         onChangeText={props.handleChange('Username')}
         onBlur={props.handleBlur('Username')}
         value={props.values.Username}
         placeholder={''} placeholderTextColor='gray' >
         </Input>
         <MaterialCommunityIcons name="account-group" size={hp('2.8%')} style={{left:wp('2%')}} color="#BFDBF7" /> */}
       
     
         <Button bordered rounded style={styles.button}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#E1E5F2', fontSize:hp('1.8%'),fontWeight:'bold',left:wp('11%'),width:wp('40%')}}>ساخت گروه</Text>
        </Button>

       {/* <View style={{flexDirection:'row',width:wp('98%'),marginRight:10,marginLeft:10}}>
       
       
      
     </View> */}
    
     </View>
       
       
     )}

     </Formik>
    
        </View>

        </View>
        </Modal>
    
        </View>
        <Button style={{position:'absolute', justifyContent:'center',height:hp('7%'),width:wp('14%'),borderRadius:1000,backgroundColor:'#1f7a8c',elevation:5,marginTop:hp('77%'),marginLeft:wp('78%')}} onPress={()=>setmodalopen(true)} >
        <Feather style={styles.plus} 
         name="plus" size={32} color="#EDF2F4" />
     
         </Button>

         <View style={{marginLeft:wp('2%')}}>

         { (information.length>=0) ?    <DropDownPicker
          items={[
            { label: 'معروف ترین گروه ها', value: 'none' },
            { label: 'جدید ترین گروه ها', value: 'like' },
          ]}
          defaultValue={selectedValue}
          labelStyle={{fontSize:wp('3%')}}
          containerStyle={{ height: 40, width: 220, marginBottom: hp('2%') }}
          style={{
          
            borderColor:'#1f7a8c',backgroundColor: '#fafafa', marginTop: hp('2%'), width: wp('50%'), marginBottom: hp('-5%'), position: 'absolute', borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('3%')
          }}
          itemStyle={{
          
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa',
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30,marginTop:hp('2%'), marginLeft: wp('3%'), width: wp('50%'), position: 'absolute', marginBottom: hp('10%') }}
          onChangeItem={async (item) => {

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              await setlikeotime('/comment-filter-time')
        
            }
            else if (item.value === 'like') {
              console.log('tolike')
              console.log(item.value + 'VALUE')
              await setlikeotime('/comment-filter-like')
         
            }



          }}

        />:null}
        <TouchableOpacity onPress={()=>console.log('aladkki')}>
         <Eachgroup></Eachgroup>
         </TouchableOpacity>
         <Eachgroup></Eachgroup>
         <Eachgroup></Eachgroup>
         <Eachgroup></Eachgroup>
         </View>
            {/* <Text>
                Mygroups
            </Text> */}
        </View>
   
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    item2:{
      marginLeft:wp('-2%'),
      marginRight:wp('-1%'),
      marginTop:hp('6%'),
      height:wp('9.5%'),
      fontSize:hp('2.5%')
    
    },
    item:{
      marginLeft:wp('31%'),
      marginRight:wp('5%'),
      // marginTop:hp('1%'),
      height:wp('9.5%')
      
      
    },
    Input:{
      // fontSize:hp('1.8%'),a
      // fontStyle:'normal',
      // height:wp('1%')
      // marginLeft:wp('31%'),
      // marginRight:wp('31%'),
      // left:wp('42%'),
      left:wp('8%'),
      fontSize:hp('1.5%'),
      fontWeight:'bold',
      marginRight:wp('10%'),
      // marginTop:hp('1%'),
      position:'absolute',
      height:wp('9.5%'),
      //  backgroundColor:'green',
       width:wp('31.5%')
    },
    button:{
      // position:'absolute',
      marginTop:hp('26%'),
    
      alignSelf:'center',
      width:wp('41%'),
      backgroundColor:'#1f7a8c',
      borderColor:'#BFDBF7',
      // marginLeft:wp('18%'),
      borderRadius:50
      
    },
    plus:{
      
      alignSelf:'center',
      justifyContent:'center'
    
    },
    centeredView: {
      // flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
       height:hp('40%'),
      marginTop:hp('15%'),
      // marginBottom:hp('10%')
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 35,
       height:hp('65%'),
   
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      elevation: 300
    },
    avatar: {
      height: hp('14%'),
      marginTop:hp('-1.5%'),
      width: wp('28%'),
      marginLeft:wp('-1%'),
      borderRadius: 5,
      position:'absolute'
    },
  });
  export default Mygroups;