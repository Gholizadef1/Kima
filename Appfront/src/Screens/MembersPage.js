import React, { useState, useEffect, useDebugValue } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import { Avatar } from 'react-native-paper';

const MembersPage = (prop) => {

    const [members , setmembers] = useState();
    const [refreshmembers, setrefreshmembers] = useState(false)
    const [picture, setpicture] = useState(null);
    const [profilephoto , setprofilephoto] = useState();
    const id = prop.route.params.id;

    useEffect(() =>{
        getMembers();
      }, []);

    const getMembers = async () => { 

        const response = axiosinst.get('/api/group/members/' +id)
          .then(async function (response) {    
            setmembers(response.data.members)
            console.log('IDD' +id)
          })
          .catch( async function (error) {
            console.log(error);
            console.log(error.code+'ERROR CODE')      
        });
      } 

    return(   
            
    <View>
        <Text style={{fontSize:50 , marginTop :40}}> HI MEMBERS :)</Text>
        <FlatList
            style={{ marginBottom: hp('5%') }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
  //          console.log('-----AKHAR LIST')
            }}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id}
            refreshing={refreshmembers}
            onRefresh={async () => {
            console.log('refresh')
            }}
            data={members}
            renderItem={({ item }) => <>
              <View style={{ maginLeft: wp('5%'), marginTop: hp('2%') }}>
                {picture != 'http://2e7bd654174c.ngrok.io/media/default.png' ? <Avatar.Image style={{marginLeft:wp('2%')}} size={90}
                  source={{ uri: item.user.profile_photo }}
                ></Avatar.Image> : <Avatar.Image style={styles.avatar} size={90}
                  source={require('../../assets/group.jpg')}
                ></Avatar.Image>}
                <Text style={{ alignSelf: 'flex-start', marginLeft: wp('10%'), marginTop:hp('1%') }}>{item.user.username}</Text>
              </View>
            </>
            }
          >
          </FlatList>
    </View>
    );
}

export default MembersPage;