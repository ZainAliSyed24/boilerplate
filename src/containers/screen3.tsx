import React, {ReactElement} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface ScreenProps {}

const screen3: React.FC<ScreenProps> = props => {
  return (
    <View style={styles.Container}>
      <Text style={styles.StyledText}>Screen 3</Text>
    </View>
  );
};

export default screen3;

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
