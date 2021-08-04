import React, {ReactElement} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ScreenProps {}

const Screen1: React.FC<ScreenProps> = props => {
  return (
    <View style={styles.Container}>
      <Text style={styles.StyledText}>Screen 1</Text>
    </View>
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
});
