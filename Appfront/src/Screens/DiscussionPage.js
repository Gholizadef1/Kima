import React, { useState, useEffect, useDebugValue } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList , TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const DiscussionPage = (prop) => {

    const discussionid = prop.route.params.id;
    console.log(discussionid)

    return(
        <View>
            <Text style ={{fontSize:60}}>Discussion</Text>
            <TextInput
            multiline
            style={styles.input}
            placeholder='send your message '
            
            />
            <MaterialIcons name="send" size={40} color="black" style={{marginTop:320 , marginRight:310}} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex:1 ,
        backgroundColor: '#fff' ,
        alignItems :'center' ,
        justifyContent: 'center'
    },
    input: {
        borderWidth:1 ,
        borderColor: '#777' ,
        padding: 13,
        marginTop:hp('71')
    }
})
export default DiscussionPage;