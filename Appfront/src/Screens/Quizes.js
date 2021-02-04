
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Alert, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item, Segment, Content, Input, Label, Textarea } from 'native-base';
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
import { Formik, formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons';
import Quizcard from "./Quizcard";
import { Octicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
// import { TextInput } from 'react-native-paper';




const Quizes = (prop) => {
  const [numberofgp, setnumberofgp] = useState(0);
  const [picture, setpicture] = useState({ uri: '../../assets/group.jpg', name: '', type: '' });
  const [inforamtionchange, setinfromationchange] = useState(false)

  const checkisowner = async (ID) => {
    console.log(ID + "akdfj;slkf;lksajf;lkaf;lkj;slakj;lksjaf;lkjsf;lkjsaf")
    const id = await (AsyncStorage.getItem('id'))
    if (id === ID) {
      return true;
    }
    else
      return false
  }
  const [selectedValue, setselectedValue] = useState('none')
  const [information, setinformation] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [likeotime, setlikeotime] = useState('time');
  const [theend, settheend] = useState(false);
  const [page, setpage] = useState(1);
  const [numberofpage, setnumberofpage] = useState(0);
  const [count, setcount] = useState(1);
  const [seeresult, setseeresult] = useState(false);
  const [owner, setowner] = useState();
  const [opensearch,setopensearch]=useState(false);
  const searching=(term)=>{
    setsearchterm(term)
    console.log(searchterm +"term")
  };
  const [searchterm,setsearchterm]=useState('');
  const [numberofresults,setnumberofresults]=useState(undefined);
  const [next,setnext]=useState(null)
  

  // let count=0;


  const response=async (page)=>{
    // await setinformation([])
    setopensearch(false)
   // setpickerselected(false)
    await (console.log(await(AsyncStorage.getItem('token'))))
   
    await setpage(page)
    console.log(page+'  شماره صفحه اول ریسپانس')

    await settheend(false)
    console.log(theend+'  THE END RESOPONSE AVAL')
    if(page===1){
      await settheend(false)
     await setinformation([])

    }

    
    console.log('DOVOM')
     console.log(page+'PAGE')
     try{
       console.log('  omad to response')
       console.log('api/group'+likeotime)


       const response = await axiosinst.get("quiz", {
        params: {
          page: page
        },
        "headers":
        {
          "Content-Type": "application/json",
          "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
        }

      })
     
   if(page<=count){
   if(response.data.results+'RESPONSE.DATA.GROUPS'==='RESPONSE.DATA.GROUPS'){
  await settheend(true)
  await setrefresh(false)
   console.log('#########')
   }
   else{
  // console.log(response.data+'RESPONSE.DATA')
  console.log(response.data.results+'RESPONSE.DATA.GROUPS')
   await setcount(response.data.count);
   console.log(count+'  COUNT')
   console.log(page+' PAGE BAD COUNT')
   console.log((page===count)+' PAGE===COUNT')

    settheend(false)
   console.log('omade inja')
   console.log('----INFO----'+information+"----INFO----")
        setrefresh(false)
     setinformation(information=>[...information,...response.data.Quiz])
    
      console.log('++++INFO++++'+information+"++++INFO++++")
     
     }
    }
    else{
      settheend(true)
    }
    }
    
    //  }
   catch(err){
     setrefresh(false)
     Alert.alert('','مشکلی پیش اومده لطفا دوباره امتحان کن',[{
            

      text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
      }],{cancelable:false},{style:{height:50}})
       
     console.log(err.toString().split('\n')[0])
    if(err.toString().split('\n')[0].toString()==='Error: Request failed with status code 404')
    settheend(true);
    console.log(theend+'THE END')
      console.log(err);
    
   
  }
  
   }

 




  const searchpost=async(page)=>{
    console.log(page+" page search post")
    await setpage(page)
    console.log(page +'PAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEE SEARCHPOSTT')
   const back = {
     search:searchterm,

   }
   await settheend(false)
   if(page===1){
     await settheend(false)
    await setinformation([])
    console.log('IF PAGE === 1   ')

   }
   const backk = JSON.stringify(back);
   console.log(searchterm+"searchterm toye search postttt")
   try{
   const response = await axiosinst.get("quizes?search="+searchterm+"&search-fields=title&page="+page,{
    //  params: {
      
    //    search: searchterm,
    //    search_fields:'title',
    //    page:page,
    //  },
   "headers":
   {
     "Content-Type": "application/json",
     "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
   }

  
 })
 // console.log(response.data)
 // setrefresh(true)
 settheend(false)
 setrefresh(false)
//  if(response.data.results+'RESPONSE.DATA.GROUPS'==='RESPONSE.DATA.GROUPS'){
//    await settheend(true)
//    await setrefresh(false)
//     console.log('#########')
//     }
   // console.log('searchpost beforeee'+JSON.stringify(information)+'1111111111111111111111')
 // await(page===1?setinformation(response.data.results):setinformation(information.concat(response.data.results)))
 // await setinformation([...information,...response.data.results])
  await setinformation(information=>[...information,...response.data.results])
console.log('searchpost afterrrrrrr'+JSON.stringify(response.data.results)+'222222222222222222')     
 // console.log(information+'******######********########')
 // console.log(information[0].title)
 // settheend(true)
 // setcount(response.data.count)
 console.log(response.data.count+"   TEDATDDDDDDD")
 setnext(response.data.next)
 if(next===null)
 {
   settheend(true)
   console.log(next+'  NEXT TO IF')
 }
 // console.log(response.data.groups.next+'nextttttttttttttttttttttttttttttttt')
 console.log(next,' NEXTtttttttttttttttt')
 setnumberofresults(response.data.count)
 setpage(page);
 
 }
 catch(err){
   setrefresh(false)
  console.log(err)
  Alert.alert('','مشکلی پیش اومدهم سرورامون رو چک میکنیم',[{
           

   text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
   }],{cancelable:false},{style:{height:50}})
   }     
   
 
 
  }


  const handleLoadMore = async() => {
    console.log('END OF THE LIST')
    console.log(next+'  NEXT NEXT NEXT NEXT')
    if(searchterm===''){
     if(page<count){
       
        await settheend(false)
         response(page+1);
      
       
     }
     else
     {
       console.log(page+'handlemore page')
       console.log(count +'handlemore count')
       console.log('*********')
       await settheend(true)
      }
    }
    else
    {
      if(next!=null){
        await settheend(false)
        searchpost(page+1);
      }
      else
      {
        console.log(page+'handlemore page')
        console.log(count +'handlemore count')
        console.log('*********')
        await settheend(true)
      }
    }
    };


 

  useEffect(()=>{
    // React.useCallback(() => { 
      setsearchterm('')
      setnumberofresults()
        setinformation([])
    // if(searchterm==='')  
      response(1) 
      // async function refreshing(){ 
      // // setmoreclicked(false)
     // setselectedValue('none')
      //   setsearchterm('')
      //   setnumberofresults()
      //    await setinformation([])
      // // if(searchterm==='')  
      //   response(1)
      // }
        // else
        // searchpost(1)
    // }
    // ,[])
  },[])
  return (



    <View style={styles.container}>
      <View style={{ marginLeft: wp('2%') }}>
      {opensearch?
     <>
      <AntDesign name="arrowleft" size={24} color="#1f7a8c"
      style={{marginTop:hp('3%'),
      position:'absolute',
      marginRight:wp('5%'),
      marginLeft:wp('87%')
          }}
          onPress={()=>{
          setsearchterm('');
          setnumberofresults();
          setopensearch(false)}
          }
       />
     <Searchbar
    placeholder="Search"
      onChangeText={searching}
      underlineColorAndroid={'#F1F3F9'}
      value={searchterm}
      iconColor={"#1f7a8c"}
      backgroundColor={"#EDF2F4"}
      onEndEditing={()=>{setinformation([])
        searchpost(1)}}
      onIconPress={()=>{
        setinformation([])
        searchpost(1)}}
      borderTopLeftRadius={hp('20%')}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          borderBottomLeftRadius={20}
          placeholder={'نام کوییز ...'}
          style={{  borderTopLeftRadius:hp('5%'),
          marginTop:hp('2%'),
          
          // alignSelf:'center',
          marginLeft:wp('5%'),
          borderTopRightRadius:hp('5%'),
          borderBottomRightRadius:hp('5%'),
          borderBottomLeftRadius:hp('5%'),
          
          backgroundColor:'#EDF2F4',height:hp('5%'),width:wp('80%'),marginBottom:hp('-0.5%')}}
          searchIcon={ <Feather name="search" size={24} color="#1f7a8c" style={{left:wp('2.5%'),marginRight:wp('1%'),
        
          }} />}
    /></>
    :null}
 
    {/* {!opensearch?<Button style={{position:'absolute',backgroundColor:'lightgray',height:hp('5.5%'),width:wp('11.3%'),borderRadius:1000,
        backgroundColor:'#1f7a8c',left:wp('4%'),marginLeft:wp('78%'),marginTop:hp('2%'),elevation:20,justifyContent:'center'}}
        onPress={()=>setopensearch(true)}
        >
      <Feather name="search" size={24} color="#F1F3F9" style={{
         position:'absolute',
         marginTop:hp('3.5%'),alignSelf:'center'
      }} />
      </Button>:null} */}

        {/* <View style={{height:hp('2%')}}></View> */}
        {numberofresults!=undefined?<Text style={{marginLeft:hp('2%'),color:'gray',fontSize:hp('1.4%'),marginBottom:hp('0.5%')}}> با اطلاعات شما {numberofresults} گروه پیدا شد.</Text>:null}
        {(information != undefined) ? <FlatList
          ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> :
            <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center', marginBottom: hp('3%') }}>کوییز دیگری وجود ندارد</Text></View>)}
          style={{ marginBottom: hp('-2%') }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0}
          keyExtractor={(item) => item.id}
          refreshing={refresh}
          onRefresh={async () => {
              // await setsearchterm('')
              if(searchterm===''){
               await(setnumberofresults())
              await setrefresh(true)         
              // await setinformation([]);
              // await setpage(1);
              response(1)
              }
              else{
                await setrefresh(true)   
              searchpost(1)
              }
            }}
          data={information}
          onEndReachedThreshold={0.5}

          renderItem={({ item }) => {
           

            return (<>


              <TouchableOpacity
                activeOpacity={1}
                style={{ backgroundColor: 'white', marginBottom: 0 }}
                onPress={async () => {
                  if (seeresult === true) {

                    //prop.navigation.navigate("کوییز ها")
                  }
                }
                }>
                <Quizcard quizphoto={item.quiz_photo} seeresul={setseeresult} membernumber={item.question_count} discription={item.description} creator={item.creator} title={item.title} ></Quizcard>
                {/* :null} */}
              </TouchableOpacity>
              {item.is_none === false ? <TouchableOpacity
                onPress={async () => {
                  const userid = await AsyncStorage.getItem("id")

                  console.log(userid + " user iddfak;ljdf;lskjf;")
                  await console.log(item.creator.id + " item idakfdj;klaskjl;sfkl;jakjl;fskl;jasfdkjlasfk;jldd;lkj")
                  console.log((item.creator.id - userid) === 0 + " a;dlfj;lskajdf;lkjsadf;lkjadf;lkjsf")

                  if (item.is_owner === true) {
                    prop.navigation.navigate("quizresult", { id: item.id, ownerr: true, title: item.title })
                  }
                  else if (item.is_taken === true) {
                    prop.navigation.navigate("quizresult", { id: item.id, ownerr: false, title: item.title })
                  }
                  // if(owner!=undefined){

                  // }
                  // await prop.seeresul(true);
                  // setTimeout(() => prop.seeresul(false), 2000)
                }}
                style={{ backgroundColor: "#B7E4C7", position: "absolute", height: hp("4.5%"), top: hp("4%"), marginTop: hp("0%"), width: wp("18%"), borderRadius: 50, left: wp("68.5%"), marginBottom: hp("0%"), alignSelf: "flex-start" }}
              >
                <Text style={{ fontSize: hp("1.5.5%"), color: "#1f7a8c", fontWeight: "bold", alignSelf: "center", marginTop: hp("1.1%") }}>پاسخ ها</Text>
              </TouchableOpacity> : <TouchableOpacity
                onPress={() => prop.navigation.navigate("quizpage", { title: item.title })}
                style={{ backgroundColor: "#238495", position: "absolute", height: hp("4.5%"), top: hp("4%"), marginTop: hp("0%"), width: wp("25%"), borderRadius: 50, left: wp("64%"), marginBottom: hp("0%"), alignSelf: "flex-start" }}
              >
                  <Text style={{ fontSize: hp("1.5.5%"), color: "#EEF9FB", fontWeight: "bold", alignSelf: "center", marginTop: hp("1.1%") }}>شرکت در کوییز</Text>
                </TouchableOpacity>}
            </>
            )
          }}

        >
        </FlatList> : <Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>اولین کوییز را شما بسازید</Text>}
        {/* : <Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>نقل قولی وجود ندارد</Text>} */}
        {/* <View style={{height:hp('10%'),width:wp('14%'),borderRadius:1000}} >
        <Button style={{justifyContent:'center',height:hp('7%'),width:wp('14%'),borderRadius:1000,
        backgroundColor:'#1f7a8c',elevation:5,marginTop:hp('77%'),marginLeft:wp('78%')}} onPress={()=>{
          console.log('PLUS PRESSED')
           prop.navigation.navigate("createnewquiz")
          }} >
        <Feather style={styles.plus} 
         name="plus" size={32} color="#EDF2F4" />
     
         </Button>
         </View> */}
        {/* <View style={{ height: hp('10%'), width: wp('14%'), borderRadius: 1000, position: 'absolute' }} >
          <Button style={{
            justifyContent: 'center', height: hp('7%'), width: wp('14%'), borderRadius: 1000,
            backgroundColor: '#1f7a8c', elevation: 5, marginTop: hp('77%'), marginLeft: wp('78%')
          }} onPress={() => {
            console.log('PLUS PRESSED')
            prop.navigation.navigate("createnewquiz")
          }} >
            <Feather style={styles.plus}
              name="plus" size={32} color="#EDF2F4" />

          </Button>
        </View> */}
        {!opensearch?<View style={{ height: hp('10%'), width: wp('14%'), borderRadius: 1000, position: 'absolute' }} >
          <Button style={{
            justifyContent: 'center', height: hp('7%'), width: wp('14%'), borderRadius: 1000,
            backgroundColor: '#1f7a8c', elevation: 5, marginTop: hp('77%'), marginLeft: wp('78%')
          }} onPress={()=>setopensearch(true)} >
            <Feather style={styles.plus}
              name="search" size={hp("3.2%")} color="#EDF2F4" />

          </Button>
        </View>:null}
      </View>
      {/* <View style={{marginBottom:hp("-5%")}}></View> */}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  item2: {
    marginLeft: wp('-2%'),
    marginRight: wp('-1%'),
    marginTop: hp('6%'),
    fontSize: hp('2.5%'),

  },
  item: {
    marginLeft: wp('31%'),
    marginRight: wp('5%'),
    // marginTop:hp('1%'),
    height: wp('9.5%')

  },
  Input: {

    left: wp('8%'),
    fontSize: hp('1.5%'),
    fontWeight: 'bold',
    marginRight: wp('10%'),
    // marginTop:hp('1%'),
    position: 'absolute',
    height: wp('9.5%'),
    //  backgroundColor:'green',
    width: wp('31.5%')
  },
  button: {
    marginTop: hp('3%'),
    alignSelf: 'center',
    width: wp('41%'),
    backgroundColor: '#1f7a8c',
    borderColor: '#BFDBF7',
    // marginLeft:wp('18%'),
    borderRadius: 50

  },
  plus: {
    alignSelf: 'center',
    justifyContent: 'center'

  },
  centeredView: {
    height: hp('40%'),
    marginTop: hp('15%'),
  },
  avatar: {
    height: hp('14%'),
    marginTop: hp('-1.5%'),
    width: wp('28%'),
    marginLeft: wp('-1%'),
    borderRadius: 20,
    position: 'absolute'
  },
  loader: {
    alignItems: 'center',
    marginBottom: hp('5%'),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('10%')
  }
});
export default Quizes;