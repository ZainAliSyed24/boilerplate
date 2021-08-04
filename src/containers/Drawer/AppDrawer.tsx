import React, {ReactElement} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {navigate, toggleDrawer, push} from '../../services/NavigationService';
import {ButtonView} from '../../reuseableComponents';
import {closeDrawer} from '../../services/NavigationService';
import {Colors, Metrics, Fonts} from '../../theme';

const drawerRoutes = [
  {
    title: 'Home',
    route: 'Screen1',
  },
  {
    title: 'Privacy Policy',
    route: 'Screen2',
  },
  {
    title: 'Terms & Conditions',
    route: 'screen3',
  },
  {
    title: 'Contact Us',
    route: 'screen4',
  },
];

export default function AppDrawer(): ReactElement {
  // const onPress = (item, setLogin) => ev => {
  //   closeDrawer();
  //   if (item.title === 'Logout') {
  //     setLogin(false);
  //     setTimeout(() => {
  //       setLogin(false);
  //       store.dispatch(logout());
  //     }, 800);
  //   } else {
  //     navigate(item.route, {screen: 'Dashboard'});
  //   }
  // };

  // return (
  // <LoginContext.Consumer>
  {
    /* {({isLogin, setLogin}) => { */
  }
  return (
    <View style={styles.container}>
      <View style={styles.closeWrapper}>
        {/* <ButtonView
                style={{padding: Metrics.baseMargin}}
                onPress={toggleDrawer}>
                <Image source={IcClose} style={styles.closeImg} />
              </ButtonView> */}
      </View>
      <View>
        <FlatList
          data={drawerRoutes}
          renderItem={({item}) => (
            <ButtonView
              style={styles.itemContainer}
              onPress={() => {
                push(item.route);
                closeDrawer();
              }}>
              <Text style={styles.DrawerItemText}>{item.title}</Text>
            </ButtonView>
          )}
          // contentContainerStyle={{paddingVertical: 15}}
          keyExtractor={item => item.route}
        />
      </View>

      <ButtonView style={styles.itemContainer} onPress={() => {}}>
        <Text style={styles.DrawerItemText}>Logout</Text>
      </ButtonView>
    </View>
  );
  //       }}
  //     </LoginContext.Consumer>
  //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeWrapper: {
    marginTop: Metrics.xDoubleBaseMargin * (Metrics.screenHeight > 800 ? 2 : 1),
  },
  closeImg: {
    height: 12,
    width: 12,
    backgroundColor: Colors.primary.themeLight,
  },
  itemContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
    borderColor: Colors.primary.themeLight,
    width: Metrics.widthRatio(230),
  },
  DrawerItemText: {
    // ({
    //   fontFamily: Fonts.FontFamily.play,
    //   type: Fonts.Type.Regular,
    //   size: Fonts.Size.xxxxLarge,
    // }),
    color: Colors.primary.black,
  },
  logoutContainer: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
