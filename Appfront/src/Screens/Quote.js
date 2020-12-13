import React,{useState} from 'react';
import { StyleSheet, Text, View ,Image,FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Quotecrad from './Quotecard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet,Textarea, Content} from 'native-base';
import * as yup from 'yup';
import {Formik,formik} from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const commentschema=yup.object({

  comment:yup.string()
  .required("نقل قول شما نمیتواند خالی باشد")
  .test('line',"حداکثر تعداد خط مجاز 11 خط است",(val=>val.toString().split('\n').length<=11))
})

const Quote = (prop) => {
  const [like,setlike]=useState('gray')

  const [information,setinformation]=useState([]);

  const response=async ()=>{
    console.log('DOVOM')
     const id=prop.route.params.id
     console.log(id) 
     try{
 
     const response = await axiosinst.get('api/quotes/' + id)
      console.log(response.data)
    
      setinformation(response.data)
    //  console.log(information[0])
     }
   catch(err){
    
      console.log(err);
    
   }
//    try{
//     const response = await axiosinst.get('api/quotes/like/' + id)
//     console.log(response.data)
//    }
//  catch(err){
  
//     console.log(err);
  
//  }
   }
  useFocusEffect(
    React.useCallback(() => {
        response()
        // //   console.log('Listenn')
        // alert('in')
        //   return() => alert('lost')
    },[]))
    const renderInner=()=>{
        return(
          // console.log('inner');
        <View style={{backgroundColor:'#EDF2F4'}}>
  
  
  <Formik style={{}}
                initialValues={{comment:''}}
                validationSchema={commentschema}
                onSubmit={async(values,actions)=>{
                 actions.resetForm();
                  console.log('sumbit')
                const back={
                 textquote:values.comment,
        
                }
                
                console.log((await AsyncStorage.getItem('token')).toString())
                const backk=JSON.stringify(back);
                const params=JSON.stringify({username:'Hi'});
                axiosinst.post('api/quotes/'+prop.route.params.id,backk,{"headers":
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
         
                }}
                 >
              {(props)=>(
            <View>

                
              <View style={{marginHorizontal:30,borderColor:'red',marginTop:10}}>
            <Textarea rowSpan={7.5} bordered borderRadius={8} 
                onChangeText={props.handleChange('comment')}
                onBlur={props.handleBlur('comment')}
                value={props.values.comment}
                placeholder={'  نقل قول شما ...    '} placeholderTextColor='lightgray' fontSize={16} style={{backgroundColor:'white'}}>
              
                </Textarea>
                </View>
        
       
           <Text style={{fontSize:10, color:'red',marginLeft:'10%'}}>{props.touched.comment&&props.errors.comment}</Text>
      
            <View style={{flexDirection:'row',width:'100%',marginRight:20,marginLeft:10}}>
       
    
          
   
     <Button bordered rounded style={{backgroundColor:'#1F7A8C',borderRadius:18,height:'50%',width:'40%',marginLeft:'28%',marginBottom:'8%'}}
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
    const bs = React.createRef()
    const fall=new Animated.Value(1);
    const [showbutton,setshowbutton]=useState(true);
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
               <Text style={{alignSelf:'center',fontWeight:'bold',color:'#1f7a8c',marginTop:'3%',marginBottom:5,fontSize:16 }}>نقل قول شما چیست؟</Text>
            </View>
          </View>
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
      <FlatList
     style={{marginBottom:'17%'}}
     showsVerticalScrollIndicator={false}
     keyExtractor={(item)=>item.id}
     data={information}
    renderItem={({item})=>(<><Quotecrad   name={item.account.username} 
    date={item.sendtime.toString().split('T')[0]}  height={350} picture={`http://e80ca9693f07.ngrok.io${item.account.profile_photo}`} naghlghol={item.quote_text} ></Quotecrad>
     <AntDesign  style={styles.heart} name="heart"  onPress={async()=>{

if(like==='gray'){setlike('#1F7A8C')}else{setlike('gray')}
//  axiosinst.post('api/quotes/likes'+prop.route.params.id,backk,{"headers":
//          {
//           "Content-Type":"application/json",
//           "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
//          }})
//         .then(async function(response){
//             console.log(response);
  
//           })
//         .catch(function(error){
//         console.log(error);
  
//          })


}} size={20} color={like} />
<Text style={styles.heartnumber}>{item.Likes}</Text>
</>
    )}
    >
    

    </FlatList>
        {/* <ScrollView showsVerticalScrollIndicator={false}>
           <Quotecrad height={350} name={'روحی'} naghlghol={'naghlghol man'} date={'1/1/99'} heartnumber={100}></Quotecrad>
           <Quotecrad height={350} name={'عرفان'} naghlghol={'naghlghol man'}  date={'1/1/99'} heartnumber={100} ></Quotecrad>
           <Quotecrad height={350} name={'bb'} naghlghol={'naghlghol man'}  date={'1/1/99'} heartnumber={100}></Quotecrad>
           
           
         
          
        
      
           </ScrollView> */}
           </Animated.View>
   
           {showbutton?<Button style={styles.addcomment}
    onPress={()=>{
     setshowbutton(false) 
      bs.current.snapTo(0)
      }}
    >

    <Text style={styles.nazar}>نقل قول شما چیست؟</Text>

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
    nazar:{
        marginLeft:'29%',
        fontWeight:'bold',
        color:'#EDF2F4'
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
       addcomment:{
    
        width:'70%',
        marginHorizontal:'15%',
        marginTop:'162%',
        position:'absolute',
        borderRadius:17,
        backgroundColor:'#1F7A8C'
    },
    heart:{
      position:'absolute',
      marginTop:392,
      right:'14%'     
      
    },
    heartnumber:{   
      position:'absolute',
      marginTop:392,
        left:'88%',  
        fontSize:12,
        color:'gray'
    },
  });
  export default Quote;

