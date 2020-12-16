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
import BottomSheet from 'reanimated-bottom-sheet';
import { useFocusEffect } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import Animated, { set } from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios'
import Commentcard from './CommentCard';

const Bookview = (prop) => {

  const [rate , setrate] = useState(true);
  const [test , settest] = useState(null);
  const [ratenum , setratenum] = useState(null);
  const [result , setResult] = useState('');
  const [refresh,setrefresh]=useState(false);
  const [information,setinformation]=useState([]);
  const [cinformation,setcinformation]=useState([]);
  const [selectedValue, setSelectedValue] = useState('none');
  const[loading ,setloading]=useState(false);
  const[IDD,setIDD]=useState('');
  const equal=async(item)=>{
    setIDD(await AsyncStorage.getItem('id').toString());
  }  
  const response=async ()=>{
    const getResult = async (id) => {
      const response = await axiosinst.get('/bookdetail/'+id);
      setResult(response.data);
      console.log('checkk'+ response.data)
      };
      useEffect(() =>{
        getResult(id);
      }, []);
    
      if (!result) {
        return null;
      }
    }
    setloading(true);
    console.log('DOVOM')
     const id=prop.route.params.id
     console.log('id**************' +id);
     console.log(id) 
     try{
    setIDD(await (await AsyncStorage.getItem('id')).toString())
     const response = await axiosinst.get('api/quotes/'+id
    )
     console.log(IDD+'IDDresponse');
       console.log(response.data)
      
      setinformation(information=>(response.data))
      setloading(false);
     }
   catch(err){
    
      console.log(err);
   }

   const getComments = async () => {
    try{
    const response = await axiosinst.get("bookdetail/"+id+'/comment')
     console.log(response.data)
    setrefresh(false)
    setcinformation(response.data)
    console.log(cinformation[0])
    }
  catch(err){
    setrefresh(false)
     console.log(err);
   
  }
}   



  const getPicker = async () => {
    axios.get('http://d6c2c14e372f.ngrok.io/bookdetail/'+id +'/getstate', {
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
          axios.post('http://d6c2c14e372f.ngrok.io/bookdetail/' +id, back, {
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
    axios.get('http://d6c2c14e372f.ngrok.io/api/bookrating/'+id, {
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
  })
  .catch(function(error){
      console.log(error)
  })
  }
  getRate();

  console.log('**' +rate)

  const postRate = async(rate)=>{
    if(rate!=""){
    const payload={
        "rate": rate,
    }
    const back= JSON.stringify(payload);
    axios.post('http://d6c2c14e372f.ngrok.io/api/bookrating/'+id ,back,{
      "headers":{"content-type":"application/json",
      "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
              }
              })
    .then(async function(response){
      console.log(response.data)
      console.log('\n'+'++++++++'+'\n')
      setratenum(rate);
      console.log('&&'+rate);
      getRate();
    })
    .catch(function (error) {
       console.log(error);
    });
  }
}
//this.state = {}
  
    return(
      <Container>
            <Header style={{backgroundColor:'#1F7A8C' ,marginTop:hp('20%')}}/>
            <Body style={{}}>
                  <Image source={{uri : result.imgurl}} style={{marginTop:hp('-15%'), height:220 ,
                     width:160 , borderRadius:10 }} />

                  <Text style={{marginTop:hp('1.5%') , fontWeight:'bold',
                      fontSize:25 }}>{result.title}</Text>

                  <Text style={{marginTop:hp('0.5%')}}>{result.author}</Text>

                  <Text style={{marginTop:hp('0.5%')}}>به این کتاب امتیاز دهید</Text>
                  <AirbnbRating style={{marginTop:hp('4%')}}
                  count={5}
                  showRating={false}
                  defaultRating={ratenum}
                  ratingBackgroundColor='red'
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
 
                    <Content style={{}}>
                  <Text style={{fontWeight:'bold' , fontSize:20 , marginTop:hp('2%') ,marginRight:wp('70%') , marginBottom:hp('0.7%')}}>
                    درباره کتاب :</Text>
                 
                    <Card style={{}}>
                    
                 
                    <Text style={{marginTop:hp('2%') , marginLeft:wp('2%') , 
                      textAlign:'left' , alignSelf:'stretch' }}>{result.description}</Text>
                    </Card>
                <Animated.View style={{
                    }}>
                    <FlatList
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
                  </FlatList>
                </Animated.View>

                <Animated.View style={{
                    }}>
                    <FlatList
                    style={{marginBottom:'17%'}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    onEndReached={console.log('endreach')}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item)=>item.id}
                    data={cinformation}                    
                    renderItem={({item})=>{
                      return(
                        <View>
                        (<><CommentCard  name={item.account.username} 
                          date={item.sendtime.toString().split('T')[0]}  IDD={IDD}quoteid={item.id} id={item.account.id} height={hp('42.5%')} picture={`http://1a063c3b068b.ngrok.io${item.account.profile_photo}`} naghlghol={item.quote_text} ></CommentCard>
                        <Text style={styles.heartnumber}>{item.Likes}</Text>
                        </>
                        )
                        </View>
                      )
                    }}
                  >
                  </FlatList>
                </Animated.View>

                {/* <View>
                <BottomSheet style={{position:''}}
                  snapPoints={['40%', 0, 0]}
                ref={bs}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                enabledContentTapInteraction={false}
                onCloseEnd={()=>{
                  setshowbutton(true)
                  response()
                  
                  }}
                backgroundColor={'#edf2f4'}
                />
                </View> */}
                </Content>
            </Body>
            <StatusBar backgroundColor='#BFDBF7' style='light' />
      </Container>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heartnumber:{   
      position:'absolute',
      marginTop:hp('47.6%'),
        left:wp('85%'),  
        fontSize:hp('1.5%'),
        color:'gray'
    }
});


  export default Bookview;