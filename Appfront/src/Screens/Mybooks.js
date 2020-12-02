
import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Title, CardItem, Card, Content } from 'native-base';
import { StatusBar } from 'expo-status-bar';

import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mybooks = ({navigation}) => { 

    const [redimage,setredImage] = useState([])
    const [readimage,setreadImage] = useState([])
    const [wanttoreadimage,setwanttoreadImage] = useState([])

    useEffect(() =>{
        getredImageFromAPI1()
        getreadImageFromAPI1()
        getwanttoreadImageFromAPI1()
    },[])
    const id=AsyncStorage.getItem('id');
    async function getredImageFromAPI1(){
        axiosinst.get('http://abe0e9fde816.ngrok.io/api/user-profile'+id+'/Read',{"headers":{"content-type":"application/json",
        "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
                }})
        .then(function(response){
            setImage(response.data)
            console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    async function getreadImageFromAPI1(){
        axiosinst.get('http://abe0e9fde816.ngrok.io/api/user-profile'+id+'/Reading',{"headers":{"content-type":"application/json",
        "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
                }})
        .then(function(response){
            setImage(response.data)
            console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    async function getwanttoreadImageFromAPI1(){
        axiosinst.get('http://abe0e9fde816.ngrok.io/api/user-profile'+id+'/ToRead',{"headers":{"content-type":"application/json",
        "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
                }})
        .then(function(response){
            setImage(response.data)
            console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    if(!redimage){
        return null
    }
    return(      
        <Container style={styles.frame}>
          <Content>
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
                 marginTop:5,marginRight:20,fontWeight:'bold' , marginTop:0}}>در حال خواندن</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={readimage}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical: 15 , paddingLeft: 8}}>
                                <TouchableOpacity>
                                    <Card style={{backgroundColor:'#1F7A8C' , borderRadius:15}}>
                                    <CardItem cardBody>
                                    <Image source={{uri : item.imgurl}} style={{width: 120,
                                      height: 160 , borderRadius:15}}/>
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
                 <View style={{padding: 50 , marginRight: 50}}>
                 </View>
                 <View>
                 <Text style={{fontSize: 20 , fontWeight:'bold' , color:'#1F7A8C',
                 marginTop:0,marginRight:20,fontWeight:'bold' , top:-50}}>می خواهم بخوانم</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={wanttoreadimage}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical: 15 , paddingLeft: 8 }}>
                                <TouchableOpacity>
                                    <Card style={{backgroundColor:'#1F7A8C' , borderRadius:15 , top:-20 , marginBottom:0}}>
                                    <CardItem cardBody style={{}}>
                                    <Image source={{uri : item.imgurl}} style={{width: 120,
                                      height: 160 , borderRadius:15}}/>
                                    </CardItem> 
                                    </Card>                                    
                                        <CardItem>
                                        <Text style={{}}>{item.title}</Text>
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
                 <View style={{padding: 50 , marginRight: 50}}>
                 </View>
                 <View>
                 <Text style={{fontSize: 20 , fontWeight:'bold' , color:'#1F7A8C',
                 marginTop:5,marginRight:20,fontWeight:'bold' , marginTop:0}}>قبلا خوانده ام</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={redimage}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical: 15 , paddingLeft: 8}}>
                                <TouchableOpacity>
                                    <Card style={{backgroundColor:'#1F7A8C' , borderRadius:15}}>
                                    <CardItem cardBody>
                                    <Image source={{uri : item.imgurl}} style={{width: 120,
                                      height: 160 , borderRadius:15}}/>
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
        </Content>
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
        left: 20
    },
    frame : {
        color: '#1F7A8C'
    }
  });
  export default Mybooks;





                    
            
