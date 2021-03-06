import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import posed, { Transition } from 'react-native-pose';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.background,
    width: '100%',
    marginVertical: 15,
  },
  tabBarItem: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    height: 60,
    elevation: 40,
    width: 95,
  },
  tabBarItemText: {
    fontFamily: 'Raleway-SemiBold',
    marginBottom: 5,
  },
});

const Container = posed.View({
  enter: {
    scaleY: 1,
    scaleX: 1,
    transition: {
      duration: 40,
    },
  },
  exit: {
    scaleY: 0.3,
    scaleX: 0.3,
    transition: {
      duration: 40,
    },
  },
});

class TabBar extends PureComponent {
  navigationStateIndex = null;

  constructor(props) {
    super(props);
    this.renderTabBarButton = this.renderTabBarButton.bind(this);
  }

  renderTabBarButton(route, idx) {
    const {
      activeTintColor,
      inactiveTintColor,
      navigation,
      getLabelText,
      renderIcon,
    } = this.props;
    const { state: { index: currentIndex, routes } } = navigation;
    const focused = currentIndex === idx;
    const color = focused ? activeTintColor : inactiveTintColor;
    const label = getLabelText({ route, focused, index: idx });
    const { routeName } = route;
    const isStartTab = idx === 0;
    const isEndTab = idx === routes.length - 1;
    return (
      <TouchableOpacity
        key={idx}
        onPress={() => {
          navigation.navigate(routeName);
        }}
        style={{
          ...styles.tabBarItem,
          borderBottomLeftRadius: isStartTab ? 7 : 0,
          borderTopLeftRadius: isStartTab ? 7 : 0,
          borderBottomRightRadius: isEndTab ? 7 : 0,
          borderTopRightRadius: isEndTab ? 7 : 0,
        }}
      >
        <Transition
          enterPose="enter"
          exitPose="exit"
          preEnterPose="exit"
          enterAfterExit
          animateOnMount
        >
          {!focused ?
            (
              <Container
                key="active"
              >
                {renderIcon({ route, tintColor: color, focused: currentIndex === idx, index: idx })}
              </Container>
            ) : (
              <Container
                key="inactive"
                style={{ alignItems: 'center' }}
              >
                <Text key={0} style={{ ...styles.tabBarItemText, color }}>
                  {label}
                </Text>
                <Icon key={1} name="circle" size={5} solid color={color} />
              </Container>
            )}
        </Transition>

      </TouchableOpacity>
    );
  }

  render() {
    const { navigation, style } = this.props;
    const tabBarButtons = navigation.state.routes.map(this.renderTabBarButton);
    return (
      <View style={styles.tabView}>
        <View style={{ ...styles.tabBar, ...style }}>
          {tabBarButtons}
        </View>
      </View>

    );
  }
}

export default TabBar;
