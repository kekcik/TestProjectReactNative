import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    ListView,
    TouchableHighlight,
    Animated
} from 'react-native';
import Greeting from './greeting.js'
import Blink from './blink.js'
import store from './store.js'
import VideiCell from './video-cell.js'
import getMoviesFromApi from './api-manager.js'

var pageCount = 0

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            currentPage: 1,
            text: 'Muse',
            dataSource: ds.cloneWithRows([]),
            dataSourcePage: ds.cloneWithRows([]),
            bounceValue: new Animated.Value(0)
        };

        this.showPage = function (page) {
            page = page.rowData
            var abc = store.getState()
            console.log(page)
            console.log(abc.slice((page - 1) * 10, (page) * 10))
            this.setState({
                currentPage: page,
                dataSource: ds.cloneWithRows(abc.slice((page - 1) * 10, (page) * 10))
            })
        }

        this.updateList = function (text) {
            if (text != undefined) {
                this.setState({text})
                return
            }
            this.showPage(1)
            getMoviesFromApi(this.state.text)
            console.log("update with", text)
        }

        this._onPressButton = function (text) {
            console.log(text);
        }

        store.subscribe(() => {
            var abc = store.getState()
            var count = []
            for (var i = 0; i < abc.length; i += 10) {
                count.push(i / 10 + 1)
            }
            this.setState({
                currentPage: 1,
                dataSourcePage: ds.cloneWithRows(count),
                dataSource: ds.cloneWithRows(abc.slice(0, 10))
            })
        })
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.upperLine}>
                    <TextInput
                        style={styles.search}
                        onChangeText=
                        {(text) => { this.updateList(text) }}
                        value={this.state.text}
                        maxLength={40}/>

                    <TouchableHighlight onPress= {() => {this.updateList()}}>
                        <Text style={styles.submit}>Button</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.listView}>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow=
                        {(rowData) => <VideiCell video={rowData}></VideiCell>}/>
                </View>
                <View style={styles.navigationBar}>
                    <ListView
                        enableEmptySections={true}
                        horizontal={true}
                        style={{
                        flex: 1
                    }}
                        dataSource={this.state.dataSourcePage}
                        renderRow={(rowData) => <TouchableHighlight onPress= { () => { this.showPage({rowData}) }}>
                        <View
                            style={rowData == this.state.currentPage
                            ? styles.navigationBarItemSelect
                            : styles.navigationBarItem}>
                            <Text >
                                {rowData}
                            </Text>
                            <Text>
                                ({rowData * 10 - 9}
                                - {(rowData * 10 + 1) > store.getState().length
                                    ? store.getState().length
                                    : (rowData * 10 + 1)})
                            </Text>
                        </View>
                    </TouchableHighlight>}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    upperLine: {
        height: 48,
        flexDirection: 'row'
    },
    listView: {
        flex: 1
    },
    navigationBar: {
        fontSize: 20,
        height: 48,
        alignSelf: "center",
        backgroundColor: 'powderblue'
    },
    navigationBarItem: {
        backgroundColor: 'powderblue',
        margin: 4,
        height: 40
    },
    navigationBarItemSelect: {
        backgroundColor: 'steelblue',
        margin: 4,
        height: 40
    },
    search: {
        padding: 8,
        borderRadius: 3,
        margin: 4,
        flex: 3,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    submit: {
        textAlign: 'center',
        margin: 4,
        flex: 1,
        width: 100,
        height: 40,
        backgroundColor: 'skyblue'
    }
})
