import React, { useState, useEffect, useDebugValue } from 'react';
import { StyleSheet, Text, View, Modal, ImageBackground, Image, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axiosinst from '../api/axiosinst';
import { Avatar } from 'react-native-paper';

const DiscussionPage = (prop) => {

    const discussionid = prop.route.params.id;
    console.log(discussionid)

    return(
        <View>
            <Text style ={{fontSize:60}}>Discussion</Text>
        </View>
    )

}
export default DiscussionPage;