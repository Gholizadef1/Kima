import React, { useState, useEffect, useDebugValue } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList , TextInput, TouchableOpacity  } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Card, List, ListItem, Thumbnail , Item, Input, Textarea } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import {Formik,formik} from 'formik';
import * as yup from 'yup';

const userschema=yup.object({
  
    Discription:yup.string()
    .required(" متن شما نمیتواند خالی باشد")
  
  })

const DiscussionPage = (prop) => {

    const [modalVisible, setModalVisible] = useState(false);
    const discussionid = prop.route.params.id;
    console.log(discussionid)

    return(
        <View>
            <Text style ={{fontSize:60}}>Discussion</Text>
            <Modal transparent={true} StatusBar={{backgroundColor:'blue'}} style={{bottom:100,margin:20,position:'absolute'}} visible={modalVisible} animationType='fade' >
  
  <View style={styles.centeredView}>
  <View style={styles.modalView}>
<TouchableOpacity  style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%'),height:hp('5%'),width:wp('8%'),backgroundColor:'white',position:'absolute'}} onPress={()=>setModalVisible(false)}>
  <AntDesign style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%')}} onPress={()=>setModalVisible(false)}
   name="close" size={23} color="#D75A5A" />
   </TouchableOpacity>       
<Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
initialValues={{Discription:''}}
validationSchema={userschema}  

// onSubmit={async(values,actions)=>{
//     console.log('ON SUBMIT')
//     const formdata = new FormData();
//      formdata.append('title',values.Username)
//      formdata.append('description',values.Discription)

//   console.log(formdata.data+'formdata')

//   const response=await axiosinst.post('/group/'+ prop.route.params.id +'/discussion',formdata,{
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
//     }
//        )
//   .then( function(response){
//     console.log(picture+' PICTURE POST')
  
//     console.log(response)
//     Alert.alert('','بحث با موفقیت ساخته شد ',[
//       {
//    text:'فهمیدم',style:'default',onPress:()=>console.log('alert closed')
//       }
//       ],{cancelable:false},{style:{height:50}})

//     getDiscussion();
    
//   })
//   .catch( function(error){  
//       {
//         console.log(error)
      
//         Alert.alert('','مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم',[{
      

//       text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
//       }],{cancelable:false},{style:{height:50}})
//       }     
//   })

// }}
>
{(props)=>(
<View style={{ marginTop:hp('5%')}}>
<View style={{borderColor:'blue'}}>



</View>
<View>
  <Text style={{fontSize:hp('2.5%'),fontWeight:'bold', color:'#1f7a8c',marginBottom:hp('-5%'),marginTop:hp('5%'),marginLeft:wp('1%')}}>متن خود را وارد کنید</Text>
  <TouchableOpacity>
          <Textarea rowSpan={hp('1%')} bordered borderRadius={8}
            borderColor={'lightgray'}
            onChangeText={props.handleChange('Discription')}
            onBlur={props.handleBlur('Discription')}
            value={props.values.Discription}                 
            placeholder={' پیام شما ...'}  placeholderTextColor='gray' fontSize={hp('1.8%')}  style={styles.item2}>
          </Textarea>
          </TouchableOpacity>
          <Text style={{fontSize:hp('1.2%'),marginTop:hp('0.5%'), color:'red'}}>{props.touched.Discription&&props.errors.Discription}</Text>
        </View>     
   <Button bordered rounded style={styles.button}
 onPress={props.handleSubmit}
 >
   <Text style={{color:'#E1E5F2', fontSize:hp('1.8%'),fontWeight:'bold',left:wp('11%'),width:wp('40%')}}> ارسال پیام</Text>
  </Button>    
</View>
)}
</Formik>  
  </View>
  </View>
  </Modal>
  <Button onPress={() => setModalVisible(true)} style={{
              marginLeft: wp('28%'), width: 180, borderRadius: 20, marginTop: hp('70%')
                , backgroundColor: '#1F7A8C'
                }}>
              <Text style={{ marginLeft: wp('15%'), fontSize: 15, fontWeight: 'bold', color: 'white' }}> ارسال پیام </Text>
            </Button>

            {/* <TouchableOpacity>
                <MaterialIcons name="send" size={24} color="black" style={{}} />
            </TouchableOpacity> */}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex:1 ,
        backgroundColor: '#fff' ,
        alignItems :'center' ,
        justifyContent: 'center'
    },
    input: {
        borderWidth:1 ,
        borderColor: '#777' ,
        padding: 13,
        marginTop:hp('71')
    },
    kima: {
        color: '#1F7A8C',
        marginTop: hp('8%'),
        marginLeft: wp('5%'),
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute'
      },
      backpic: {
    
        width: wp('100%'),
        height: hp('32%')
      },
      avatar: {
        elevation: 20,
        marginTop: hp('-10%'),
        marginLeft: wp('20%')
    
      },
      groupname: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: wp('19%'),
        marginTop: hp('3%'),
      },
      centeredView: {
        height:hp('40%'),
        marginTop:hp('15%'),
      },
      button:{
        marginTop:hp('1%'),
        alignSelf:'center',
        width:wp('41%'),
        backgroundColor:'#1f7a8c',
        borderColor:'#BFDBF7',
        borderRadius:50
        
      },
      modalView: {
        margin: 13,
        marginTop:20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        height:hp('65%'),
        elevation: 300
      },
      // avatar: {
      //   height: hp('14%'),
      //   marginTop:hp('-1.5%'),
      //   width: wp('28%'),
      //   marginLeft:wp('-1%'),
      //   borderRadius: 20,
      //   position:'absolute'
      // },
      loader:{
      alignItems:'center',
      marginBottom:hp('5%'),
      justifyContent:'center',
      alignSelf:'center',
      marginTop:hp('10%')
    },
    Input:{
      left:wp('8%'),
      fontSize:hp('1.5%'),
      fontWeight:'bold',
      marginRight:wp('10%'),
      position:'absolute',
      height:wp('9.5%'),
      width:wp('31.5%')
    },
    item2:{
      marginLeft:wp('-2%'),
      marginRight:wp('-1%'),
      marginTop:hp('6%'),
      fontSize:hp('2.5%')
    },
    item:{
      marginLeft:wp('-2%'),
      marginRight:wp('45%'),
      height:wp('9.5%') 
    }
})
export default DiscussionPage;