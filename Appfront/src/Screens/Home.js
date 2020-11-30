
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
        axiosinst.get('http://c1c76a73bf1c.ngrok.io/bookdetail')
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






































// import React , {useState} from 'react';
// import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
// TouchableOpacity , FlatList , TextInput} from 'react-native';
// import {Feather} from '@expo/vector-icons';
// import { Container } from 'native-base';
// import { StatusBar } from 'expo-status-bar';
// import { createStackNavigator } from 'react-navigation-stack';
// import axios from 'axios';

// // const [Books,SetBooks]=useState([]);


// const Home = (props) => {

//     const image = { uri:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdccFt7gPEal9yTqTapS4P17TMFSVq9SYhKA&usqp=CAU"
//     };

//     // const [gallery , setgallery] = useState([]);

//     const [gallery , setgallery] = useState([

//         {image : {uri:
//             'https://m.media-amazon.com/images/I/41VYw5zI7kL.jpg'}, title: 'book1' , key: '1'
//         },
//         {image : {uri:
//             'https://qph.fs.quoracdn.net/main-qimg-9b4267c07c73a0c6099650d9fd3e9933'},title: 'book2' , key: '2'
//         },
//         {image :{uri:
//             'https://miro.medium.com/max/1486/1*fS70iIas8jKGK0lCLpKr9g.jpeg'} ,title: 'book3' , key: '3'
//         },
//         {image : {uri:
//             'https://www.theartworksinc.com/wp-content/uploads/2016/12/ls307-800x1185.jpg'} ,title: 'book4' , key: '4'
//         }

// ]);

//     // axios.get(`https://jsonplaceholder.typicode.com/users`)
//     //   .then(res => {
//     //     const imageee = res.data;
//     //     this.setState(() =>({...gallery,
//     //         imageee
//     //     }) );
//     //   })
//     //   .catch(function (error) {
//     //     console.log(error);
//     //   });

//     return(
    
        
//         <Container>
     
//         {/* <ul>
//         { this.state.gallery.map(person => <li>{gallery.name}</li>)}
//        </ul> */}
//         <View style>
        
//             <View>
//                 <ImageBackground
//                 source={image}
//                 style={{width:'100%' , height:270}}
//                 imageStyle={{borderBottomRightRadius:50}} 
//                 >
//                     <View style={styles.DarkOverlay}></View>
//                     <View style={styles.searchContainer}>
//                         <Text style={styles.userGreet}>Welcome to KIMA</Text>
//                         <Text style={styles.userText}> What do you want to read today?</Text>
//                     </View>
                   
//                     <Feather name='menu' size={22} color='#fff' style style={
//                             {position:'absolute' , top: 40 ,left: 16 }} />
//                     <Feather name='bell' size={22} color='#fff' style style={
//                             {position:'absolute' , top: 40 , right: 30 }} />
//                 </ImageBackground> 
//             </View>

//              <ScrollView>
//                  <View style={{padding: 12}}>
//                      <Text style={{fontSize: 22 , fontWeight:'bold'}}>Random books</Text>
//                  </View>
//                  <View>
//                     <FlatList
//                     horizontal={true}
//                     data={gallery}
//                     renderItem= {({item}) =>{
//                         return(
//                             <View style={{paddingVertical: 5 , paddingLeft: 5}}>
//                                 <TouchableOpacity>
//                                     <Image source={item.image} style={{width: 120,
//                                     marginRight: 14 , height: 180 , borderRadius:10 }}/>
//                                     <View style={styles.ImageOverlay}></View>
//                                     <Text style={styles.ImageText}>{item.title}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         )
//                     } 
//                 }
//                     />
//                  </View>
//              </ScrollView>
                    
            

//         </View>
//         {/ <StatusBar backgroundColor='white' style='dark' /> /}
      
//         </Container>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     searchContainer:{
//         paddingTop: 100,
//         paddingLeft: 16 
//     },
//     DarkOverlay: {
//         position: 'absolute' ,
//         top: 0 ,
//         right: 0 ,
//         left: 0 ,
//         height: 270 ,
//         backgroundColor: '#000' ,
//         opacity: 0.2 ,
//         borderBottomRightRadius: 65
//     },
//     userGreet: {
//         fontSize: 38 ,
//         fontWeight: 'bold' ,
//         color: 'white'
//     },
//     userText: {
//         fontSize: 16 ,
//         fontWeight: 'normal' ,
//         color: 'white'
//     },
//     searchBox: {
//         marginTop: 16 ,
//         backgroundColor: '#fff' ,
//         paddingLeft: 24 ,
//         paddingTop: 12 ,
//         borderTopRightRadius: 40 ,
//         borderBottomRightRadius: 40,
//         width:'100%'
//     },
//     ImageOverlay: {
//         width: 150 ,
//         height: 250 ,
//         marginRight: 8,
//         borderRadius: 10,
//         position:'absolute',
//         backgroundColor: '#000' ,
//         opacity: 0.2
//     },
//     ImageText: {
//         position:'absolute',
//         color:'white' ,
//         marginTop:4 ,
//         fontWeight: 'normal',
//         left: 30,
//         bottom: 10
//     }
//   });
//   export default Home;













// import React , {useState , useEffect} from 'react';
// import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
// TouchableOpacity , FlatList , TextInput} from 'react-native';
// import {Feather} from '@expo/vector-icons';
// import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
// import { StatusBar } from 'expo-status-bar';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
// import axios from 'axios';
// import Bookview from './Bookview'
// import axiosinst from '../api/axiosinst';

// const Home = ({navigation}) => { 

//     const [image,setImage] = useState([])

//     useEffect(() =>{
//         getImageFromAPI()
//     },[])

//     function getImageFromAPI(){
//         axiosinst.get('http://a1c35a52c6a5.ngrok.io/bookdetail')
//         .then(function(response){
//             setImage(response.data)
//             console.log(response)
//         })
//         .catch(function(error){
//             console.log(error)
//         })
//     }
//     if(!image){
//         return null
//     }

//     //  const ShowBookview = () => {
//     //      navigation.navigate('Bookview');
//     //  }

//     return(      
//         <Container style={styles.frame}>
//         <View>
//             <View backgroundColor='#1F7A8C'>
//             <Container>
//         <Header style={{backgroundColor:'#1F7A8C',marginTop:35}}>
//           <Left/>
//           <Body>
//             <Title>Kima</Title>
//           </Body>
//           <Right />
//         </Header>
//       </Container>
//             </View>

//              <ScrollView>
//                  <View style={{padding: 40}}>
//                  </View>
//                  <View>
//                  <Text style={{fontSize: 22 , fontWeight:'bold' , color:'#1F7A8C'}}>کتاب های پیشنهادی</Text>
//                     <FlatList
//                     horizontal={true}
//                     data={image}
//                     renderItem= {({item}) =>{
//                         return(
//                             <View style={{paddingVertical: 15 , paddingLeft: 8}}>
//                                 <TouchableOpacity onPress={() => navigation.navigate('Showbookview')}>
//                                     <Card>
//                                     <CardItem cardBody>
//                                     <Image source={{uri : item.imgurl}} style={{width: 120,
//                                       height: 180 , borderRadius:10 }}/>
//                                     </CardItem>
//                                     </Card>                                    
//                                         <CardItem>
//                                         <Text style={styles.ImageText}>{item.title}</Text>
//                                         </CardItem>
//                                 </TouchableOpacity>
//                             </View>
//                         )
//                     } 
//                 }
//                     />
//                  </View>
//              </ScrollView>     
//         </View>
//         <StatusBar backgroundColor='#BFDBF7' style='light' />
//         </Container>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     userGreet: {
//         fontSize: 38 ,
//         fontWeight: 'bold' ,
//         color: 'white'
//     },
//     userText: {
//         fontSize: 16 ,
//         fontWeight: 'normal' ,
//         color: 'white'
//     },
//     ImageOverlay: {
//         width: 150 ,
//         height: 250 ,
//         marginRight: 6,
//         borderRadius: 10,
//         position:'absolute',
//         backgroundColor: '#000' ,
//         opacity: 0.2
//     },
//     ImageText: {
//         position:'absolute',
//         color:'#1F7A8C' ,
//         marginTop:5 ,
//         fontWeight: 'bold',
//         right:20,
//         left: 20,
//         bottom: 10
//     },
//     frame : {
//         color: '#1F7A8C'
//     }
//   });
//   export default Home;






































// import React , {useState} from 'react';
// import { StyleSheet, Text, View , Image , ImageBackground , ScrollView , 
// TouchableOpacity , FlatList , TextInput} from 'react-native';
// import {Feather} from '@expo/vector-icons';
// import { Container } from 'native-base';
// import { StatusBar } from 'expo-status-bar';
// import { createStackNavigator } from 'react-navigation-stack';
// import axios from 'axios';

// // const [Books,SetBooks]=useState([]);


// const Home = (props) => {

//     const image = { uri:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdccFt7gPEal9yTqTapS4P17TMFSVq9SYhKA&usqp=CAU"
//     };

//     // const [gallery , setgallery] = useState([]);

//     const [gallery , setgallery] = useState([

//         {image : {uri:
//             'https://m.media-amazon.com/images/I/41VYw5zI7kL.jpg'}, title: 'book1' , key: '1'
//         },
//         {image : {uri:
//             'https://qph.fs.quoracdn.net/main-qimg-9b4267c07c73a0c6099650d9fd3e9933'},title: 'book2' , key: '2'
//         },
//         {image :{uri:
//             'https://miro.medium.com/max/1486/1*fS70iIas8jKGK0lCLpKr9g.jpeg'} ,title: 'book3' , key: '3'
//         },
//         {image : {uri:
//             'https://www.theartworksinc.com/wp-content/uploads/2016/12/ls307-800x1185.jpg'} ,title: 'book4' , key: '4'
//         }

// ]);

//     // axios.get(`https://jsonplaceholder.typicode.com/users`)
//     //   .then(res => {
//     //     const imageee = res.data;
//     //     this.setState(() =>({...gallery,
//     //         imageee
//     //     }) );
//     //   })
//     //   .catch(function (error) {
//     //     console.log(error);
//     //   });

//     return(
    
        
//         <Container>
     
//         {/* <ul>
//         { this.state.gallery.map(person => <li>{gallery.name}</li>)}
//        </ul> */}
//         <View style>
        
//             <View>
//                 <ImageBackground
//                 source={image}
//                 style={{width:'100%' , height:270}}
//                 imageStyle={{borderBottomRightRadius:50}} 
//                 >
//                     <View style={styles.DarkOverlay}></View>
//                     <View style={styles.searchContainer}>
//                         <Text style={styles.userGreet}>Welcome to KIMA</Text>
//                         <Text style={styles.userText}> What do you want to read today?</Text>
//                     </View>
                   
//                     <Feather name='menu' size={22} color='#fff' style style={
//                             {position:'absolute' , top: 40 ,left: 16 }} />
//                     <Feather name='bell' size={22} color='#fff' style style={
//                             {position:'absolute' , top: 40 , right: 30 }} />
//                 </ImageBackground> 
//             </View>

//              <ScrollView>
//                  <View style={{padding: 12}}>
//                      <Text style={{fontSize: 22 , fontWeight:'bold'}}>Random books</Text>
//                  </View>
//                  <View>
//                     <FlatList
//                     horizontal={true}
//                     data={gallery}
//                     renderItem= {({item}) =>{
//                         return(
//                             <View style={{paddingVertical: 5 , paddingLeft: 5}}>
//                                 <TouchableOpacity>
//                                     <Image source={item.image} style={{width: 120,
//                                     marginRight: 14 , height: 180 , borderRadius:10 }}/>
//                                     <View style={styles.ImageOverlay}></View>
//                                     <Text style={styles.ImageText}>{item.title}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         )
//                     } 
//                 }
//                     />
//                  </View>
//              </ScrollView>
                    
            

//         </View>
//         {/* <StatusBar backgroundColor='white' style='dark' /> */}
      
//         </Container>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     searchContainer:{
//         paddingTop: 100,
//         paddingLeft: 16 
//     },
//     DarkOverlay: {
//         position: 'absolute' ,
//         top: 0 ,
//         right: 0 ,
//         left: 0 ,
//         height: 270 ,
//         backgroundColor: '#000' ,
//         opacity: 0.2 ,
//         borderBottomRightRadius: 65
//     },
//     userGreet: {
//         fontSize: 38 ,
//         fontWeight: 'bold' ,
//         color: 'white'
//     },
//     userText: {
//         fontSize: 16 ,
//         fontWeight: 'normal' ,
//         color: 'white'
//     },
//     searchBox: {
//         marginTop: 16 ,
//         backgroundColor: '#fff' ,
//         paddingLeft: 24 ,
//         paddingTop: 12 ,
//         borderTopRightRadius: 40 ,
//         borderBottomRightRadius: 40,
//         width:'100%'
//     },
//     ImageOverlay: {
//         width: 150 ,
//         height: 250 ,
//         marginRight: 8,
//         borderRadius: 10,
//         position:'absolute',
//         backgroundColor: '#000' ,
//         opacity: 0.2
//     },
//     ImageText: {
//         position:'absolute',
//         color:'white' ,
//         marginTop:4 ,
//         fontWeight: 'normal',
//         left: 30,
//         bottom: 10
//     }
//   });
//   export default Home;