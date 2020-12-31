import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal,FlatList,ActivityIndicator, TextPropTypes,Alert } from 'react-native';
 import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content,SearchBar } from 'native-base';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect } from '@react-navigation/native';
// import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
 import { Feather } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons'; 
// import { SearchBar } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Eachgroup from './Eachgroup';
import axiosinst from '../api/axiosinst'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { number } from 'yup';
import { set } from 'react-native-reanimated';
// import { Button } from 'react-native-paper';
const Groups = () => {
   

   const searchpost=async(page)=>{
     await setpage(page)
    const back = {
      search:searchterm,

    }
    await settheend(false)
    if(page===1){
      await settheend(false)
     await setinformation([])

    }
    const backk = JSON.stringify(back);
    try{
    const response = await axiosinst.get('api/group/search/',{
      params: {
        page:page,
        search: searchterm,
        search_fields:'title'
      },
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
  if(response.data.results+'RESPONSE.DATA.GROUPS'==='RESPONSE.DATA.GROUPS'){
    await settheend(true)
    await setrefresh(false)
     console.log('#########')
     }
  await(page===1?setinformation(response.data.results):setinformation(information.concat(response.data.results)))

  console.log(information+'******######********########')
  // console.log(information[0].title)
  // settheend(true)
  // setcount(response.data.count)
  setnext(response.data.next)
  console.log(next,' NEXT')
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
  const [information, setinformation] = useState([]);
  const [next,setnext]=useState('')
  const [search, setsearch] = useState([])
  const [refresh,setrefresh]=useState(false);
  const [likeotime, setlikeotime] = useState('/filter-time');
  const [theend,settheend]=useState(false);
  const[page,setpage]=useState(1);
  const[numberofpage,setnumberofpage]=useState(0);
  const [count,setcount]=useState(1);
  const [pageone,setpageone]=useState(false);
  const [searchterm,setsearchterm]=useState('');
  const [numberofresults,setnumberofresults]=useState();
  const searching=(term)=>setsearchterm(term);
  const response=async (page)=>{
    
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


      const response = await axiosinst.get('api/group'+ likeotime,{
        params: {
          page: page
        },
      "headers":
      {
        "Content-Type": "application/json",
        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
      }
     
   })
   
   if(response.data.groups+'RESPONSE.DATA.GROUPS'==='RESPONSE.DATA.GROUPS'){
  await settheend(true)
  await setrefresh(false)
   console.log('#########')
   }
   else{
  console.log(response.data+'RESPONSE.DATA')
  console.log(response.data.groups+'RESPONSE.DATA.GROUPS')
   await setcount(response.data.count);
   console.log(count+'  COUNT')
   console.log(page+' PAGE BAD COUNT')
   console.log((page===count)+' PAGE===COUNT')

    settheend(false)
   console.log('omade inja')
    await(page===1?setinformation(response.data.groups):setinformation(information.concat(response.data.groups)))
  // setinformation(information.concat(response.data.groups))
    //  setinformation(response.data.groups)
     setrefresh(false)
    console.log(response.data.groups.id+'  INFORMATION.ID')
    
      console.log('++++INFO++++'+information+"++++INFO++++")
     
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
     if(page<count&&searchterm===''||(next!=null)){
       if(searchterm===''){
         settheend(false)
     response(page+1);
       }
       else
       {
         console.log('OMAAAAAAAAAAAAAAAAAAAAAAAAAAD TOOOOOOOOOOOSH')
         searchpost(page+1)
       }
     }
     else
     {
       console.log(page+'handlemore page')
       console.log(count +'handlemore count')
       console.log('*********')
       settheend(true)
      }
    };
 
  useFocusEffect(
    React.useCallback(() => {   
        setsearchterm('')
        setnumberofresults()
      // if(searchterm==='')  
        response(1)
        // else
        // searchpost(1)
    },[]))
  return (

    <View style={styles.container}>
     <Searchbar
      placeholder="Search"
      onChangeText={searching}
      underlineColorAndroid={'#F1F3F9'}
      value={searchterm}
      onIconPress={()=>{
        searchpost(1)}}
      borderTopLeftRadius={hp('20%')}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          borderBottomLeftRadius={20}
          placeholder={'نام گروه ...'}
          style={{  borderTopLeftRadius:hp('5%'),
          marginTop:hp('1.5%'),
        
          alignSelf:'center',
          borderTopRightRadius:hp('5%'),
          borderBottomRightRadius:hp('5%'),
          borderBottomLeftRadius:hp('5%'),
          
          backgroundColor:'#F1F3F9',height:hp('5%'),width:wp('90%'),marginBottom:hp('-0.5%')}}
          searchIcon={ <Feather name="search" size={24} color="#1f7a8c" style={{left:wp('2.5%'),marginRight:wp('1%'),
        
          }} />}
    />
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
      {/* <Button style={{position:'absolute',backgroundColor:'blue' }}>
      <Feather name="search" size={24} color="#1f7a8c" style={{
        position:'absolute',
        left:wp('85%'),marginTop:hp('3.5%')
      }} />
      </Button> */}
       <DropDownPicker
          items={[
            { label: 'جدید ترین گروه ها',value:'none'},
            { label: 'معروف ترین گروه ها', value: 'like' },
          ]}
          defaultValue={selectedValue}
          labelStyle={{fontSize:wp('3%')}}
          containerStyle={{ height: 40, width: 220, marginBottom: hp('2%') }}
          style={{

            borderColor: '#1f7a8c', backgroundColor: '#fafafa', marginTop: hp('2%'), width: wp('50%'), marginBottom: hp('-5%'), position: 'absolute', borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('3%')
          }}
          itemStyle={{

            justifyContent: 'flex-start'
          }}
          dropDownStyle={{
            backgroundColor: '#fafafa',
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginTop: hp('2%'), marginLeft: wp('3%'), width: wp('50%'), position: 'absolute', marginBottom: hp('10%')
          }}
          onChangeItem={async (item) => {
            setsearchterm('');

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              // await setlikeotime('')
              console.log(likeotime+'BEIN TIME')
               await setlikeotime('/filter-time')
              // setrefresh(true)
              // response(1)
              console.log('set shod be time')
              console.log(likeotime+'likeotime')
              // response(1)
            }
            else if (item.value === 'like') {
              console.log('tolike')
              console.log(item.value + 'VALUE')
              // await setlikeotime('')
              console.log(likeotime+'BEIN LIKE')
               await setlikeotime('/filter-member')
              //  setrefresh(true)
              //  response(1)
              console.log('set shod be like')
              console.log(likeotime+'likeotime')
              // response(1)

            }



          }}

        />
        {/* <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup>
        <Eachgroup></Eachgroup> */}

        <View style={{height:hp('2%')}}></View>
       
        {numberofresults!=undefined?<Text style={{marginLeft:hp('2%'),color:'gray',fontSize:hp('1.4%')}}> با اطلاعات شما {numberofresults} گروه پیدا شد.</Text>:null}
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
         
            <TouchableOpacity onPress={()=>console.log('++++++++++'+item.id+'++++++++++++')}>
            <Eachgroup groupphoto={item.group_photo} isowner={item.is_owner} membernumber={item.members_count}
             discription={item.summary} title={item.title} ></Eachgroup>
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