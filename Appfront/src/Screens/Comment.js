import React,{useState} from 'react';
import { StyleSheet, Text, View ,Image,ScrollView} from 'react-native';
import Commentcard from './Commentcard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet,Textarea, Content} from 'native-base';
import { TextInput } from 'react-native-paper';
import {Formik,formik} from 'formik';
import * as yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';

const commentschema=yup.object({

  comment:yup.string()
  .required("نظر شما نمیتواند خالی باشد")
})

const Comment = (prop) => {

  const response=async (searchTerm)=>{
    const id=prop.route.params.id
    console.log(id)
    try{
    const response = await axiosinst.get("bookdetail/"+id+'/comment')
    console.log('alakkii')
    console.log(response);
    }
  catch(err){
      // console.log(response)
     console.log(err);
    //   Alert.alert('oops',' حتما اشتباهی شده دوباره امتحان کن :)',[{
        

    //         Title:'فهمیدم',onPress:()=>console.log('alert closed')
    //         }])
    // }
  }
  }
  useFocusEffect(
    React.useCallback(() => {
      response();
        // //   console.log('Listenn')
        // alert('in')
        //   return() => alert('lost')
    },[])
   
    )
  const [showbutton,setshowbutton]=useState(true);
  console.log(prop.route.params.title)
  const[reset,setreset]=useState(false);
    const bs = React.createRef()
         const fall=new Animated.Value(1);
         const renderHeader=()=>{
            console.log('header')
            return(
              <View style={styles.header}>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} >
                <Image
               source={require('../../assets/line3.png')}
               style={{width:100,height:4,marginLeft:155}}
               ></Image>
                   <Text style={{marginLeft:'36%',fontWeight:'bold',color:'#1f7a8c',marginTop:'3%',fontSize:16 }}>نظر شما چیست؟</Text>
                </View>
              </View>
            </View>
          
           
            
              )
          }
         const renderInner=()=>{
            return(
              // console.log('inner');
            <View style={{backgroundColor:'#EDF2F4'}}>
      
      <Formik style={{}}
                initialValues={{comment:''}}
                validationSchema={commentschema}
                onSubmit={async(values,actions)=>{
                  console.log(await AsyncStorage.getItem('token'));
                 actions.resetForm();
                  console.log('sumbit')
                const back={
                 textcomment:values.comment,
        
                }
                const backk=JSON.stringify(back);
                
                axiosinst.post("bookdetail/"+prop.route.params.id+'/comment',backk,{"headers":
               {
                "Content-Type":"application/json",
                "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
               }})
              .then(async function(response){
                  console.log(response);
         
                })
              .catch(function(error){
            console.log(error);
         
        })
               
                const params=JSON.stringify({username:'Hi'});
         
                }}
                 >
            {(props)=>(
            <View>

                
              <View style={{marginHorizontal:30,borderColor:'red',marginTop:10}}>
            <Textarea rowSpan={7.5} bordered borderRadius={8} 
                onChangeText={props.handleChange('comment')}
                onBlur={props.handleBlur('comment')}
                value={props.values.comment}
                placeholder={'  نظر شما ...    '} placeholderTextColor='black' fontSize={16} style={{backgroundColor:'white'}}>
              
                </Textarea>
                </View>
        
       
           <Text style={{fontSize:10, color:'red',marginLeft:'10%'}}>{props.touched.comment&&props.errors.comment}</Text>
      
            <View style={{flexDirection:'row',width:'100%',marginRight:20,marginLeft:10}}>
       
    
          
   
     <Button bordered rounded style={{backgroundColor:'#1F7A8C',borderRadius:18,height:'50%',width:'40%',marginLeft:'28%',marginBottom:'8%',marginTop:'0.5%'}}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#ffff', fontSize:15,fontWeight:'bold',marginLeft:'85%',width:'100%'}}>ثبت</Text>
        </Button>
      
     </View>
    
     </View>
       
       
     )}

     </Formik>  
      
            
              </View>
            )
          }
    return(
      <View style={styles.container}>
      <BottomSheet style={{position:''}}
      
     snapPoints={['40%', 0, 0]}
    ref={bs}
    initialSnap={1}
    callbackNode={fall}
    enabledGestureInteraction={true}
    enabledContentTapInteraction={false}
    onCloseEnd={()=>{setshowbutton(true) }}
   //  isBackDropDismisByPress={true}
    renderContent={renderInner}
    renderHeader={renderHeader}            
       // style={{position:'absolute',height:200,width:250,marginTop:400}}
    backgroundColor={'#edf2f4'}

/>
<Animated.View style={{
  
     opacity: Animated.add(0.5, Animated.multiply(fall, 1.0)),
 }}>

     <ScrollView  style={{}} showsVerticalScrollIndicator={false}>
        <Commentcard name={'سارا'} date={'1/1/99'} likenumber={1000} dislikenumber={10} comment={'خوب بود'}></Commentcard>
        <Commentcard name={'آیدا'} date={'1/1/99'} likenumber={50} dislikenumber={10} comment={'خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بودخوب بود خوب بود خوب بود خوب بود د خوب بود خوب بود خوب بود خوب بود خوب بود خوب بودخوب بود خوب بود خوب بود خوب بودخوب بود'}></Commentcard>
        <Commentcard name={'sssss'} date={'1/1/99'} likenumber={1000} dislikenumber={10} comment={'awesommmmmmmmmmme'}></Commentcard>
        <Commentcard  name={'ee'} date={'1/1/99'} likenumber={ 10} dislikenumber={10} comment={' خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بودخوب بود خوب بود خوب بود خوب بود د خوب بود خوب بود خوب بود خوب بود خوب بود خوب بودخوب بود خوب بود خوب بود خوب بود eeeeeخوب بود'} ></Commentcard>
        <Commentcard  name={'mmmmm'} date={'1/1/99'} likenumber={ 10} dislikenumber={10} comment={' خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بودخوب بود خوب بود خوب بود خوب بود د خوب بود خوب بود خوب بود خوب بود خوب بود خوب بودخوب بود خوب بود خوب بود خوب بود  بود'} ></Commentcard>
        <Commentcard name={'bbbbb'} date={'1/1/99'} likenumber={1000} dislikenumber={10} comment={'awesommmmmmmmmmme'}></Commentcard>
        <Commentcard  name={'ss'} date={'1/1/99'} likenumber={ 10} dislikenumber={10} comment={' ددددددددددددددددددددددددددددددددددددددددخوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بود خوب بودخوب بود خوب بود خوب بود خوب بود د خوب بود خوب بود خوب بود خوب بود خوب بود خوب بودخوب بود خوب بود خوب بود خوب بود eeeeeخوب بود'} ></Commentcard>
      
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
     
  
  
   
        </ScrollView>
        
        {/* <View style={{position:'absolute',marginTop:'160%',width:'100%'}}></View> */}

    
   

   

    
    </Animated.View>
   

    {showbutton?<Button style={styles.addcomment}
    onPress={()=>{
     setshowbutton(false) 
      bs.current.snapTo(0)
      }}
    >

    <Text style={styles.nazar}>نظر شما چیست؟</Text>

    </Button>
    :null}
  

     </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#B8B8B8',
      backgroundColor:'#ffff',
      marginTop:2
    }, 
    addcomment:{
    
        width:'70%',
        marginHorizontal:'15%',
        marginTop:'160%',
        position:'absolute',
        borderRadius:17,
        backgroundColor:'#1F7A8C'
    },
    nazar:{
        marginLeft:'33%',
        fontWeight:'bold',
        color:'#EDF2F4'
    },
    panel: {
      padding: 20,
      backgroundColor: '#edf2f4',
      paddingTop: 20,
      shadowColor: 'black',
      borderTopColor:'black',
      shadowOpacity: 0.5,
    
    },
    header: {
      backgroundColor: '#EDF2F4',
      shadowColor: 'black',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 20,
      shadowOpacity: 0.5,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopColor:'black',
      borderTopRightRadius: 20,
    },
    panelHeader: {
      borderTopColor:'black',
  
    },
  });
  export default Comment;