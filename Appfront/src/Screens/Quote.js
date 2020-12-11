import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Quotecrad from './Quotecard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const Quote = (prop) => {
    const bs = React.createRef()
    const fall=new Animated.Value(1);
    const renderHeader=()=>{
        console.log('header')
        return(
          <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} >
            <Image
           source={require('../../assets/line3.png')}
           style={{width:100,height:4,marginLeft:155}}
           ></Image>
               <Text style={{marginLeft:'36%',fontWeight:'bold',color:'#1f7a8c',marginTop:'3%',fontSize:16 }}>نظر شما چیست؟</Text>
            </View>
          </View>
        </View>
      
       
        
          )
      }
    return(
        <View style={styles.container}>
         <BottomSheet style={{position:''}}
      
      snapPoints={['40%', 0, 0]}
     ref={bs}
     initialSnap={1}
     callbackNode={fall}
     enabledGestureInteraction={true}
     enabledContentTapInteraction={false}
    
    //  isBackDropDismisByPress={true}
    //  renderContent={renderInner}
    //  renderHeader={renderHeader}            
        // style={{position:'absolute',height:200,width:250,marginTop:400}}
     backgroundColor={'#edf2f4'}
 
 />
        <ScrollView showsVerticalScrollIndicator={false}>
           <Quotecrad height={350}></Quotecrad>
           <Quotecrad height={350}></Quotecrad>
           <Quotecrad height={350}></Quotecrad>
           <Quotecrad height={350}></Quotecrad>
          
        
      
           </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    
        flex: 1,
        // backgroundColor: '#B8B8B8',
        backgroundColor:'#ffff',
        marginTop:1
    },
    header: {
        backgroundColor: '#EDF2F4',
        shadowColor: 'black',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 20,
        shadowOpacity: 0.5,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopColor:'black',
        borderTopRightRadius: 20,
      },
      panelHeader: {
        borderTopColor:'black',
    
      },
  });
  export default Quote;