import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';
import MainPage from './src/main-page.js'

class LoadPage extends Component {
    render() {
        return (
            <View style={styles.main}>
                <View style={styles.upperLine}/>
                <MainPage style={styles.content}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    upperLine: {
        backgroundColor: 'powderblue',
        height: 22
    },
    content: {
        backgroundColor: 'steelblue',
        flex: 1
    }
})

AppRegistry.registerComponent('AwesomeProject', () => LoadPage);