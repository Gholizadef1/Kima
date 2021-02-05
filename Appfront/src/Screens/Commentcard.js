import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Alert, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, CardItem, Card } from 'native-base';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



const Commentcard = (prop) => {
  
  console.log('COMMENT CARD')
  const bookid=prop.bookid;
  const [like, setlike] = useState('lightblue')
  const [dislike, setdislike] = useState('#F2A4A3')
  const[likeshode,setlikeshode]=useState(false);
  const [kamshodde, setkamshodde] = useState();
  const [kamshodde2, setkamshodde2] = useState();
  const [comment4,setcomment4]=useState();
  const [linenumber,setlinenumber]=useState();
// const[commentID,setcommentID]=useState();
//  setcommentID(prop.commentid)
// const getlike=async()=>{
//   await setTimeout(() => {  console.log("World!"); }, 800);
//   const back2 = {

//   }
//     const backk2 = JSON.stringify(back2);
//     console.log((await AsyncStorage.getItem('token')).toString())
    
//       axiosinst.get('comment/' + prop.commentid + '/like', {
//         "headers":
//         {
//           "Content-Type": "application/json",
//           "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
//         }
//       })
//         .then(async function (response) {
//           // setnumlike(response.data.LikeCount)
//           if (response.data.message === 'True')
//           await setlike('#1f7a8c')
//         else
//           await setlike('lightblue')
//           console.log(response);

//         })
//         .catch(function (error) {
//           console.log(error);
//           console.log('like error ||||||||||||')

//         })
// }


// const getdislike=async()=>{
//   // await   setTimeout(() => {  console.log("World!"); }, 500);
//   const back2 = {

//   }
//     const backk2 = JSON.stringify(back2);
//     console.log((await AsyncStorage.getItem('token')).toString())
    
//       axiosinst.get('comment/' + prop.commentid + '/dislike', {
//         "headers":
//         {
//           "Content-Type": "application/json",
//           "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
//         }
//       })
//         .then(async function (response) {
//             console.log(response)
//           // setnumlike(response.data.LikeCount)
//           if (response.data.message === 'True')
//          await  setdislike('#E64846')
//         else
//          await setdislike('#F2A4A3')
//           // console.log(response);

//         })
//         .catch(function (error) {
//           console.log(error);
//           console.log('dislike error ||||||||||||')

//         })
// }

  //  async function getdislike(){
  //   const back2 = {}
  //   const backk2 = JSON.stringify(back2);
  //   axiosinst.get('comment/' + prop.commentid + '/dislike', backk2, {
  //     "headers":
  //     {
  //       "Content-Type": "application/json",
  //       "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
  //     }
  //   })
  //     .then(async function (response) {

  //       console.log(response);
  //       if (response.data === 'True')
  //         setdislike('#1f7a8c')
  //       else
  //         setdislike('lightblue')

  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       console.log('like error ||||||||||||')

  //     })
  // }
  // async function getlike() {
  //   const back2 = {}
  //   const backk2 = JSON.stringify(back2);
  //   axiosinst.get('comment/' + prop.commentid + '/like', backk2, {
  //     "headers":
  //     {
  //       "Content-Type": "application/json",
  //       "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
  //     }
  //   })
  //     .then(async function (response) {

  //       console.log(response);
  //       if (response.data === 'True')
  //         setlike('#1f7a8c')
  //       else
  //         setlike('lightblue')

  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       console.log('like error ||||||||||||')

  //     })
  // }
  // getlike();
  // getdislike();
  useFocusEffect(
    React.useCallback(() => {
      var commentt = `${prop.comment}`.toString();
      var linenumberr = (commentt.split('').length)
      console.log(linenumberr+" prop discription")
      var commenttt = `${prop.comment}`.toString().split('');
      var comment42 = '';
  
    if (linenumberr > 100) {
      for (let i = 0; i < 100; i++)
        comment42 += commenttt[i]
      // console.log(comment4+'  COMMENT4 FOR')
    }
    else {
      console.log("in jaaa;slkfd;alskjdf")
      comment42 = prop.comment
  
    }
    setlinenumber(linenumberr)
    setcomment4(comment42)
      if(prop.isliked)
      setlike('#1f7a8c')
      if(prop.isdisliked)
      setdislike('#E64846')
      if(prop.fromcommentactivity!=true){
      if(prop.picture.toString().split(":")[0]==="http"){
        setphotoo(prop.picture)
      }
      else{
        setphotoo("http://e7ae29f4056b.ngrok.io"+prop.picture)
      }
    }
    else
    {
      setphotoo(prop.picture)
    }
      //  getdislike()
      //  getlike(prop.commentid)
    }, [])
    // [likeshode]

  )
  // useEffect(()=>{
  //   // getdislike()
  //   getlike(prop.commentid)
  // }, [])
  const [more, setmore] = useState(false);
  const [showmore, setshowmore] = useState('بیشتر...');
  const [numlike, setnumlike] = useState(prop.likenumber);
  const [numdislike, setnumdislike] = useState(prop.dislikenumber);
  const [photoo,setphotoo]=useState();
  // console.log((prop.comment.toString().split('\n').lenght===1))
  // const commentt = `${prop.comment}`.toString();
  // const linenumber = (commentt.split('\n').length)
  // const commenttt = `${prop.comment}`.toString().split('\n');
  // let comment4 = '';
  // if (linenumber > 5) {
  //   for (let i = 0; i < 4; i++)
  //     comment4 += commenttt[i] + '\n'
  //   comment4 += commenttt[4]
  // }
  // else {
  //   comment4 = prop.comment
  // }

//   React.usallback(() => {
//         getdislike()
//          getlike()
   
//   }, [])

  //  useEffect(()=>{
   
  //   if(prop.groupphoto.toString().split(":")[0]==="http"){
  //     setphotoo(prop.groupphoto)
  //   }
  //   else{
  //     setphotoo("http://e7ae29f4056b.ngrok.io"+prop.groupphoto)
  //   }
  // }, [])
  // console.log('commentcard')
  return (
    <View style={styles.container}>
       {prop.IDD.toString() === prop.accountid.toString() ? <AntDesign name="delete"
          size={hp('2.2%')} style={{ position: 'absolute', marginTop: hp('4%'), right: wp('5%') }}
          onPress={async () => {
            await Alert.alert(
              'از حذف این نظر اطمینان دارید؟',

              '',
              [
                {
                  text: 'انصراف',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'default'
                },
                {
                  text: 'حذف', onPress: async () => {
                    // console.log(prop.lastinfo);
                    // prop.INFO(prop.quoteid)
                    // console.log(prop.INFO)
                    // console.log(prop.lastinfo);
                    axiosinst.delete("book/"+bookid+'/comment/' + prop.commentid , {
                      "headers":
                      {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
                      }
                    })
                      .then(async function (response) {
                        // console.log(response);
                        // prop.INFO(prop.quoteid);
                        if(prop.kdelet===false)
                         await(prop.DELETE(true))
                         else
                         await(prop.DELETE(false))

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
     
        <TouchableOpacity style={styles.avatar}
          onPress={() => { }}>
       
       {photoo === 'http://e7ae29f4056b.ngrok.io/media/default.png' ? <ImageBackground borderRadius={prop.pictureborder}

            source={require('../../assets/avatar.png')}
            
           // style={prop.avatar}
            style={{
            height: prop.picutrehieght,
            width: prop.picturewidth,
            //borderRadius: 100,
            position: 'absolute'}}

          >

          </ImageBackground> : <ImageBackground borderRadius={prop.pictureborder}

            source={{ uri: photoo }}
           // style={prop.avatar}
           style={{
            height: prop.picutrehieght,
            width: prop.picturewidth,
            //borderRadius: 100,
            position: 'absolute'}}
          >

            </ImageBackground>}
        </TouchableOpacity>
        <Text style={styles.username}>{prop.name} </Text>
        <Text style={styles.date}>{prop.date}</Text>
      </View>
      <View style={{ 
        marginTop:prop.commentmargintop,
        marginRight: '5%',
        marginLeft: '5%',}}>

        {!more ? <Text>{comment4}</Text> : <Text>{prop.comment}</Text>}
      </View>
      <View style={{ flexDirection: 'row' }}>
      {/* like */}
        <AntDesign onPress={async () => {
          if(prop.likedisable!=true){
          if(likeshode===true)
          await setlikeshode(false)
          else
          await setlikeshode(true)
          if (dislike === '#E64846') {
            console.log('DISLIKEDOROSTHAZFMISHE')
            const back2 = {}
            const backk2 = JSON.stringify(back2);
            setdislike('#F2A4A3')
            // axiosinst.post('comment/' + prop.commentid + '/dislike', backk2, {
            //   "headers":
            //   {
            //     "Content-Type": "application/json",
            //     "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            //   }
            // })
            //   .then(async function (response) {
            //     setnumdislike(response.data.DislikeCount)
            //     // console.log(response);
            //     setdislike('#F2A4A3')

            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //     console.log('like error ||||||||||||')

            //   })
          }
          //  console.log(item.account.id)
          // setSelectedIndex(item.id)
          // if (like === 'lightblue')
          
          // else
          //   setlike('lightblue')

          // console.log((await AsyncStorage.getItem('token')).toString());
          // alert(prop.quoteid)
          console.log((await AsyncStorage.getItem('token')).toString())
          console.log(prop.commentid + 'PROP QUOTE ID');
          // // console.log(item.account.id);
          const back = {

          }
          const backk = JSON.stringify(back);
          if(like==="lightblue"){
          axiosinst.post("book/"+bookid+'/comment/' + prop.commentid , backk, {
            params:{
              feedback:"like"
            },
            "headers":
            {
              "Content-Type": "application/json",
              "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
          })
            .then(async function (response) {
              if(prop.selectt==="like"){
                await(prop.DELETE(true))
              }
              setnumlike(response.data.LikeCount)
             // if(like==='lightblue')
             setlike('#1f7a8c')
              // else
               //setlike('lightblue')
              setnumdislike(response.data.DislikeCount)
              // console.log(response);

            })
            .catch(function (error) {
              console.log(error);
              console.log('like error ||||||||||||')

            })
          }
          else{
            axiosinst.delete("book/"+bookid+'/comment/' + prop.commentid , {
            params:{
              feedback:"like"
            },
            "headers":
            {
              "Content-Type": "application/json",
              "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
          })
            .then(async function (response) {
              if(prop.selectt==="like"){
                await(prop.DELETE(true))
              }
              setnumlike(response.data.LikeCount)
              //if(like==='lightblue')
              //setlike('#1f7a8c')
              //else
              setlike('lightblue')
              setnumdislike(response.data.DislikeCount)
              // console.log(response);

            })
            .catch(function (error) {
              console.log(error);
              console.log('like error ||||||||||||')

            })
          }
          //  getlike(item);


          //  response();
          }
        }} name="like1" size={20} color={like} style={styles.like} />

        <Text style={styles.likenumber}>{numlike}</Text>




        <AntDesign onPress={async () => {
          if(prop.likedisable!=true){
          const back2 = {

          }
          if (like === '#1f7a8c') {
            console.log('DARE LIKE RO AVAZ MIKONE BEKHATER DISLIKE')
            const backk2 = JSON.stringify(back2);
            setlike('lightblue')
            // axiosinst.post('comment/' + prop.commentid + '/like', backk2, {
            //   "headers":
            //   {
            //     "Content-Type": "application/json",
            //     "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            //   }
            // })
            //   .then(async function (response) {
            //     console.log('MIKHAD LIKE RO BARAYE DISLIKE BARDARE')
            //     setnumlike(response.data.LikeCount)
            //     // console.log(response);
            //     setlike('lightblue')

            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //     console.log('like error ||||||||||||')

            //   })
          }
          //  console.log(item.account.id)
          // setSelectedIndex(item.id)
          // if (dislike === 'lightblue')
            // setdislike('#1f7a8c')
          // else
          //   setdislike('lightblue')

          // console.log((await AsyncStorage.getItem('token')).toString());
          // alert(prop.quoteid)
          console.log((await AsyncStorage.getItem('token')).toString())
          console.log(prop.commentid + 'PROP QUOTE ID');
          // // console.log(item.account.id);
          const back = {

          }
          const backk = JSON.stringify(back);
          if(dislike==="#F2A4A3"){
          axiosinst.post("book/"+bookid+'/comment/' + prop.commentid , backk, {
            params:{
              feedback:"dislike"
            },
            "headers":
            {
              "Content-Type": "application/json",
              "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
          })
            .then(async function (response) {
              if(prop.selectt==="like"){
                await(prop.DELETE(true))
              }
              setnumdislike(response.data.DislikeCount)
              //if(dislike==='#F2A4A3')
              setdislike('#E64846')
              //else
              //setdislike('#F2A4A3')
              setnumlike(response.data.LikeCount)
              // console.log(response);

            })
            .catch(function (error) {
              console.log(error);
              console.log('dislike error ||||||||||||')

            })
          }
          else{
            axiosinst.delete("book/"+bookid+'/comment/' + prop.commentid , {
            params:{
              feedback:"dislike"
            },
            "headers":
            {
              "Content-Type": "application/json",
              "Authorization": "Token " + (await AsyncStorage.getItem('token')).toString()
            }
          })
            .then(async function (response) {
              if(prop.selectt==="like"){
                await(prop.DELETE(true))
              }
              setnumdislike(response.data.DislikeCount)
             // if(dislike==='#F2A4A3')
              //setdislike('#E64846')
              // else
               setdislike('#F2A4A3')
              setnumlike(response.data.LikeCount)
              // console.log(response);

            })
            .catch(function (error) {
              console.log(error);
              console.log('dislike error ||||||||||||')

            })
          }
          //  getlike(item);


          //  response();
          }
        }} name="dislike1" size={20} color={dislike} style={styles.dislike} />
        <Text style={styles.dislikenumber}>{numdislike}</Text>
        {`${prop.comment}`.toString().split('').length >= 100 ? <TouchableOpacity
          onPress={async() => {
            if(likeshode===true)
            await setlikeshode(false)
            else
            await setlikeshode(true)
            if (more === false) {
              setmore(true)
              setshowmore('کم تر')

            }
            else {
              setmore(false)
              setshowmore('بیشتر...')
            }
          }}
          style={{ marginLeft: '60%', marginTop: '6%' }}
        ><Text style={{ color: '#1f7a8c' }}>{showmore}</Text>
        </TouchableOpacity> : null}

      </View>
      <Image
        source={require('../../assets/line2.png')}
        style={{ width: 1000, height: 1 }}
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
  avatar: {
    height: 65,
    width: 65,
    borderRadius: 100,
    position: 'absolute'

  },
  avatarname: {
    marginTop: '5%',
    marginLeft: '5%',
    flexDirection: 'row',

    width: '50%',
    height: 65,
    borderRadius: 100
  },
  username: {
    position: 'absolute',
    marginTop: '5%',
    marginLeft: wp("20%"),
    fontSize: 15,
    fontWeight: 'bold'


  },
  comment: {


   // marginTop: 20,
  //  marginTop:prop.commentmargintop,
    marginRight: '5%',
    marginLeft: '5%',
  },
  like: {
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '5%',

  },
  dislike: {
    marginTop: '6.5%',
    marginLeft: '8%'

  },
  date: {
    position: 'absolute',
    marginTop: '17%',
    marginLeft: wp("20%"),
    fontSize: 12,
    color: 'gray'
  },
  likenumber: {
    fontSize: 12,
    marginLeft: 45,
    marginTop: '6%',
    position: 'absolute',
    color: 'gray'

  },
  dislikenumber: {
    fontSize: 12,
    marginLeft: 97,
    marginTop: '6%',
    position: 'absolute',
    color: 'gray'


  },
});
export default Commentcard;

