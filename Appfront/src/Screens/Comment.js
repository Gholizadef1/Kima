import React from 'react';
import { StyleSheet, Text, View ,Image,ScrollView} from 'react-native';
import Commentcard from './Commentcard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet} from 'native-base';
import { TextInput } from 'react-native-paper';
import {Formik,formik} from 'formik';
import * as yup from 'yup';


const commentschema=yup.object({

    comment:yup.string()
    .required("نظر شما نمیتوناد خالی باشد")
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
                
                  <Image
               source={require('../../assets/line3.png')}
               style={{width:100,height:5,marginLeft:155,marginTop:10}}
               ></Image>
                  <Text style={{marginLeft:'40%',fontWeight:'bold',color:'black',marginTop:'5%',fontSize:16 }}>نظر شما؟</Text>
                  </View>
              </View>
      
              </View>
              )
          }
         const renderInner=()=>{
            return(
              // console.log('inner');
            <View style={{backgroundColor:'white'}}>
            <TextInput style={{height:200}} underlineColorAndroid={'green'} placeholderTextColor={'blue'}></TextInput>
             
               <Formik></Formik>
               <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
                initialValues={{comment:''}}
                validationSchema={commentschema}
      

                onSubmit={async(values,actions)=>{
     
                const back={
                 username:values.comment,
        
                }

                const backk=JSON.stringify(back);
                const params=JSON.stringify({username:'Hi'});
            //     const response=await axiosinst.put(' http://aef3d2c5594f.ngrok.io/api/update-profile/',backk,{
            //     headers:{
            //     "Content-Type":"application/json",
            //     "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
            //     }
            //  )
            //     .then( function(response){
            //     })
            //     .catch( function(error){
         
            //      })

            //      }}
                }}
                 >
            {(props)=>(
            <View style={{alignItems:'center', marginTop:215,marginHorizontal:40}}>

              <Item style={styles.input}>    

                 <Input style={styles.Input} autoCapitalize='words' autoCorrect={true}
                onChangeText={props.handleChange('Username')}
                onBlur={props.handleBlur('Username')}
                value={props.values.comment}
                placeholder={name} placeholderTextColor='gray' style={{}}>
                </Input>
            <AntDesign name="user" size={24} color="#BFDBF7" style={styles.Icon} />
        
          </Item>
           <Text style={{fontSize:10, color:'red'}}>{props.touched.comment&&props.errors.comment}</Text>
      
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
      
              
              
              </View>
            )
          }
    return(
   
       
  
        <View style={styles.container}>
         <BottomSheet style={{position:''}}
         
        snapPoints={['35%', 0, 0]}
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
        opacity: Animated.add(0.2, Animated.multiply(fall, 1.0)),
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
      marginTop:38,
      height:1000
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