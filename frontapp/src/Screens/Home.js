import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from 'react-navigation-stack';
import axios from 'axios';
import axiosinst from '../api/axiosinst';


const Home = (navigation) => { 

    const [image,setImage] = useState([])

    useEffect(() =>{
        getImageFromAPI()
    },[])

    function getImageFromAPI(){
        axiosinst.get(`http://668ae353e791.ngrok.io/bookdetail`)
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
        <Header style>
          <Left/>
          <Body>
            <Title>Kima</Title>
          </Body>
          <Right />
        </Header>
      </Container>
            </View>

             <ScrollView>
                 <View style={{padding: 40}}>
                 </View>
                 <View>
                 <Text style={{fontSize: 22 , fontWeight:'bold' , color:'#1F7A8C'}}>Random books</Text>
                    <FlatList
                    horizontal={true}
                    data={image}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical: 15 , paddingLeft: 8}}>
                                <TouchableOpacity>
                                    <Card>
                                    <CardItem cardBody>
                                    <Image source={{uri : item.imgurl}} style={{width: 150,
                                    marginRight: 14 , height: 170 , borderRadius:10 }}/>
                                    </CardItem>
                                    </Card>
                                    <Text></Text>
                                    <View></View>
                                    
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