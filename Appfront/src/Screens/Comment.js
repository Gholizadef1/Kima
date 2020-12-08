import React,{useState} from 'react';
import { StyleSheet, Text, View ,Image,ScrollView} from 'react-native';
import Commentcard from './Commentcard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet,Textarea} from 'native-base';
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
                   <Text style={{marginLeft:'41.5%',fontWeight:'bold',color:'black',marginTop:'5%',fontSize:16 }}>نظر شما؟</Text>
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

                

                 <Textarea style={{backgroundColor:'',borderColor:'black'}} rounded multiline={true} style={styles.Input} autoCapitalize='words' autoCorrect={true}
                onChangeText={props.handleChange('comment')}
                onBlur={props.handleBlur('comment')}
                value={props.values.comment}
                placeholder={'نظر شما چیست؟'} placeholderTextColor='gray' style={{}}>
              
                </Textarea>
           
        
       
           <Text style={{fontSize:10, color:'red'}}>{props.touched.comment&&props.errors.comment}</Text>
      
            <View style={{flexDirection:'row',width:400,marginRight:20,marginLeft:10}}>
       
    
          
   
     <Button bordered rounded style={{borderColor:'green',backgroundColor:'lightgreen'}}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#E1E5F2', fontSize:15,fontWeight:'bold', marginHorizontal:60,marginLeft:70}}>تایید</Text>
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
        <ScrollView>
           <Commentcard></Commentcard>
           <Commentcard></Commentcard>
           <Commentcard></Commentcard>
           <Commentcard></Commentcard>
   
      
           </ScrollView>
           
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

       <View style={{position:'absolute',marginTop:'175%',width:'100%'}}>

       <Button onPress={()=>bs.current.snapTo(0)} style={styles.addcomment}>

       <Text style={styles.nazar}>نظر شما چیست؟</Text>

       </Button>

       </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop:38
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
    }
  });
  export default Groups;