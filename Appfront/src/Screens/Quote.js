import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Quotecrad from './Quotecard';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const Quote = (prop) => {
    const bs = React.createRef()
    const fall=new Animated.Value(1);
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
  });
  export default Quote;