
import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';


const Home = ({navigation}) => { 

    const [image,setImage] = useState([])
    const [best,setbest] = useState([])
    const [mostdis,setmostdis] = useState([])
    useFocusEffect(
        React.useCallback(() => {
            getImageFromAPI()
            getbestsFromAPI()
            getmostFromAPI();
        }, [])
    
      )

    // useEffect(() =>{
    //     getImageFromAPI()
    //     getbestsFromAPI()
    //     getmostFromAPI();
    // },[])
    

    function getImageFromAPI(){
        axiosinst.get('/bookdetail')
        .then(function(response){
            setImage(response.data)
            // console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    function getbestsFromAPI(){
        axiosinst.get('/filter-book-rate')
        .then(function(response){
            setbest(response.data)
            // console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    function getmostFromAPI(){
        axiosinst.get('/filter-book-comment')
        .then(function(response){
            setmostdis(response.data)
            // console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
    }


    if(!image){
        return null
    }
    return(      
        <Container style={styles.frame}>
            <ScrollView>
            <Header style={{backgroundColor:'#1F7A8C' ,marginTop:hp('4.5%')}}/>
            <Title style={{fontSize:24 , fontWeight:'bold',color:'#E1E5F2' ,marginTop:-44 , marginLeft:10}}>کیما</Title>
             <ScrollView>
                 <View style={{padding:hp('-2%') , marginRight:wp('2%')}}>
                 </View>
                 <View>
                 <Text style={{fontSize: 23 , fontWeight:'bold' , color:'#1F7A8C',
                 marginTop:hp('5%'), marginLeft:wp('2%') ,fontWeight:'bold'}}>کتاب های پیشنهادی</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={image}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical:hp('3') , paddingLeft:wp('1.5%')}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Showbookview' , {id: item.id})}>
                                    <Card style={{backgroundColor:'#1F7A8C' , borderRadius:15}}>
                                    <CardItem cardBody>
                                    <Image source={{uri : item.imgurl}} style={{width: 120,
                                      height: 180 , borderRadius:15}}/>
                                    </CardItem>
                                    </Card>                                    
                                        <CardItem>
                                        <Text style={styles.ImageText}>{item.title}</Text>
                                        </CardItem>
                                </TouchableOpacity>
                            </View>
                        )
                    } 
                }
                    />
                 </View>
             </ScrollView>

              <ScrollView>
                 <View style={{padding:hp('-2%') , marginRight:wp('2%')}}>
                 </View>
                 <View>
                 <Text style={{fontSize: 23 , fontWeight:'bold' , color:'#1F7A8C',
                 marginTop:hp('5%'), marginLeft:wp('2%') ,fontWeight:'bold'}}>کتاب های برتر</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={best}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical:hp('3') , paddingLeft:wp('1.5%')}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Showbookview' , {id: item.id})}>
                                    <Card style={{backgroundColor:'#1F7A8C' , borderRadius:15}}>
                                    <CardItem cardBody>
                                    <Image source={{uri : item.imgurl}} style={{width: 120,
                                      height: 180 , borderRadius:15}}/>
                                    </CardItem>
                                    </Card>                                    
                                        <CardItem>
                                        <Text style={styles.ImageText}>{item.title}</Text>
                                        </CardItem>
                                </TouchableOpacity>
                            </View>
                        )
                    } 
                }
                    />
                 </View>
             </ScrollView>

             <ScrollView>
                 <View style={{padding:hp('-2%') , marginRight:wp('2%')}}>
                 </View>
                 <View>
                 <Text style={{fontSize: 23 , fontWeight:'bold' , color:'#1F7A8C',
                 marginTop:hp('5%'), marginLeft:wp('2%') ,fontWeight:'bold'}}>پربحث ترین کتاب ها</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={mostdis}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical:hp('3') , paddingLeft:wp('1.5%')}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Showbookview' , {id: item.id})}>
                                    <Card style={{backgroundColor:'#1F7A8C' , borderRadius:15}}>
                                    <CardItem cardBody>
                                    <Image source={{uri : item.imgurl}} style={{width: 120,
                                      height: 180 , borderRadius:15}}/>
                                    </CardItem>
                                    </Card>                                    
                                        <CardItem>
                                        <Text style={styles.ImageText}>{item.title}</Text>
                                        </CardItem>
                                </TouchableOpacity>
                            </View>
                        )
                    } 
                }
                    />
                 </View>
             </ScrollView>     
  

        </ScrollView>
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
    ImageText: {
        position:'absolute',
        color:'#1F7A8C' ,
        top:2 ,
        fontWeight: 'bold',
        right:20,
        left: 20,
        height:40

    
    },
    frame : {
        color: '#1F7A8C'
    }
  });
  export default Home;





                    
            
