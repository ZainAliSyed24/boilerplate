import React, {ReactElement} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

// import {showMessage, hideMessage} from 'react-native-flash-message';

interface ScreenProps {}

const Screen1: React.FC<ScreenProps> = props => {
  return (
    // <View>
    //   <Button
    //     onPress={() => {
    //       /* HERE WE GONE SHOW OUR FIRST MESSAGE */
    //       showMessage({
    //         message: 'Simple message',
    //         type: 'info',
    //       });
    //     }}
    //     title="Request Details"
    //     color="#841584"
    //   />

    <View style={styles.Container}>
      <Text style={styles.StyledText}>Screen 1</Text>
    </View>
    // </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StyledText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 8,
  },
  content: {
    height: 50,
    width: '100%',
  },
});
