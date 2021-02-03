import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal,FlatList,ActivityIndicator, TextPropTypes,Alert } from 'react-native';
 import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content,SearchBar } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Eachgroup from './Eachgroup';
import axiosinst from '../api/axiosinst'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';


const Groups = ({navigation}) => {
   
   const searchpost=async(page)=>{
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
    try{
    const response = await axiosinst.get('groups',{
      params: {
       
        search: searchterm,
        search_fields:'title',
        page:page,
      },
    "headers":
    {
      "Content-Type": "application/json",
      "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
    }

   
  })
   console.log(response.data)
  // setrefresh(true)
  settheend(false)
  setrefresh(false)
  if(response.data.results+'RESPONSE.DATA.GROUPS'==='RESPONSE.DATA.GROUPS'){
    await settheend(true)
    await setrefresh(false)
     console.log('#########')
     }
     console.log('searchpost beforeee'+information+'1111111111111111111111')
  // await(page===1?setinformation(response.data.results):setinformation(information.concat(response.data.results)))
  // await setinformation([...information,...response.data.results])
   await setinformation(information=>[...information,...response.data.results])
   console.log('searchpost afterrrrrrr'+information+'222222222222222222')     
  // console.log(information+'******######********########')
  // console.log(information[0].title)
  // settheend(true)
  // setcount(response.data.count)
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
   Alert.alert('','مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم',[{
            

    text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
    }],{cancelable:false},{style:{height:50}})
    }     
    
  
  
   }





   const lastinformation=()=>{
    if(information.length>0)
    return information;
    console.log('mikhad chap kone dige nist')
    return( <Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>نقل قولی وجود ندارد</Text>)
   }
  const [modalopen, setmodalopen] = useState(false)
  // const [selectedValue, setselectedValue] = useState('none')
  // const selectedValue='none'
  const [selectedValue, setselectedValue] = useState('none')
  const [gotogrouppage,setgotogrouppage]=useState(false);
  const [information, setinformation] = useState([]);
  const [next,setnext]=useState(null)
  const [search, setsearch] = useState([])
  const [refresh,setrefresh]=useState(false);
  const [pickerselected,setpickerselected]=useState(false);
  const [opensearch,setopensearch]=useState(false);
  const [likeotime, setlikeotime] = useState('time');
  const [theend,settheend]=useState(false);
  const[page,setpage]=useState(1);
  const[numberofpage,setnumberofpage]=useState(0);
  const [count,setcount]=useState(1);
  const [pageone,setpageone]=useState(false);
  const [searchterm,setsearchterm]=useState('');
  // const idd=await(AsyncStorage.getItem('id');
  const [numberofresults,setnumberofresults]=useState();
  const searching=(term)=>setsearchterm(term);
  const [moreclicked,setmoreclicked]=useState(false);
  const [isowner,setisowner]=useState(false);
  const checkisowner=async(ID)=>{
    const id=await(AsyncStorage.getItem('id'))
    if(id===ID){
      return true;
    }
    else
    return false
  }
  const response=async (page)=>{
    // await setinformation([])
    setopensearch(false)
    setpickerselected(false)
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
console.log(await AsyncStorage.getItem('token'));

      const response = await axiosinst.get('/group',{
        params: {
          filter:likeotime,
          page: page
        },
      "headers":
      {
        "Content-Type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
     
   })
   if(page<=count){
   if(response.data.groups+'RESPONSE.DATA.GROUPS'==='RESPONSE.DATA.GROUPS'){
  await settheend(true)
  await setrefresh(false)
   console.log('#########')
   }
   else{
  // console.log(response.data+'RESPONSE.DATA')
  console.log(JSON.stringify(response.data.groups)+'RESPONSE.DATA.GROUPS')
   await setcount(response.data.count);
   console.log(count+'  COUNT')
   console.log(page+' PAGE BAD COUNT')
   console.log((page===count)+' PAGE===COUNT')

    settheend(false)
   console.log('omade inja')
   console.log('----INFO----'+information+"----INFO----")
    // await(page===1?setinformation(response.data.groups):setinformation(information.concat(response.data.groups)))
  // setinformation(information.concat(response.data.groups))
    //  setinformation(response.data.groups)
    //let alaki=[...information]
    //alaki+=response.data.results;
    //await setinformation(alaki);
    //await page===1?setinformation(response.data.groups):setinformation(information=>[...information,...response.data.results])
     setrefresh(false)
     setinformation(information=>[...information,...response.data.groups])
    // console.log(response.data.groups.id+'  INFORMATION.ID')
    
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
    const callbackFunction = async (childData) => {
     
       await setmoreclicked(childData)
      
    }
 
  useEffect(()=>{
    // React.useCallback(() => { 
      setsearchterm('')
      setnumberofresults()
        setinformation([])
    // if(searchterm==='')  
      response(1) 
      // async function refreshing(){ 
      // // setmoreclicked(false)
      setselectedValue('none')
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
     {opensearch?
     <>
      <AntDesign name="arrowleft" size={24} color="#1f7a8c"
      style={{marginTop:hp('3%'),
      position:'absolute',
      marginRight:wp('5%'),
      marginLeft:wp('87%')
          }}
          onPress={()=>{
          setinformation([]);
          setpage(1)
          response(1);
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
      onEndEditing={()=>{setinformation([])
        searchpost(1)}}
      onIconPress={()=>{
        setinformation([])
        searchpost(1)}}
      borderTopLeftRadius={hp('20%')}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          borderBottomLeftRadius={20}
          placeholder={'نام گروه ...'}
          style={{  borderTopLeftRadius:hp('5%'),
          marginTop:hp('2%'),
          
          // alignSelf:'center',
          marginLeft:wp('5%'),
          borderTopRightRadius:hp('5%'),
          borderBottomRightRadius:hp('5%'),
          borderBottomLeftRadius:hp('5%'),
          
          backgroundColor:'#F1F3F9',height:hp('5%'),width:wp('80%'),marginBottom:hp('-0.5%')}}
          searchIcon={ <Feather name="search" size={24} color="#1f7a8c" style={{left:wp('2.5%'),marginRight:wp('1%'),
        
          }} />}
    /></>
    :null}
      {/* <SearchBar
          style={{backgroundColor:'#F1F3F9',height:hp('4.5%'),width:wp('50%')}}
          searchIcon={ <Feather name="search" size={24} color="#1f7a8c" style={{left:wp('2.5%'),marginRight:wp('1%')}} />}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          borderBottomLeftRadius={20}
          placeholder={'نام گروه ...'}
          placeholderTextColor={'gray'}
          inputStyle={{color:'black',fontSize:hp('1.7%')}}
          containerStyle={{backgroundColor:'white',borderTopColor:'white',borderBottomColor:'white'}}
          inputContainerStyle={{backgroundColor:'#F1F3F9',height:hp('5%'),marginTop:hp('1%'),marginBottom:hp('-1%'),borderRadius:20}}
          cancelIcon={<AntDesign style={{}}
         name="close" size={30} color="gray" />}
        // placeholder="نام گروه ..."
        onChangeText={console.log('taghirkarde')}
        value={search}
      /> */}
      {/* <Modal visible={modalopen} animationType='slide'>
        <AntDesign onPress={()=>setmodalopen(false)}
         name="close" size={24} color="black" />
        <Text>Hi im in modall :)))))</Text>
        </Modal>
        <View style={{position:'absolute', justifyContent:'center',height:hp('7%'),width:wp('14%'),borderRadius:1000,backgroundColor:'#1f7a8c',elevation:5,marginTop:hp('77%'),marginLeft:wp('78%')}}>
        <Feather style={styles.plus} onPress={()=>setmodalopen(true)}
         name="plus" size={32} color="#EDF2F4" /> */}

      {/* </View> */}


      <View style={{ marginLeft: wp('2%') }}>
      {/* <Button style={{justifyContent:'center',height:hp('7%'),width:wp('14%'),borderRadius:1000,
        backgroundColor:'#1f7a8c',elevation:5,marginTop:hp('77%'),marginLeft:wp('78%')}} onPress={()=>{
          console.log('PLUS PRESSED')
          setmodalopen(true)}} >
        <Feather style={styles.plus} 
         name="plus" size={32} color="#EDF2F4" />
     
         </Button> */}
      {!opensearch?<Button style={{position:'absolute',backgroundColor:'lightgray',height:hp('5.5%'),width:wp('11.3%'),borderRadius:1000,
        backgroundColor:'#1f7a8c',left:wp('4%'),marginLeft:wp('78%'),marginTop:hp('2%'),elevation:20,justifyContent:'center'}}
        onPress={()=>setopensearch(true)}
        >
      <Feather name="search" size={24} color="#F1F3F9" style={{
         position:'absolute',
         marginTop:hp('3.5%'),alignSelf:'center'
      }} />
      </Button>:null}
      {!opensearch? <DropDownPicker
          items={[
            { label: 'جدید ترین گروه ها',value:'none'},
            { label: 'معروف ترین گروه ها', value: 'like' },
          ]}
          defaultValue={selectedValue}
          labelStyle={{fontSize:wp('3%')}}
          containerStyle={{ height: hp('8%'), width: wp('35%'), marginBottom: hp('-0.3%') }}
          style={{

            borderColor: '#1f7a8c', backgroundColor: '#fafafa', marginTop: hp('2%'), width: wp('50%'),
             marginBottom: hp('-5%'), position: 'absolute', borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('3%')
          }}
          itemStyle={{

            justifyContent: 'flex-start'
          }}
          dropDownStyle={{
            backgroundColor: '#fafafa',
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginTop: hp('2%'), marginLeft: wp('3%'),
             width: wp('50%'), position: 'absolute', marginBottom: hp('10%')
          }}
          onChangeItem={async (item) => {
            setsearchterm('');

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              // await setlikeotime('')
              console.log(likeotime+'BEIN TIME')
               await setlikeotime('time')
              // // setrefresh(true)
              // await setsearchterm('')
              // setnumberofresults()
              // await setpage(1)
              // setpickerselected(true)
              //  await setinformation()
              //  settheend(true)
              //  response(1)
              console.log('set shod be time')
              console.log(likeotime+'likeotime')
              // response(1)
            }
            else if (item.value === 'like') {
              console.log('tolike')
              console.log(item.value + 'VALUE')
              // await setlikeotime('')
              console.log(likeotime+'BEIN LIKE')
               await setlikeotime('member')
              //  setrefresh(true)
              // setpickerselected(true)
              // await setsearchterm('')
              // setnumberofresults()
              // await setinformation()
              // settheend(true)
              // await setpage(1)
              // response(1)
              console.log('set shod be like')
              console.log(likeotime+'likeotime')
              // response(1)

            }



          }}

        />:null}
        {/* <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup> */}

        <View style={{height:hp('2%')}}></View>
       
        {numberofresults!=undefined?<Text style={{marginLeft:hp('2%'),color:'gray',fontSize:hp('1.4%'),marginBottom:hp('0.5%')}}> با اطلاعات شما {numberofresults} گروه پیدا شد.</Text>:null}
         <FlatList
            ListFooterComponent={(theend === false ? 
            <View style={styles.loader}>
            <ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator>
            </View> : 
            <View style={styles.loader}>
            <Text style={{ color: 'gray', alignSelf: 'center',marginBottom:hp('7%')}}>گروه دیگری وجود ندارد</Text>
            </View>)}
            style={{ marginBottom: hp('5%') }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              // if(page<count)
              // if(pageone===false)
              // setpageone(true)
              // else{
                handleLoadMore()
              // }
              console.log('-----AKHAR LIST')
            }}
            onEndReachedThreshold={0.5}
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
            renderItem={({ item }) =><>
         
         <TouchableOpacity 
           //activeOpacity={1}
            style={{backgroundColor:'white',marginBottom:0}}
            onPress={async()=>{
              
              console.log(moreclicked+' MORECLICKED in grouppppppp')
               
               if(moreclicked===false){
             //if(gotogrouppage===true){
              console.log(item.id+'####')
              //setgotogrouppage(false)
               //setmoreclicked(true);
               console.log(moreclicked+' MORECLICKED in grp')
              navigation.navigate('ShowGroupPage',{id:item.id})}}}>
            <Eachgroup groupphoto={item.group_photo} id={item.id} gotogp={setgotogrouppage} moreclickedD={moreclicked} moreclickedd={callbackFunction} isowner={item.is_owner} membernumber={item.members_count}
             discription={item.summary} title={item.title} >
              {/* <Text style={{position:'absolute'}}>kjhlkjhlkjhkjhlkjh</Text>
              <TouchableOpacity 
           //activeOpacity={1}
            style={{backgroundColor:'lightblue',marginBottom:0,height:100}}
            onPress={async()=>{
              
              console.log(moreclicked+' MORECLICKED in grouppppppp')
               
               if(moreclicked===false){
             //if(gotogrouppage===true){
              console.log(item.id+'####')
              //setgotogrouppage(false)
               //setmoreclicked(true);
               console.log(moreclicked+' MORECLICKED in grp')
              navigation.navigate('ShowGroupPage',{id:item.id})}}}>
                <Text>kjhlkjhlkjhkjhlkjh</Text>
                 </TouchableOpacity>
              <Text>kjhlkjhlkjhkjhlkjh</Text> */}
             
             </Eachgroup>
             </TouchableOpacity>
         
          
           
            </>
            }
          // extraData={finfo}
          >
          </FlatList> 

      </View>
      {/* <Text>
                Groups
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
  plus: {

    alignSelf: 'center',
    justifyContent: 'center'

  }, 
  loader:{

    alignItems:'center',
    marginBottom:hp('15%'),
    justifyContent:'center',
    alignSelf:'center',
    marginTop:hp('10%')
  }
});
export default Groups;

