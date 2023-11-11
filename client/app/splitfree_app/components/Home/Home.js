import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props.navigation, 'navigation');

    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
  },
});
const mapStateToProps = state => {
  return {
    theme: state.appTheme.theme,
  };
};
const mapDispatchToProps = dispatch => ({
  changeTheme: data => dispatch(changeTheme(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
