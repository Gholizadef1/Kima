import React,{useState} from 'react';
import { StyleSheet, Text, View ,Modal,ImageBackground,Alert,FlatList,ActivityIndicator,TextInput, useColorScheme} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Item, Segment, Content,Input,Label,Textarea } from 'native-base';
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
import {Formik,formik} from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons';
// import { TextInput } from 'react-native-paper';


const userschema=yup.object({

  Username:yup.string()
  .required("اسم گروه نمیتواند خالی باشد")
  .min(3, "اسم گروه نمیتواند کم تر از 3 حرف باشد"),

  Discription:yup.string()
  .required("توضیحات گروه نمیتواند خالی باشد")
  // .min(4, "نام کاربری نمیتواند کم تر از 4 حرف باشد"),

  // photo:yup.string()
  // .required("لطفا نام کاربری جدید خود را وارد کنید")
  // .min(4, "نام کاربری نمیتواند کم تر از 4 حرف باشد"),

})

const Mygroups = (prop) => {
  const [numberofgp,setnumberofgp]=useState(0);
  const [picture,setpicture]=useState({uri:'../../assets/group.jpg',name:'',type:''});
  
  const pickfromgallery = async (props,change)=>{
    await console.log(await AsyncStorage.getItem('token'));
    console.log('gallery')
      const {granted}=await permissions.askAsync(permissions.CAMERA_ROLL)
      if(granted){
          console.log(granted)
          let data=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1
          })
          console.log(data);
          console.log(data.uri)
          const formdata = new FormData();
          
          const newfile={uri:data.uri,
            type:`test/${data.uri.split(".")[3]}`,
            name:`test.${data.uri.split(".")[3]}`}
          console.log(newfile)

          formdata.append('photo',newfile)
          
          if(data.cancelled===false){
          const back={        
            photo:data
          }
           const backk=JSON.stringify(back);
           console.log(props.values.photo+'formik photo1')
            // props.values.photo="{uri:"+data.uri+'}'
           props.values.photo=data.uri
           //baraye in ke rerender beshe va photo formik form taghir kone
        
             props.handleChange('photo')
             setpicture(newfile)
             
             console.log(picture+'  PICTURE')
            // change(data.uri)
           console.log(props.values.photo+'formik photo2')
           
          // const response=await axiosinst.put('http://6124bc8043de.ngrok.io/api/update-profile/',formdata,{

          //   headers:{
          //     "Content-Type":"application/json",
          //     "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
          //   }
          //      )
          // .then( function(response){
          //   const a=response.data.profile_photo
          //   setpicture(a);
            
          // })
          // .catch( function(error){
          //   console.log(error)
          // })
         
          }
      }
      else
      {
        Alert.alert('oops',' برای انتخاب از گالری باید اجازه دسترسی به گالریتون رو به ما بدید',[{
          Title:'فهمیدم',onPress:()=>console.log('alert closed')
          }])
      }
  
  }
    const[inforamtionchange,setinfromationchange]=useState(false)
    const [modalopen,setmodalopen]=useState(false)
    const checkisowner=async(ID)=>{
      console.log(ID+"akdfj;slkf;lksajf;lkaf;lkj;slakj;lksjaf;lkjsf;lkjsaf")
      const id=await(AsyncStorage.getItem('id'))
      if(id===ID){
        return true;
      }
      else
      return false
    }
    const [selectedValue, setselectedValue] = useState('none')
    const [information, setinformation] = useState([]);
    const [refresh,setrefresh]=useState(false);
    const [selecttime, setselecttime] = useState("none")
    const [likeotime, setlikeotime] = useState('time');
    const [theend,settheend]=useState(false);
    const[page,setpage]=useState(1);
    const[numberofpage,setnumberofpage]=useState(0);
    // cosnt [closee,setclosee]=useState(false);
   const [count,setcount]=useState(1);
  // let count=0;
  const response=async (page)=>{

    // await setinformation(null)
    await (console.log(await(AsyncStorage.getItem('token'))))
   
    await setpage(page);
    console.log(page+' PAGEEEEEEEEEEEEEEEEPAGEEEEEEEEEE')

    await settheend(false)
    console.log(theend+'  THE END RESOPONSE AVAL')
    if(page===1){
      await settheend(false)
      await setinformation([])
      // if(inforamtionchange===false)
      // setinfromationchange(true)
      // else
      // setinfromationchange(false)
      console.log(information+'BAYAN KHALI BASHEEEEEEEEEE')
      console.log('----------------------PGAE 11111111---------------')

    }
    

    
    console.log('DOVOM')
     console.log(page+'PAGEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
     console.log('ALAIK ALIAKDALFKJASFKJAKSFKLJSFH')
     var a="";
     if(selecttime==="none")
     a="time";
     else
     a="like"
     console.log(a+"aaaaaa")
     try{
       console.log('  omad to response')
       console.log('api/group'+a)

      const id= await(AsyncStorage.getItem('id'))
      const response = await axiosinst.get("user/"+id+"/group",{
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
   //console.log(response.data.groups.lenght+'$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  //  for(let i=0;response.data.groups[i]!=null;i++){
  //    setnumberofgp(numberofgp+1);
  //  }
  //  if(numberofgp===0)
  //  settheend(true)

   console.log(numberofgp/10+'number of group ////////10')
   console.log(numberofgp+'   !!!!!!!!!  '+numberofgp)
   console.log(response.data)
   console.log(page+'PAGEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeWWWW')
  //  if(response.data.groups+'RESPONSE.DATA.GROUPS'==='RESPONSE.DATA.GROUPS'){
  // await settheend(true)
  // await setrefresh(false)
  //  console.log('#########')
  //  }
  //  else{
  console.log(response.data+'RESPONSE.DATA')
  console.log(response.data.groups+'RESPONSE.DATA.GROUPS')
   await setcount(response.data.count);
   console.log(count+'  COUNT')
   console.log(page+' PAGE BAD COUNT')
   console.log((page===count)+' PAGE===COUNT')

    settheend(false)
   //console.log('omade inja')
   console.log('++++INFOGHABLESET++++'+information+"++++INFOGHABLESET++++")
    //await(page===1?setinformation(response.data.groups):setinformation(information.concat(response.data.groups)))
    // setinformation(information.concat(response.data.groups))
    //  setinformation(response.data.groups)
    console.log(response.data.groups)
    if(response.data.message!="No Group!"){
      await setinformation(information => [...information, ...response.data.groups])
   //wait page===1?setinformation(response.data.groups):setinformation(information=>[...information,...response.data.groups])
    }
    else{
      await setinformation(undefined);
      console.log(" KHALIIIII;KAJF;LKJ;LKJ")
    }
     setrefresh(false)
   // console.log(response.data.groups.id+'  INFORMATION.ID')
    
      console.log('++++INFO++++'+information+"++++INFO++++")
     
     }
   // }
    //  }
   catch(err){
    Alert.alert('','مشکلی پیش اومده اینترنتت رو چک کن ما هم سرورامون رو چک میکنیم',[{
            

      text:'فهمیدم',onPress:()=>console.log('alert closed'),style:'default'
      }],{cancelable:false},{style:{height:50}})
      
     console.log(err.response+'   error response')
     setrefresh(false)
     console.log(err.toString().split('\n')[0])
    if(err.toString().split('\n')[0].toString()==='Error: Request failed with status code 404')
    settheend(true);
    console.log(theend+'THE END')
      console.log(err);
    
   }
  
   }
   const handleLoadMore = async() => {
    console.log('END OF THE LIST')
    //  if(page<numberofgp/10+1){
      if (page < count) {
        if (theend === false)
          response(page + 1);
      }
      else {
        settheend(true)
      }   
    };
   
    useFocusEffect(
      React.useCallback(() => {
        const a = new Promise(async (resolve, reject) => {
          await setinformation([]);
          await setpage(1);
          await settheend(false);
          console.log("toye use focus effectt ")
          if (selecttime === "none") {
            setlikeotime("time")
          }
          else {
            setlikeotime("like")
          }
          //await setselecttime(true)
          //با این ظاهرا درست شد :/
          //   await setselectedValue('like')
          //   //تاثیری نداشتن :/
          //   // await setlikelable('فیلتر بر اساس تعداد پسند ها ')
          //   // await settimelable("فیلتر بر اساس تاریخ")
          //   if(selectedValue==="none")
          //  await setlikeotime("time");
          //  else
          //  await setlikeotime("like");
          //  await setselectedValue('none')
  
          resolve()
        }).then(() => {
          console.log('++++++++++' + information + '**********')
          response(1);
          console.log('++++++++++' + information + '**********')
        })
        // //   console.log('Listenn')
        // alert('in')
        //   return() => alert('lost')
      }, [prop.navigation, selecttime,modalopen]))
    return(
     
     
    
        <View style={styles.container}>
        <View style={{}}>
       <Modal    transparent={true} StatusBar={{backgroundColor:'blue'}} style={{bottom:100,margin:20,position:'absolute'}} visible={modalopen} animationType='fade' >
        
        {/* <StatusBar backgroundColor='#BFDBF7' style='light' /> */}
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        {/* <View style={{alignSelf:'flex-end',top:hp('1%'),right:hp('1%'),backgroundColor:'blue'}}> */}
      <TouchableOpacity  style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%'),height:hp('5%'),width:wp('8%'),backgroundColor:'white',position:'absolute'}} onPress={()=>setmodalopen(false)}>
        <AntDesign style={{position:'absolute',alignSelf:'flex-end',top:hp('1%'),right:hp('1%')}} 
        onPress={()=>{
          // response(1);
          setmodalopen(false)}}
         name="close" size={23} color="#D75A5A" />
         </TouchableOpacity>
       {/* </View> */}
        {/* <Text>Hi im in modall :)))))</Text> */}
       
     <Formik style={{borderStyle:'dashed',justifyContent:'space-around'}}
      initialValues={{Username:'',Discription:'',photo:require('../../assets/group.jpg')}}
      validationSchema={userschema}

      onSubmit={async(values,actions)=>{
          console.log('ON SUBMIT')
          const formdata = new FormData();
          //  const newfile={title:values.Username,summary:values.summary,photo:picture}
           formdata.append('title',values.Username)
           formdata.append('summary',values.Discription)
           if(picture.uri==='../../assets/group.jpg'){
          //  formdata.append('photo',{uri:'',type:'',name:''})
            // formdata.append('photo','')
           }
           else
           formdata.append('photo',picture)
          //  formdata.append({photo:'',name:'',type:''},'photo')
            // formdata.append(newfile,'data')
        // const back={
        //   username:values.Username,
        //   discription:Discription,
        //   groupimage:picture
        
        // }
      
        //  const backk=JSON.stringify(back);
        // const params=JSON.stringify({username:'Hi'});
        console.log(formdata.data+'formdata')

        const response=await axiosinst.post('/group',formdata,{
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()}
          }
             )
        .then( function(response){
          if(response.data.message==="A group with this name exists!"){
            Alert.alert('','گروهی با این نام از قبل وجود دارد ',[
            {
         text:'فهمیدم',style:'default',onPress:()=>console.log('alert closed')
            }
            ],{cancelable:false},{style:{height:50}})
          }
          else{
          console.log(picture+' PICTURE POST')
        
          console.log(response)
          Alert.alert('','گروه با موفقیت ساخته شد ',[
            {
         text:'فهمیدم',style:'default',onPress:()=>console.log('alert closed')
            }
            ],{cancelable:false},{style:{height:50}})
          
          }
        })
        .catch( function(error){  
            {
              console.log(error)
            
              Alert.alert('', 'مشکلی پیش اومده لطفا دوباره امتحان کن', [{


text: 'فهمیدم', onPress: () => console.log('alert closed'), style: 'default'
}], { cancelable: false }, { style: { height: 50 } })
            }     
        })

      }}
     >
      {(props)=>(
     <View style={{ marginTop:hp('5%')}}>
     <View style={{borderColor:'blue'}}>
     
     {props.values.photo===require('../../assets/group.jpg')?<TouchableOpacity style={{  
      height: hp('14%'),
      marginTop:hp('-1.5%'),
      width: wp('28%'),
      marginLeft:wp('-1%'),
      borderRadius: 20,
      position:'absolute',
      borderColor:'blue'}}
       onPress={() => { pickfromgallery(props)}}>
      <ImageBackground borderRadius={20}
        
         source={props.values.photo}
         
         style={{height: hp('14%'),
        
      marginTop:hp('-1.5%'),
      width: wp('28%'),
      marginLeft:wp('-1%'),
      borderRadius:20 ,
      position:'absolute',
       //borderColor:'#1f7a8c',
       //borderWidth:wp('0.2%')
      }}
        //  onBlur={props.handleBlur('photo')}
     

       >

         </ImageBackground>

     </TouchableOpacity>:<TouchableOpacity style={styles.avatar}
       onPress={() => { pickfromgallery(props,props.handleChange)}}>
      <ImageBackground borderRadius={20}
         source={{uri:`${props.values.photo}`}}
         onChangeItem={props.handleChange('photo')}
         style={styles.avatar}
        //  onBlur={props.handleBlur('photo')}
     

       >

         </ImageBackground>
     </TouchableOpacity>}
    
     {props.values.photo===require('../../assets/group.jpg')?
     <TouchableOpacity style={{borderRadius:20,borderWidth:wp('0.2%'),borderColor:'#1f7a8c',position:'absolute',height: hp('14%'),
      marginTop:hp('-3%'),marginLeft:wp("-2%"),
      width: wp('28%'),elevation:0}}     onPress={() => {pickfromgallery(props,props.handleChange)}}>
     </TouchableOpacity>
     :null}
     {/* <TouchableOpacity  onPress={() => { pickfromgallery(props,props.handleChange)}} style={{backgroundColor:'#EDF2F4',elevation:1,height:hp('4.2%'),width:wp('8.5%'),top:hp('8%'),left:wp('-3%'),position:'absolute',borderRadius:100}}>
      <EvilIcons  onPress={() => { pickfromgallery(props,props.handleChange)}}  name="camera" size={25} style={{alignSelf:'center',top:hp('1%')}} color="#1f7a8c" />
      </TouchableOpacity> */}
    
    
     <Text style={{fontSize:hp('1.5%'),fontWeight:'bold', color:'#1f7a8c',marginBottom:hp('1%'),marginLeft:wp('33%')}}>نام گروه</Text>
     <Item style={styles.item} rounded >
     {/* <Label style={{fontWeight:'bold'}}>نام گروه</Label> */}
     
     <Input  style={styles.Input} autoCapitalize='words' autoCorrect={true}
         onChangeText={props.handleChange('Username')}
         onBlur={props.handleBlur('Username')}
         value={props.values.Username}
         placeholder={'نام گروه ...'} placeholderTextColor='gray' >
         </Input>
         <MaterialCommunityIcons name="account-group" size={hp('2.8%')} style={{left:wp('2%')}} color="#BFDBF7" />
       
  <Text style={{fontSize:hp('1.2%'),marginLeft:wp('-3.5%'),marginTop:hp('7%'), color:'red'}}>{props.touched.Username&&props.errors.Username}</Text>
      </Item>
    
      </View>
      <TouchableOpacity  onPress={() => { pickfromgallery(props,props.handleChange)}} style={{backgroundColor:'#EDF2F4',elevation:1,height:hp('4.2%'),width:wp('8.5%'),top:hp('8%'),left:wp('-3%'),position:'absolute',borderRadius:100}}>
      <EvilIcons  onPress={() => { pickfromgallery(props,props.handleChange)}}  name="camera" size={25} style={{alignSelf:'center',top:hp('1%')}} color="#1f7a8c" />
      </TouchableOpacity>
     
     {/* <Label style={{fontWeight:'bold'}}>نام گروه</Label> */}
   
     {/* <View style={styles.item2}> */}
     <View>
        <Text style={{fontSize:hp('1.5%'),fontWeight:'bold', color:'#1f7a8c',marginBottom:hp('-5%'),marginTop:hp('5%'),marginLeft:wp('1%')}}>توضیحات</Text>
        <TouchableOpacity>
                <Textarea rowSpan={hp('0.9.1%')} bordered borderRadius={8}
                  // selectTextOnFocus={true}

                  borderColor={'lightgray'}
                  onChangeText={props.handleChange('Discription')}
                  onBlur={props.handleBlur('Discription')}
                  value={props.values.Discription}
                 
                  placeholder={'توضیحات گروه ...'}  placeholderTextColor='gray' fontSize={hp('1.6.5%')}  style={styles.item2}>

                </Textarea>
                </TouchableOpacity>
                <Text style={{fontSize:hp('1.2%'),marginTop:hp('0.5%'), color:'red'}}>{props.touched.Discription&&props.errors.Discription}</Text>
              {/* </View> */}
              </View>


     {/* <Input  style={styles.Input} autoCapitalize='words' autoCorrect={true}
         onChangeText={props.handleChange('Username')}
         onBlur={props.handleBlur('Username')}
         value={props.values.Username}
         placeholder={''} placeholderTextColor='gray' >
         </Input>
         <MaterialCommunityIcons name="account-group" size={hp('2.8%')} style={{left:wp('2%')}} color="#BFDBF7" /> */}
       
     
         <Button bordered rounded style={styles.button}
       onPress={props.handleSubmit}
       >
         <Text style={{color:'#E1E5F2', fontSize:hp('1.8%'),fontWeight:'bold',left:wp('11%'),width:wp('40%')}}>ساخت گروه</Text>
        </Button>

       {/* <View style={{flexDirection:'row',width:wp('98%'),marginRight:10,marginLeft:10}}>
       
       
      
     </View> */}
    
     </View>
       
       
     )}

     </Formik>
    
        </View>

        </View>
        </Modal>
    
        </View>
        

         <View style={{marginLeft:wp('2%')}}>
      

         {information!=undefined? <DropDownPicker
          items={[
            { label: 'معروف ترین گروه ها', value: 'like' },
            { label: 'جدید ترین گروه ها', value: 'none' },
          ]}
          defaultValue={selectedValue}
          labelStyle={{fontSize:wp('3%')}}
          containerStyle={{ height: 40, width: 220, marginBottom: hp('2%') }}
          style={{
          
            borderColor:'#1f7a8c',backgroundColor: '#fafafa', marginTop: hp('2%'), width: wp('50%'), marginBottom: hp('-5%'), position: 'absolute', borderTopLeftRadius: 30, borderTopRightRadius: 30,
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginLeft: wp('3%')
          }}
          itemStyle={{
          
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa',
            borderBottomLeftRadius: 30, borderBottomRightRadius: 30,marginTop:hp('2%'), marginLeft: wp('3%'), width: wp('50%'), position: 'absolute', marginBottom: hp('10%') }}
          onChangeItem={async (item) => {

            if (item.value === 'none') {
              console.log(item.value + 'VALUE')
              console.log('to none')
              // await setinformation()
              // settheend(false)
              // response(1)
              await setlikeotime('time')
               setselecttime("none")
              // setselectedValue('none')
        
            }
            else if (item.value === 'like') {
              console.log('tolike')
              // setselectedValue('like')
              console.log(item.value + 'VALUE')
              // await setinformation()
              // settheend(false)
              // response(1)
              await setlikeotime('member')
               setselecttime("like")
         
            }



          }}

        />:null}
        {/* <TouchableOpacity onPress={()=>console.log('aladkki')}>
         <Eachgroup></Eachgroup>
         </TouchableOpacity> */}
         {/* <Eachgroup></Eachgroup>
         <Eachgroup></Eachgroup>
         <Eachgroup></Eachgroup> */}
         <View style={{height:hp('2%')}}></View>
        {/* {(information.length >= 0) ? */}

        {(information != undefined) ?<FlatList
            ListFooterComponent={(theend === false ? <View style={styles.loader}><ActivityIndicator animating color={'gray'} size={"large"}></ActivityIndicator></View> : 
            <View style={styles.loader}><Text style={{ color: 'gray', alignSelf: 'center', marginBottom:hp('3%') }}>گروه دیگری وجود ندارد</Text></View>)}
            style={{ marginBottom: hp('7%') }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => handleLoadMore()}
            onEndReachedThreshold={0}
            keyExtractor={(item) => item.id}
            refreshing={refresh}
            onRefresh={async () => {
              //await setinformation()
              await setrefresh(true)
              response(1)
            }}

            data={information}
            onEndReachedThreshold={0.5}

            renderItem={({ item }) => (<>
           
             {/* <TouchableOpacity onPress={()=>console.log('++++++++++'+item.id+'++++++++++++')}> */}
             <TouchableOpacity 
           //activeOpacity={1}
            style={{backgroundColor:'white',marginBottom:0}}
            onPress={async()=>{
              prop.navigation.navigate('ShowGroupPage',{id:item.id})}}>
            {/* {item.is_owner||item.is_member? */}
            <Eachgroup groupphoto={item.group_photo} membernumber={item.members_count} isowner={checkisowner(item.owner.id)} discription={item.summary} title={item.title} ></Eachgroup>
            {/* :null} */}
            </TouchableOpacity>
            </>
            )}
          // extraData={finfo}
          >
          </FlatList> :<Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>اولین گروه خود را بسازید</Text>}
          {/* : <Text style={{ color: 'gray', alignSelf: 'center', marginTop: hp('30%'), fontWeight: 'bold' }}>نقل قولی وجود ندارد</Text>} */}
          <View style={{height:hp('10%'),width:wp('14%'),borderRadius:1000,position:'absolute'}} >
        <Button style={{justifyContent:'center',height:hp('7%'),width:wp('14%'),borderRadius:1000,
        backgroundColor:'#1f7a8c',elevation:5,marginTop:hp('77%'),marginLeft:wp('78%')}} onPress={()=>{
          console.log('PLUS PRESSED')
          setmodalopen(true)}} >
        <Feather style={styles.plus} 
         name="plus" size={32} color="#EDF2F4" />
     
         </Button>
         </View>
         </View>
         
            {/* <Text>
                Mygroups
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
    item2:{
      marginLeft:wp('-2%'),
      marginRight:wp('-1%'),
      marginTop:hp('6%'),
      // marginBottom:hp('-40%'),
      // height:wp('9.5%'),
      fontSize:hp('2.5%'),
      // position:'absolute'
    
    },
    item:{
      marginLeft:wp('31%'),
      marginRight:wp('5%'),
      // marginTop:hp('1%'),
      height:wp('9.5%')
      
      
    },
    Input:{
      // fontSize:hp('1.8%'),a
      // fontStyle:'normal',
      // height:wp('1%')
      // marginLeft:wp('31%'),
      // marginRight:wp('31%'),
      // left:wp('42%'),
      left:wp('8%'),
      fontSize:hp('1.5%'),
      fontWeight:'bold',
      marginRight:wp('10%'),
      // marginTop:hp('1%'),
      position:'absolute',
      height:wp('9.5%'),
      //  backgroundColor:'green',
       width:wp('31.5%')
    },
    button:{
      //  position:'absolute',
      marginTop:hp('3%'),
    
      alignSelf:'center',
      width:wp('41%'),
      backgroundColor:'#1f7a8c',
      borderColor:'#BFDBF7',
      // marginLeft:wp('18%'),
      borderRadius:50
      
    },
    plus:{
      // position:'absolute',
      alignSelf:'center',
      justifyContent:'center'
    
    },
    centeredView: {
      // flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
       height:hp('40%'),
      marginTop:hp('15%'),
      // marginBottom:hp('10%')
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 35,
       height:hp('65%'),
   
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      elevation: 300
    },
    avatar: {
      height: hp('14%'),
      marginTop:hp('-1.5%'),
      width: wp('28%'),
      marginLeft:wp('-1%'),
      borderRadius: 20,
      position:'absolute'
    },
    loader:{

    alignItems:'center',
    marginBottom:hp('5%'),
    justifyContent:'center',
    alignSelf:'center',
    marginTop:hp('10%')
  }
  });
  export default Mygroups;

