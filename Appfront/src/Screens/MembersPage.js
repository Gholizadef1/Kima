import React, { useState, useEffect, useDebugValue } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList } from 'react-native';
import axiosinst from '../api/axiosinst';

const MembersPage = (prop) => {

    const [members , setmembers] = useState();
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
    </View>
    );
}

export default MembersPage;