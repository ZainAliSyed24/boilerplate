import React, {ReactElement} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ScreenProps {}

const Screen2: React.FC<ScreenProps> = props => {
  return (
    <View style={styles.Container}>
      <Text style={styles.StyledText}>Screen 2</Text>
    </View>
  );
};

export default Screen2;

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
