
import React,{useState} from 'react';
import { StyleSheet, Text, View ,Image,FlatList, ImageBackground, Alert,ActivityIndicator,Keyboard} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Quotecrad from './Quotecard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { set } from 'react-native-reanimated';
import {Container,Header,Title,Form,Item,Input,Button, Icon,CheckBox,Body, ActionSheet,Textarea, Content,Fab} from 'native-base';
import * as yup from 'yup';
import {Formik,formik} from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { FAB } from 'react-native-paper';
import { getPendingResultAsync } from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';



const commentschema=yup.object({

  comment:yup.string()
  .required("نقل قول شما نمیتواند خالی باشد")
  .max(500,"متن نوشته شده برای اشتراک طولانی تر از حد مجاز است")
  // .test('line',"متن نوشته شده برای اشتراک طولانی تر از حد مجاز است",(val=>(val.toString().split().length<=500)))
})


const Quote = (prop) => {

const callbackFunction = async(childData) => {
  if(childData===true){
    // await setrefresh(childData)
    console.log('TRUE')
    await response(1)
    // if(finfo===true)
    // await setfinfo(false);
    // else
    // await setfinfo(true);
  }
  // console.log(refresh)
  //  await setrefresh(childData)
  //  console.log(yup.refresh)
  //  if(refresh===true)
  //  await response(1);
}
  
  const getlike=async(item)=>{
    // await setTimeout(() => {  console.log("World!"); }, 5000);
    axiosinst.get('http://c8f6d3c6ac6e.ngrok.io/api/quotes/like/'+item.id,{"headers":
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
  const handleLoadMore = async() => {
   console.log('END OF THE LIST')
    if(theend===false)
    response(page+1);
   };
  const [theend,settheend]=useState(false)
  const [likeotime, setlikeotime] = useState('/quote-filter-time');
  const [selectedValue, setselectedValue] = useState('none')
  const [selectedIndex, setSelectedIndex] = useState([]);
  const[loading ,setloading]=useState(false);
  const[page,setpage]=useState(1);
  const [liked,setliked]=useState(false);
  const [like,setlike]=useState('gray')
  const [close,setclose]=useState(false);
  const [information,setinformation]=useState([]);
  const[IDD,setIDD]=useState('');
  const [delet,setdelet]=useState(false)
  const[finfo,setfinfo]=useState(true)
  const [refresh,setrefresh]=useState(false);
  const [forrefresh,setforrefresh]=useState(false);
  const equal=async(item)=>{
   
    setIDD(await AsyncStorage.getItem('id').toString());
    
  }

  const response=async (page)=>{
    //توی پست کردن توی باتم شیت انگار مهمه که بگم ریسپانس چه صفحه ای توی اینکه کجا کوت جدید بیاد
    await setpage(page)
    if(page===1){
      console.log('PAGE 111')
    await settheend(false)
    await setinformation([])

    console.log('IT IS HEAR SET INFO []')
    console.log(information)
    
    }
    
    console.log('DOVOM')
     const id=prop.route.params.id
     console.log(id) 
     console.log(page+'PAGE')
     try{
      setIDD(await (await AsyncStorage.getItem('id')).toString())
     const response = await axiosinst.get('bookdetail/'+id+likeotime,{ params:{
     page:page
     }
  })
  setrefresh(false)
  if(response.data.detail==='Invalid page.')
  settheend(true);
  else{
    settheend(false)
     console.log(IDD+'IDDresponse');
      //  console.log(response.data)
      page===1?setinformation(response.data):setinformation(information.concat(response.data))
      console.log('++++INFO++++'+information+"++++INFO++++")
     
  //     setloading(false);
     }
    //  console.log(information[0])
     }
   catch(err){
     setrefresh(false)
     console.log(err.toString().split('\n')[0])
    if(err.toString().split('\n')[0].toString()==='Error: Request failed with status code 404')
    settheend(true);
    // else if(theend===true)
    // settheend(false)
    console.log(theend+'THE END')
      console.log(err);
    
   }
 
   }
 
  useFocusEffect(
    React.useCallback(() => {
      // setpage(1);
      // setloading(false)
      // settheend(false);
    
      // getlike()
         
        response(1)
     console.log(IDD+'IDD');
    
    },[]))
    const renderInner=()=>{
        return(
          // console.log('inner');
        <View style={{backgroundColor:'#EDF2F4'}}>
  
  
  <Formik style={{}}
                initialValues={{comment:''}}
                validationSchema={commentschema}
                onSubmit={async(values,actions)=>{
              
                  console.log('sumbit')
                const back={
                 textquote:values.comment,
        
                }
                
                console.log((await AsyncStorage.getItem('token')).toString())
                const backk=JSON.stringify(back);
                const params=JSON.stringify({username:'Hi'});
                // await setTimeout(() => {  console.log("World!"); }, 5000);
                axiosinst.post('api/quotes/'+prop.route.params.id,backk,{"headers":
               {
                "Content-Type":"application/json",
                "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
               }})
              .then(async function(response){
                  console.log(response);
                 
                  // await bs.current.snapTo(1)

                  // await Keyboard.dismiss();
                 
                   setclose(true);
                   actions.resetForm();
                   
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
        response(1)
        // if(theend===true)
       
        // response(page-1)
      }}
      renderContent={renderInner}
      renderHeader={renderHeader}            
      backgroundColor={'#edf2f4'}
  
  />

  <Animated.View style={{
    
       opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
   }}>
     <DropDownPicker
          items={[
            { label: 'فیلتر بر اساس تاریخ', value: 'none' },
            { label: 'فیلتر بر اساس تعداد پسند ها', value: 'like' },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 40, width: wp('50%'), marginBottom: hp('4%') }}
          style={{
            
            borderColor:'#1f7a8c',backgroundColor: '#fafafa', marginTop: hp('2%'), width: wp('50%'), marginBottom: hp('-5%'), position: 'absolute', borderTopLeftRadius: 17, borderTopRightRadius: 17,
            borderBottomLeftRadius: 17, borderBottomRightRadius: 17, marginLeft: wp('5%')
          }}
          itemStyle={{
          
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa', marginLeft: wp('5%'), width: wp('50%'), position: 'absolute', marginBottom: hp('10%') }}
          onChangeItem={async (item) => {

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              await setlikeotime('/quote-filter-time')
           
            }
            else if (item.value === 'like') {
              console.log('tolike')
              console.log(item.value + 'VALUE')
              await setlikeotime('/quote-filter-like')
      
            }



          }}

        />
     { (information.length>=0) ?
     
     <FlatList
    //  ListHeaderComponent={ <DropDownPicker
    //       items={[
    //         { label: 'فیلتر بر اساس تاریخ', value: 'none' },
    //         { label: 'فیلتر بر اساس تعداد پسند ها', value: 'like' },
    //       ]}
    //       defaultValue={selectedValue}
    //       containerStyle={{ height: 40, width: 220, marginBottom: hp('4%') }}
    //       style={{
            
    //         borderColor:'#1f7a8c',backgroundColor: '#fafafa', marginTop: hp('2.7%'), width: wp('45%'), marginBottom:-300, position: 'absolute', borderTopLeftRadius: 17, borderTopRightRadius: 17,
    //         borderBottomLeftRadius: 17, borderBottomRightRadius: 17, marginLeft: wp('5%')
    //       }}
    //       itemStyle={{
          
    //         justifyContent: 'flex-start'
    //       }}
    //       dropDownStyle={{ backgroundColor: '#fafafa', marginLeft: wp('5%'), width: wp('45%'), position: 'absolute', marginBottom: hp('10%') }}
    //       onChangeItem={async (item) => {

    //         if (item.value === 'none') {
    //           console.log(item.value + 'VALUE')
    //           console.log('to none')
    //           await setlikeotime('/quote-filter-time')
    //           response(1)
           
    //         }
    //         else if (item.value === 'like') {
    //           console.log('tolike')
    //           console.log(item.value + 'VALUE')
    //           await setlikeotime('/quote-filter-like')
    //           response(1)
      
    //         }



    //       }}

    //     />}
      ListFooterComponent={(theend===false?<View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View>:<View style={styles.loader}><Text style={{color:'gray',alignSelf:'center'}}>نقل قول دیگری وجود ندارد</Text></View>)}
     style={{marginBottom:hp('18%')}}
     showsVerticalScrollIndicator={false}
     onEndReached={()=>handleLoadMore()}
     onEndReachedThreshold={0}
     keyExtractor={(item)=>item.id}
     refreshing={refresh}
     onRefresh={async()=>{
        await setrefresh(true)
    
      response(1)
       
     }}
     
     data={information}
     onEndReachedThreshold={0.5}
     
    renderItem={({item})=>(<><Quotecrad  name={item.account.username} 

    date={item.sendtime.toString().split('T')[0]} lastinfo={finfo} heartnumber={item.Likes} DELETE={callbackFunction} RESPONSE={response} page={setpage} INFO={setfinfo} IDD={IDD} quoteid={item.id} id={item.account.id} height={hp('42.5%')} picture={`http://c8f6d3c6ac6e.ngrok.io${item.account.profile_photo}`} naghlghol={item.quote_text} ></Quotecrad>
    


</>
    )}
      // extraData={finfo}
    >
    </FlatList>: <Text style={{color:'gray',alignSelf:'center',marginTop:hp('30%'),fontWeight:'bold'}}>نقل قولی وجود ندارد</Text>}
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
 
    loader:{

      alignItems:'center',
      marginBottom:hp('5%'),
      justifyContent:'center',
      alignSelf:'center',
      marginTop:hp('10%')
    }

  });
  export default Quote;