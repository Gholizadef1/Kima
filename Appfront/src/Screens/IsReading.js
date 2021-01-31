

import React , {useState , useEffect} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView ,
TouchableOpacity , FlatList , TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosinst from '../api/axiosinst';

const IsReading = ({navigation}) => {

    const [readimage,setreadImage] = useState([])


    useEffect(() =>{
        getreadImageFromAPI1()
        },[])


        async function getreadImageFromAPI1(){

            const id=await AsyncStorage.getItem('id');
            axiosinst.get('/user/'+id+'/collection?type=Reading',{
            
            "headers":{"content-type":"application/json",
            "Authorization":"Token "+(await AsyncStorage.getItem('token')).toString()
            }})
            .then(function(response){
            setreadImage(response.data)
            console.log(response)
            })
            .catch(function(error){
            console.log(error)
            console.log('salam:)')
            })
            }
            if(!readimage){
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
            , right:55,top:2}}>کیما</Title>
          </Body>
          <Right />
        </Header>
      </Container>
            </View>

             <ScrollView style={{marginTop:100}}>
                 <View>
                 <Text style={{fontSize: 20 , fontWeight:'bold' , color:'#1F7A8C',
                 marginTop:30,right:-10,fontWeight:'bold',marginBottom:10}}>در حال خواندن</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={readimage}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical: 15 , paddingLeft: 8}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Showbookview' , {id: item.id})}>
                                    <Card style={{backgroundColor:'#1F7A8C' , borderRadius:15 , 
                                       marginBottom:-20 ,marginLeft:5 , marginRight:10}}>
                                    <CardItem cardBody>
                                    <Image source={{uri : item.imgurl}} style={{width: 120,
                                      height: 180 , borderRadius:15}}/>
                                      <Text style={styles.ImageText}>{item.title}</Text>
                                      <Text style={styles.author}>{item.author}</Text>
                                    </CardItem>
                                    </Card>                                    
                                        
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
ImageText: {
position:'absolute',
fontSize:20,
marginRight:20,
color:'#1F7A8C' ,
top:12 ,
fontWeight: 'bold',
left: 130
},
author: {
left:10,
top:-20,
fontSize:15
},
frame : {
color: '#1F7A8C'
}
});

export default IsReading;