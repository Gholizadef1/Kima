
import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import axios from 'axios';
import Bookview from './Bookview'
import axiosinst from '../api/axiosinst';

const Home = ({navigation}) => { 

    const [image,setImage] = useState([])

    useEffect(() =>{
        getImageFromAPI()
    },[])

    function getImageFromAPI(){

        axiosinst.get('http://207a659c5de9.ngrok.io/bookdetail')
        .then(function(response){
            setImage(response.data)
            console.log(response)
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
        <View>
            <View backgroundColor='#1F7A8C'>
            <Container>
        <Header style={{backgroundColor:'#1F7A8C',marginTop:35}}>
          <Left/>
          <Body>
            <Title style={{fontSize:22 , fontWeight:'bold',color:'#E1E5F2' , marginRight: 40, marginLeft: 10 
            , left: 255,top:2}}>کیما</Title>

          </Body>
          <Right />
        </Header>
      </Container>
            </View>

             <ScrollView>
                 <View style={{padding: 50 , marginRight: 50}}>
                 </View>
                 <View>
                 <Text style={{fontSize: 20 , fontWeight:'bold' , color:'#1F7A8C',
                 marginTop:30,marginRight:20,fontWeight:'bold',marginBottom:10}}>کتاب های پیشنهادی</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}

                    horizontal={true}
                    data={image}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical: 15 , paddingLeft: 8}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Showbookview' , {id: item.id})}>
                                    <Card>
                                    <CardItem cardBody>
                                    <Image source={{uri : item.imgurl}} style={{width: 120,
                                      height: 180 , borderRadius:20}}/>
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
        </View>
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
    userGreet: {
        fontSize: 38 ,
        fontWeight: 'bold' ,
        color: 'white'
    },
    userText: {
        fontSize: 16 ,
        fontWeight: 'normal' ,
        color: 'white'
    },
    ImageOverlay: {
        width: 150 ,
        height: 250 ,
        marginRight: 6,
        borderRadius: 10,
        position:'absolute',
        backgroundColor: '#000' ,
        opacity: 0.2
    },
    ImageText: {
        position:'absolute',
        color:'#1F7A8C' ,
        marginTop:5 ,
        fontWeight: 'bold',
        right:20,
        left: 20,
        bottom: 10
    },
    frame : {
        color: '#1F7A8C'
    }
  });
  export default Home;












































































