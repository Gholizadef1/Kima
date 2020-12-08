import React,{useState} from 'react';
import { StyleSheet, Text, View ,Image,ScrollView} from 'react-native';
import Commentcard from './Commentcard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet,Textarea, Content} from 'native-base';
import { TextInput } from 'react-native-paper';
import {Formik,formik} from 'formik';
import * as yup from 'yup';

const commentschema=yup.object({

  comment:yup.string()
  .required("نظر شما نمیتواند خالی باشد")
})

const Groups = () => {
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
               style={{width:100,height:5,marginLeft:155}}
               ></Image>
                   <Text style={{marginLeft:'36%',fontWeight:'bold',color:'black',marginTop:'5%',fontSize:16 }}>نظر شما چیست؟</Text>
                </View>
              </View>
            </View>
          
           
            
              )
          }
         const renderInner=()=>{
            return(
              // console.log('inner');
            <View style={{backgroundColor:'white'}}>
      
      <Formik style={{}}
                initialValues={{comment:''}}
                validationSchema={commentschema}
                onSubmit={async(values,actions)=>{
                  console.log('sumbit')
                const back={
                 username:values.comment,
        
                }
                

                const backk=JSON.stringify(back);
                const params=JSON.stringify({username:'Hi'});
         
                }}
                 >
            {(props)=>(
            <View>

                
              <View style={{marginHorizontal:30,borderColor:'red',marginTop:'5%'}}>
            <Textarea rowSpan={6} bordered borderRadius={20}
                onChangeText={props.handleChange('comment')}
                onBlur={props.handleBlur('comment')}
                value={props.values.comment}
                placeholder={'نظر شما ...    '} placeholderTextColor='lightgray' fontSize={16} style={{}}>
              
                </Textarea>
                </View>
        
       
           <Text style={{fontSize:10, color:'red',marginLeft:'10%'}}>{props.touched.comment&&props.errors.comment}</Text>
      
            <View style={{flexDirection:'row',width:'100%',marginRight:20,marginLeft:10}}>
       
    
          
   
     <Button bordered rounded style={{backgroundColor:'#1F7A8C',borderRadius:18,height:'50%',width:'40%',marginLeft:'28%',marginBottom:'8%',marginTop:'3%'}}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#ffff', fontSize:15,fontWeight:'bold',marginLeft:70}}>ثبت</Text>
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
   //  isBackDropDismisByPress={true}
    renderContent={renderInner}
    renderHeader={renderHeader}            
       // style={{position:'absolute',height:200,width:250,marginTop:400}}
    backgroundColor={'white'}

/>
<Animated.View style={{
  
     opacity: Animated.add(1.0, Animated.multiply(fall, 1.0)),
 }}>

     <ScrollView   showsVerticalScrollIndicator={false}>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
        <Commentcard></Commentcard>
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
        
      

    <View style={{position:'absolute',marginTop:'175%',width:'100%'}}>
   

    <Button style={styles.addcomment}
    onPress={()=>bs.current.snapTo(0)}
    >

    <Text style={styles.nazar}>نظر شما چیست؟</Text>

    </Button>

    </View>
    </Animated.View>

     </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop:35
    }, 
    addcomment:{
    
        width:'70%',
        marginHorizontal:'15%',
        
        borderRadius:17,
        backgroundColor:'#1F7A8C'
    },
    nazar:{
        marginLeft:'33%',
        fontWeight:'bold',
        color:'#ffff'
    },
    panel: {
      padding: 20,
      backgroundColor: 'white',
      paddingTop: 20,
      shadowColor: 'black',
      borderTopColor:'black',
      shadowOpacity: 0.5,
    
    },
    header: {
      backgroundColor: 'white',
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
  export default Groups;