import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props.navigation, 'navigation');

    return (
      <View style={styles.container}>
        <Text>Friends</Text>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
