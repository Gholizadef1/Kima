import React , {useState , useEffect} from 'react';
import { StyleSheet, View , Image , ImageBackground , ScrollView ,
TouchableOpacity , FlatList , TextInput } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Body,
Right, Left , Picker, Form, Item } from 'native-base';
import {withNavigation} from 'react-navigation'
import axiosinst from '../api/axiosinst'
import { StatusBar } from 'expo-status-bar';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios'
//import Star from 'react-native-star-view';
import { color } from 'react-native-reanimated';
import Animated, { set } from 'react-native-reanimated';

const Bookview = (prop) => {
console.log('BOOKVIEW')
const [rate , setrate] = useState(true);
const [ratenum , setratenum] = useState(null);
const [result , setResult] = useState(null);
const [information,setinformation]=useState([]);
const [cinformation,setcinformation]=useState([]);
const [selectedValue, setSelectedValue] = useState('none');
const id = prop.route.params.id;
const getResult = async (id) => {
const response = await axiosinst.get('/bookdetail/'+id);
setResult(response.data);
};
useEffect(() =>{
getResult(id);
}, []);

if (!result) {
return null;
}

const getPicker = async () => {
axios.get('http://ccafb55a4607.ngrok.io/bookdetail/'+id +'/getstate', {
"headers": {
"content-type": "application/json",
"Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
}
})
.then(function(response){
console.log('Pickerr'+response.data.book_state)
setSelectedValue(response.data.book_state)
})
.catch(function(error){
console.log(error)
})
};
getPicker();

const PostPicker = async (value) => {
if (value != "") {
const payload = {
"book_state": value,
}
const back = JSON.stringify(payload);
axios.post('http://ccafb55a4607.ngrok.io/bookdetail/' +id, back, {
"headers": {
"content-type": "application/json",
"Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
}
})
.then(async function (response) {
console.log(response.data)
getPicker();
})
.catch(function (error) {
console.log(error);


});
}
}


const getRate = async()=>{
axios.get('http://ccafb55a4607.ngrok.io/api/bookrating/'+id, {
"headers": {
"content-type": "application/json",
"Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
}
})
.then(function(response){
console.log('response data : ', response.data)
console.log(response.message)
console.log('$$$$'+response.data.data)
setratenum(response.data.data)
console.log(response.data.code+'NEMIAD')

})

.catch( async function (error) {
console.log(error);
console.log(error.code+'ERROR CODE')


});
}
getRate();

console.log('**' +rate)

const postRate = async(rate)=>{
if(rate!=""){
const payload={
"rate": rate,
}
const back= JSON.stringify(payload);
axios.post('http://ccafb55a4607.ngrok.io/api/bookrating/'+id ,back,{
"headers":{"content-type":"application/json",
"Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
}
})
.then(async function(response){
console.log(response.data)
console.log('\n'+'++++++++'+'\n')
setratenum(rate);
console.log('&&'+rate);
if(response.data.message==="You rated this book already!!"){
console.log('TOYE PUTTTTT')
axios.put('http://ccafb55a4607.ngrok.io/api/bookrating/'+id, back, {
"headers": {
"content-type": "application/json",
"Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
}
})
.then(async function (response) {
console.log(response.data)
getRate()
})
.catch(function (error) {
console.log(error)})}

// getRate();
})
.catch(function (error) {
console.log(error);

});
}
}
const getQuote=async ()=>{
     console.log('DOVOM')
     console.log('id**************' +id);
     console.log(id) 

     try{
     setIDD(await (await AsyncStorage.getItem('id')).toString())
     const response = await axiosinst.get('api/quotes/'+id)
     console.log(IDD+'IDDresponse');
       console.log(response.data)      
      setinformation(information=>(response.data))
      console.log('GET QUOTE TRY')
     }
   catch(err){
      console.log(err);
      console.log('GET QUOTE CATCH')
   }
   console.log('AKHAR GET QUOTE')
  }
getQuote(); 

const getComments = async () => {
    console.log('GET COMMENTS')
   try{
   const response = await axiosinst.get("bookdetail/"+id+'/comment')
    console.log(response.data)
   setcinformation(response.data)
   console.log(cinformation[0])
   console.log('GET COMMENT TRY')
   console.log(' COMMENT MESSAGE '+response.data.message)
   if(response.data.message==='No Comment!'){
       <Text>نظری در مورد این کتاب ثبت نشده!
           شما اولین نفر باشید
       </Text>
   }
   }
 catch(err){
    console.log(err);
    console.log('GET COMMENT catch')
    
  
 }
 console.log('AKHAR GET COMMENT')
}
getComments(); 

return(
<Container>
<ScrollView>
<Header style={{backgroundColor:'#1F7A8C' ,marginTop:hp('20%')}}/>
<Body style={{}}>
<Image source={{uri : result.imgurl}} style={{marginTop:hp('-15%'), height:220 ,
width:160 , borderRadius:10 }} />


<Text style={{marginTop:hp('1.5%') , fontWeight:'bold',
fontSize:27 }}>{result.title}</Text>

<Text style={{marginTop:hp('0.5%') , fontSize:17 , color:'#1F7A8C'}}>{result.author}</Text>
<Text style={{marginTop:hp('1%')}}>امتیاز کتاب {result.average_rating}</Text>
{/* <Star score ={result.average_rating} style={{}}/> */}

<Text style={{marginTop:hp('0.5%') , marginBottom:hp('1%')}}>به این کتاب امتیاز دهید</Text>
<AirbnbRating style={{marginTop:hp('5%') , borderColor:'#f1c40f'}}
count={5}
showRating={false}
defaultRating={ratenum}
onFinishRating={(rating) => postRate(rating)}
size={25}
/>

<DropDownPicker
items={[
{label: 'اضافه کنید', value: 'none'},
{label: 'میخواهم بخوانم', value: 'ToRead'},
{label: 'در حال خواندن', value: 'Reading'},
{label: 'قبلا خوانده ام', value: 'Read'},
]}
defaultValue={selectedValue}
containerStyle={{height: 40 , width:220}}
style={{backgroundColor: '#fafafa' , marginTop:hp('1%') , marginBottom:hp('-1%')}}
itemStyle={{
justifyContent: 'flex-start'
}}
dropDownStyle={{backgroundColor: '#fafafa'}}
onChangeItem={(item) => PostPicker(item.value)}

/>


<Text style={{fontWeight:'bold' , fontSize:20 , marginTop:hp('2%') ,marginRight:wp('70%') , marginBottom:hp('0.7%')}}>
درباره کتاب :</Text>
<Content style={{}}>
<Card style={{}}>

<Text style={{marginTop:hp('2%') , marginLeft:wp('2%') ,
textAlign:'left' , alignSelf:'stretch' }}>{result.description}</Text>
</Card>
</Content>
</Body>
<Animated.View style={{
                    }}>
                    
                    {information.message==='No Quote!'?<FlatList
                    style={{marginBottom:'17%'}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    onEndReached={console.log('endreach')}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item)=>item.id}
                    data={information}                    
                    renderItem={({item})=>{
                      return(
                        <View>
                        (<><QuoteCard  name={item.account.username} 
                          date={item.sendtime.toString().split('T')[0]}  IDD={IDD}quoteid={item.id} id={item.account.id} height={hp('42.5%')} picture={`http://1a063c3b068b.ngrok.io${item.account.profile_photo}`} naghlghol={item.quote_text} ></QuoteCard>
                        <Text style={styles.heartnumber}>{item.Likes}</Text>
                        </>
                        )
                        </View>
                      )
                    }}
                  >
                  </FlatList>:null}
                </Animated.View>

                <Animated.View style={{ }}>

                   {cinformation.message==='No Comment!'? <FlatList
                    style={{marginBottom:'17%'}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    onEndReached={console.log('endreach')}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item)=>item.id}
                    data={cinformation}                    
                    renderItem={({ item }) => ( 
                    <CommentCard name={item.account.username} date={item.sendtime.toString().split('T')[0]}  IDD={IDD} quoteid={item.id} id={item.account.id} height={hp('42.5%')} picture={`http://1a063c3b068b.ngrok.io${item.account.profile_photo}`} naghlghol={item.quote_text}/>
                    )}
                    ></FlatList>:null}
                    
               
                </Animated.View>

{/* <Button style={{marginTop:hp('1%') , marginBottom:hp('1%') , backgroundColor:'#1F7A8C' ,
                      width:200 , marginLeft:wp('20%') , borderRadius:15}}
onPress={()=>{prop.navigation.navigate('comment',{title:result.title,imgurl:result.imgurl,id:id})&& prop.navigation.setOptions({
title: response.data.title,
});}}><Text>صفحه نظرات</Text></Button> */}

{/* <Button style={{marginLeft:wp('20%') , backgroundColor:'#1F7A8C' , 
                            width:200 , borderRadius:15}}
onPress={()=>{prop.navigation.navigate('quote',{title:result.title,imgurl:result.imgurl,id:prop.route.params.id})&& prop.navigation.setOptions({
title: response.data.title,
});}}><Text>صفحه نقل قول ها</Text></Button> */}
</ScrollView>
<StatusBar backgroundColor='#BFDBF7' style='light' />
</Container>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
}
});

export default Bookview;