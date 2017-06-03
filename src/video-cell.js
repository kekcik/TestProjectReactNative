import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import {createStore} from 'redux'

export default class VideiCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        }
    }

    render() {
        return (
            <TouchableHighlight
                style={styles.submit}
                onPress={() => {
                this.setState({
                    status: !this.state.status
                })
            }}>
                <View style={styles.main}>
                    <Image
                        style={styles.img}
                        source={{
                        uri: this.props.video.artworkUrl100
                    }}/>
                    <View
                        style={this.state.status
                        ? styles.noImgWithPanel
                        : styles.noImg}>
                        <Text>{this.props.video.trackName}</Text>
                        <Text style={styles.artist}>{this.props.video.artistName}</Text>
                    </View>
                    <ScrollView
                        style={this.state.status
                        ? styles.addPanel
                        : styles.addPanelClose}>
                        <Text>{JSON.stringify(this.props.video)}</Text>
                    </ScrollView>
                </View>
            </TouchableHighlight>
        );
    }
}

var styles = StyleSheet.create({
    artist: {
        fontSize: 18
    },
    main: {
        margin: 8,
        marginTop: 10,
        height: 70,
        flexDirection: 'row'
    },
    img: {
        height: 60,
        width: 100,
        flex: 1
    },
    noImg: {
        flex: 3,
        margin: 8
    },
    noImgWithPanel: {
        flex: 1,
        margin: 8
    },
    addPanel: {
        margin: -8,
        flex: 2,
        backgroundColor: 'yellow'
    },
    addPanelClose: {
        margin: -8,
        height: 0,
        flex: 0,
        backgroundColor: 'yellow'
    }
})