import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  MaterialTextField,
  FormHandler,
  AppButton,
} from '../reuseableComponents';

interface ScreenProps {}

const Screen1: React.FC<ScreenProps> = props => {
  const formHandler = useRef<any>(null);

  useEffect(() => {}, []);

  const submit = () => {
    const payload = formHandler.current.onSubmitForm();
    console.log(payload);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Content}>
        <FormHandler ref={formHandler}>
          <MaterialTextField label="Name" identifier="name" type={'text'} />
          <MaterialTextField label="Date" identifier={'date'} type={'date'} />
          <MaterialTextField
            label="Country"
            type={'dropdown'}
            identifier={'country'}
            selected={1}
            options={[
              {id: 1, title: 'PAK'},
              {id: 2, title: 'IND'},
              {id: 3, title: 'BAN'},
            ]}
          />
        </FormHandler>
      </View>
      <AppButton item={{title: 'Submit'}} onPress={submit} />
      {/* <View>
          <Text style={styles.StyledText}>Screen 1</Text>
        </View> */}
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'orange',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Content: {
    // flex: 1,
    backgroundColor: 'white',
    width: '90%',
    alignContent: 'center',
    // justifyContent: 'center',
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
