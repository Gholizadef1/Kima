import React,{useState} from 'react';
import { StyleSheet, Text, View ,Image,FlatList, ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Quotecrad from './Quotecard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { set } from 'react-native-reanimated';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet,Textarea, Content} from 'native-base';
import * as yup from 'yup';
import {Formik,formik} from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BlurView, VibrancyView } from "@react-native-community/blur";




const commentschema=yup.object({

  comment:yup.string()
  .required("نقل قول شما نمیتواند خالی باشد")
  .max(500,"متن نوشته شده برای اشتراک طولانی تر از حد مجاز است")
  // .test('line',"متن نوشته شده برای اشتراک طولانی تر از حد مجاز است",(val=>(val.toString().split().length<=500)))
})

const Quote = (prop) => {

  const getlike=async(item)=>{
    axiosinst.get('http://53d9727d06d4.ngrok.io/api/quotes/like/'+item.id,{"headers":
    {
     "Content-Type":"application/json",
     "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
    }})
   .then(async function(response){
        console.log(response);
        if(response.data.message==='true'){setlike('#1F7A8C')}else{setlike('gray')}
     })
   .catch(function(error){
   console.log(error);

    })
  }
  const [liked,setliked]=useState(false);
  const [like,setlike]=useState('gray')
  const [close,setclose]=useState(false);
  const [information,setinformation]=useState([]);
  const[IDD,setIDD]=useState('');
  const equal=async(item)=>{
    // console.log(item.account.id)
    setIDD(await AsyncStorage.getItem('id').toString());
    // console.log(await AsyncStorage.getItem('id'))
    //  console.log(item.account.id.toString()===await (await AsyncStorage.getItem('id')).toString())
    // return(item.account.id.toString()===await (await AsyncStorage.getItem('id')).toString())
  }
//   const getid=async()=>{
    
//  }
  // const getid=async()=>(await AsyncStorage.getItem('id'));
  // const ID=getid();
  // console.log(ID);
  const response=async ()=>{
    console.log('DOVOM')
     const id=prop.route.params.id
     console.log(id) 
     try{
    setIDD(await (await AsyncStorage.getItem('id')).toString())
     const response = await axiosinst.get('api/quotes/' + id)
     console.log(IDD+'IDDresponse');
       console.log(response.data)
    
      setinformation(response.data)
    //  console.log(information[0])
     }
   catch(err){
    
      console.log(err);
    
   }
  //  getlike();
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
      // getlike()
        response()
     console.log(IDD+'IDD')
    
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
                   setclose(true);
                })
              .catch(function(error){
              console.log(error);
         
               })
         
                }}
                 >
              {(props)=>(
            <View>

                
              <View style={{marginHorizontal:wp('7%'),borderColor:'red',marginTop:hp('1%')}}>
            <Textarea rowSpan={7.5} bordered borderRadius={8} 
                onChangeText={props.handleChange('comment')}
                onBlur={props.handleBlur('comment')}
                value={props.values.comment}
                placeholder={'  نقل قول شما ...    '} placeholderTextColor='lightgray' fontSize={hp('1.8%')} style={{backgroundColor:'white'}}>
              
                </Textarea>
                </View>
        
       
           <Text style={{fontSize:wp('2%'), color:'red',marginLeft:('10%')}}>{props.touched.comment&&props.errors.comment}</Text>
      
            <View style={{flexDirection:'row',width:'100%',marginRight:wp('3%'),marginLeft:wp('3%')}}>
       
    
          
   
     <Button bordered rounded style={{backgroundColor:'#1F7A8C',borderRadius:18,height:hp('4%'),width:wp('40%'),marginLeft:wp('28%'),marginBottom:hp('2%')}}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#ffff', fontSize:15,fontWeight:'bold',marginLeft:wp('32%'),width:'100%'}}>ثبت</Text>
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
            {/* <View style={{borderRadius:100}}> */}
            <ImageBackground borderRadius={100}
           source={require('../../assets/line5.png')}
           style={{width:wp('21%'),height:hp('0.3%'),alignSelf:'center',borderRadius:100}}
           ></ImageBackground>
           {/* </View> */}
               <Text style={{alignSelf:'center',fontWeight:'bold',color:'#1f7a8c',marginTop:hp('1.3%'),marginBottom:hp('1.3%'),fontSize:wp('4%') }}>نقل قول شما چیست؟</Text>
            </View>
          </View>
        </View>
      
       
        
          )
      }
    return(
        <View style={styles.container}>
        <BottomSheet style={{position:''}}
        
       snapPoints={[hp('40%'), 0, 0]}
      ref={bs}
      initialSnap={1}
      callbackNode={fall}
      enabledGestureInteraction={true}
      enabledContentTapInteraction={false}
      onCloseEnd={()=>{
        setshowbutton(true) 
        response();
      }}
      
     //  isBackDropDismisByPress={true}
      renderContent={renderInner}
      renderHeader={renderHeader}            
         // style={{position:'absolute',height:200,width:250,marginTop:400}}
      backgroundColor={'#edf2f4'}
  
  />

  <Animated.View style={{
    
       opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
   }}>
      <FlatList
     style={{marginBottom:'17%'}}
     showsVerticalScrollIndicator={false}
     keyExtractor={(item)=>item.id}
     data={information}
    renderItem={({item})=>(<><Quotecrad   name={item.account.username} 
    date={item.sendtime.toString().split('T')[0]}  height={hp('42.5%')} picture={`http://53d9727d06d4.ngrok.io${item.account.profile_photo}`} naghlghol={item.quote_text} ></Quotecrad>
     <AntDesign  style={styles.heart} name="heart"  onPress={async()=>{
      console.log((await AsyncStorage.getItem('token')).toString());
     
      console.log(item.id)
      console.log(item.account.id);
      axiosinst.post('http://53d9727d06d4.ngrok.io/api/quotes/like/'+item.id,{"headers":
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
         getlike(item);
     


        }} size={20} color={like} />
        { IDD===item.account.id.toString() ?<AntDesign name="delete"
        size={hp('2.2%')} style={{position:'absolute',marginTop:hp('5.1%'),right:'6.5%'}}
        onPress={async()=>{
 
        axiosinst.delete('api/quotes/'+item.id,{"headers":
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
         response();
 }}
  color="#e56b6f" />:null}

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
    {/* <Text>blur</Text> */}
    {/* <BlurView
          // style={styles.absolute}
          // blurType="light"
          // blurAmount={10}
          // reducedTransparencyFallbackColor="white"
        /> */}

     </View>
    );
}

const styles = StyleSheet.create({
    container: {
    
        flex: 1,
        // backgroundColor: '#B8B8B8',
        backgroundColor:'#ffff',
        marginTop:hp('0%')
    },
    nazar:{
        marginLeft:wp('20%'),
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
    
        width:wp('70%'),
        marginHorizontal:'15%',
        marginTop:hp('80.1%'),
        position:'absolute',
        borderRadius:17,
        backgroundColor:'#1F7A8C'
    },
    heart:{
      position:'absolute',
      marginTop:hp('47.5%'),
      right:wp('6.5%')     
      
    },
    heartnumber:{   
      position:'absolute',
      marginTop:hp('47.6%'),
        left:wp('85%'),  
        fontSize:hp('1.5%'),
        color:'gray'
    },
  });
  export default Quote;