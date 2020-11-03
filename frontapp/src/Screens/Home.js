import React , {useState} from 'react';
import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
TouchableOpacity , FlatList , TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Container } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const Home = (props) => {

    const image = { uri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdccFt7gPEal9yTqTapS4P17TMFSVq9SYhKA&usqp=CAU"
    };

    const [gallery , setgallery] = useState([]);

    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const imageee = res.data;
        this.setState(() =>({...gallery,
            imageee
        }) );
      })
      .catch(function (error) {
        console.log(error);
      });

    return(
    
        
        <Container>
     
        {/* <ul>
        { this.state.gallery.map(person => <li>{gallery.name}</li>)}
       </ul> */}
        <View style>
        
            <View>
                <ImageBackground
                source={image}
                style={{width:'100%' , height:270}}
                imageStyle={{borderBottomRightRadius:50}} 
                >
                    <View style={styles.DarkOverlay}></View>
                    <View style={styles.searchContainer}>
                        <Text style={styles.userGreet}>Welcome to KIMA</Text>
                        <Text style={styles.userText}> What do you want to read today?</Text>
                    </View>
                   
                    <Feather name='menu' size={22} color='#fff' style style={
                            {position:'absolute' , top: 40 ,left: 16 }} />
                    <Feather name='bell' size={22} color='#fff' style style={
                            {position:'absolute' , top: 40 , right: 30 }} />
                </ImageBackground> 
            </View>

             <ScrollView>
                 <View style={{padding: 12}}>
                     <Text style={{fontSize: 22 , fontWeight:'bold'}}>Random books</Text>
                 </View>
                 <View>
                    <FlatList
                    horizontal={true}
                    data={gallery}
                    renderItem= {({item}) =>{
                        return(
                            <View style={{paddingVertical: 5 , paddingLeft: 12}}>
                                <TouchableOpacity>
                                    <Image source={item.image} style={{width: 150,
                                    marginRight: 14 , height: 170 , borderRadius:10 }}/>
                                    <View style={styles.ImageOverlay}></View>
                                    <Text style={styles.ImageText}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    } 
                }
                    />
                 </View>
             </ScrollView>
                    
            

        </View>
        {/* <StatusBar backgroundColor='white' style='dark' /> */}
      
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
    searchContainer:{
        paddingTop: 100,
        paddingLeft: 16 
    },
    DarkOverlay: {
        position: 'absolute' ,
        top: 0 ,
        right: 0 ,
        left: 0 ,
        height: 270 ,
        backgroundColor: '#000' ,
        opacity: 0.2 ,
        borderBottomRightRadius: 65
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
    searchBox: {
        marginTop: 16 ,
        backgroundColor: '#fff' ,
        paddingLeft: 24 ,
        paddingTop: 12 ,
        borderTopRightRadius: 40 ,
        borderBottomRightRadius: 40,
        width:'100%'
    },
    ImageOverlay: {
        width: 150 ,
        height: 250 ,
        marginRight: 8,
        borderRadius: 10,
        position:'absolute',
        backgroundColor: '#000' ,
        opacity: 0.2
    },
    ImageText: {
        position:'absolute',
        color:'white' ,
        marginTop:4 ,
        fontWeight: 'normal',
        left: 30,
        bottom: 10
    }
  });
  export default Home;