
import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';

const Home = ({navigation}) => { 

    const [image,setImage] = useState([])

    useEffect(() =>{
        getImageFromAPI()
    },[])

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
    if(!image){
        return null
    }
    return(      
        <Container style={styles.frame}>
            <ScrollView>
            <Header style={{backgroundColor:'#1F7A8C' ,marginTop:hp('7%')}}/>
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





                    
            
