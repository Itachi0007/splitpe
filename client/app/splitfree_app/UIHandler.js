import React, {Component} from 'react';
import {StyleSheet, View, Text, Appearance, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import AppNavigator from './AppNavigator';
import {changeTheme} from './redux/ActionCreator';
class UIHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  themeChangeListener = () => {
    console.log(Appearance.getColorScheme());
    this.props.changeTheme(Appearance.getColorScheme());
  };
  componentDidMount() {
    console.log(Appearance.getColorScheme(), 'Ui Handler');
    this.remove = Appearance.addChangeListener(this.themeChangeListener);
  }
  componentWillUnmount() {
    this.remove.remove();
  }
  render() {
    // console.log(this.props.navigation, 'navigation');

    return (
      <SafeAreaView style={{height: '100%', width: '100%'}}>
        <AppNavigator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
const mapStateToProps = state => {
  return {
    theme: state.appTheme.theme,
  };
};
const mapDispatchToProps = dispatch => ({
  changeTheme: data => dispatch(changeTheme(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UIHandler);
