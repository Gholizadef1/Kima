import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,ImageBackground,Alert ,ScrollView} from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from 'react-native-reanimated';

const Commentcard = (prop) => {
     const[more,setmore]=useState(false);
    const[showmore,setshowmore]=useState('بیشتر...');
    // console.log((prop.comment.toString().split('\n').lenght===1))
    const commentt=`${prop.comment}`.toString();
    const linenumber=(commentt.split('\n').length)
    const commenttt=`${prop.comment}`.toString().split('\n');
    let comment4='';
    if(linenumber>5){
        for(let i=0;i<4;i++)
         comment4 += commenttt[i]+'\n'
       comment4+=commenttt[4]
    }
    else
    {
        comment4=prop.comment
    }
    
  
    
    const [like,setlike]=useState('lightblue')
    const [dislike,setdislike]=useState('lightblue')
    // console.log('commentcard')
    return(
        <View style={styles.container}>
        {/* <LinearGradient
        // Background Linear Gradient
        //'#E9E9E9','#d8d8d8'
        // '#EDF5FD','#EEF9FB','#F1F3F9','#E2E7F3','#E1E5F2'
        //'#EFF9FB','#E2E7F3'
        colors={['#F1F3F9','#e1e5f2']}
        style={{
         position:'absolute',
          height:'100%',
          width:'100%',
        
        }}
      /> */}
      {/* <Card style={{marginLeft:5,marginRight:5,shadowOpacity:1000,marginTop:5,borderRadius:10}}> */}
        {/* <ImageBackground source={require('../../assets/commentbackground.jpeg')} style={{width:'100%',height:'100%',position:'absolute'}}></ImageBackground> */}
            <View style={styles.avatarname}>
            {prop.IDD.toString() === prop.id.toString() ? <AntDesign name="delete"
          size={hp('2.2%')} style={{ position: 'absolute', marginTop: hp('1.5%'), right: wp('3%') }}
          onPress={async () => {
            await Alert.alert(
              'از حذف این نقل قول اطمینان دارید؟',
              
              '',
              [
                {
                  text: 'انصراف',
                  onPress: () => console.log('Cancel Pressed'),
                  style:'default'
                },
                {
                  text: 'حذف', onPress: async() => {
                    // console.log(prop.lastinfo);
                    // prop.INFO(prop.quoteid)
                    // console.log(prop.INFO)
                    // console.log(prop.lastinfo);
                    axiosinst.delete('api/quotes/' + prop.commentid, {
                      "headers":
                      {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                      }
                    })
                      .then(async function (response) {
                        console.log(response);
                        // prop.INFO(prop.quoteid);
                        // await(prop.DELETE(true))
                     

                      })
                      .catch(function (error) {
                        console.log(error);
                        console.log('delete error ||||||||||||')

                      })
                  }
                }
              ],
              { cancelable: false }
            );

            //  response();
          }}
          color="#e56b6f" /> : null}
            <TouchableOpacity style={styles.avatar}
              onPress={()=>{}}>
           {prop.picture==='http://7714cae02459.ngrok.io/media/default.png'?<ImageBackground borderRadius={100}
      
             source={require('../../assets/avatar.png')}
            style={styles.avatar}
      
            >

            </ImageBackground>:<ImageBackground borderRadius={100}
    
          source={{uri:prop.picture}}
            style={styles.avatar}
    
            >

    </ImageBackground>}
        </TouchableOpacity>
            <Text style={styles.username}>{prop.name} </Text>
            <Text style={styles.date}>{prop.date}</Text>
            </View>
            <View style={styles.comment}>

                {!more?<Text>{comment4}</Text>:<Text>{prop.comment}</Text>}
            </View>
            <View style={{flexDirection:'row'}}>
            <AntDesign onPress={()=>{if(like==='lightblue'){setlike('#1F7A8C')}else{setlike('lightblue')}}} name="like1" size={20} color={like} style={styles.like} />
            <Text style={styles.likenumber}>{prop.likenumber}</Text>
            <AntDesign onPress={()=>{if(dislike==='lightblue'){setdislike('#1F7A8C')}else{setdislike('lightblue')}}} name="dislike1" size={20} color={dislike} style={styles.dislike} />
            <Text style={styles.dislikenumber}>{prop.dislikenumber}</Text>
            {`${prop.comment}`.toString().split('\n').length>=5?<TouchableOpacity
            onPress={()=>{if(more===false)
            {setmore(true)
                setshowmore('کم تر')
            
            }
            else{
                setmore(false)
                setshowmore('بیشتر...')
                }}}
            style={{marginLeft:'60%',marginTop:'6%'}}
            ><Text style={{color:'#1f7a8c'}}>{showmore}</Text>
            </TouchableOpacity>:null}
            
            </View>
            <Image
         source={require('../../assets/line2.png')}
         style={{width:1000,height:1}}
         ></Image>
        {/* </Card> */}
        </View>
      
    );
}

const styles = StyleSheet.create({
    container: {
    
      backgroundColor: '#fff',
    
    
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    avatar:{
        height:65,
        width:65,
        borderRadius:100,
        position:'absolute'    
    
    },
    avatarname:{
       marginTop:'5%',
       marginLeft:'5%',
        flexDirection:'row',
      
        width:'50%',
        height:65,
        borderRadius:100
    },
    username:{
        position:'absolute',
        marginTop:'5%',
        left:80,
        fontSize:15,
        fontWeight:'bold'
        
     
    },
    comment:{
       
        
        marginTop:20,
        marginRight:'5%',
        marginLeft:'5%',
    },
    like:{
        marginLeft:'5%',
        marginTop:'5%',
        marginBottom:'5%',
       
    },
    dislike:{
       marginTop:'6.5%',
       marginLeft:'8%'
      
    },
    date:{
        position:'absolute',
        marginTop:'17%',
        left:80,
        fontSize:12,
        color:'gray'
    },
    likenumber:{
    fontSize:12,
    marginLeft:45,
    marginTop:'6%',
    position:'absolute',
    color:'gray'
     
    },
    dislikenumber:{
        fontSize:12,
        marginLeft:97,
        marginTop:'6%',
        position:'absolute',
        color:'gray'
        
         
        },
  });
  export default Commentcard;