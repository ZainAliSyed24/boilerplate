import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {MaterialTextField} from '../reuseableComponents';
interface ScreenProps {}

const Screen1: React.FC<ScreenProps> = props => {
  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.Container}>
        {/* <MaterialTextField label="name"  /> */}
        <View>
          <Text style={styles.StyledText}>Screen 1</Text>
        </View>
      </View>
    </>
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
