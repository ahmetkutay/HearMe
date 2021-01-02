import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import User from '../components/User';
import * as firebase from 'firebase';

const renderItem = ({ item }) => {
    return (
        <Card>
            <Text style={styles.cardTitleStyle}>
                Nick: {item.Username}
            </Text>
            <Text style={styles.cardTitleStyle}>
                Story: {item.Story}
            </Text>
            <Text style={styles.cardTitleStyle}>
                Likes: {item.Like}
            </Text>
            <TouchableOpacity disabled={item.disabled == undefined ? false : true} onPress={() => {
                item.disabled = true;
                var isliked = false;
                firebase.database().ref('Users/' + User.Id + '/UserLikes/').on('value', (snapshot) => {
                    snapshot.forEach((child) => {
                        if (child.val().Id == item.Id) {
                            isliked = true;
                        }
                    })
                })

                if (!isliked) {
                    firebase.database().ref('Stories/' + item.Id).update({ Like: item.Like + 1 })
                    firebase.database().ref('Users/' + User.Id + '/UserLikes/' + item.Id).set({ Id: item.Id });
                }
            }
            }><Text>Like Story</Text></TouchableOpacity>
        </Card>
    )
};

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            list2: []
        }
    }
    LikeStory(id, like) {
        firebase.database().ref('Stories/' + id).set({ Like: like + 1 })
        firebase.database().ref('Users/' + User.Id + '/UserLikes/' + id).set({ Id: id });
    }
    componentDidMount() {
        firebase.database().ref('Users/' + User.Id + '/UserLikes/').on('value', (snapshot) => {
            var li = []
            snapshot.forEach((child) => {
                li.push({
                    Id: child.val().Id
                })

            })
            var li2 = [];
            this.setState({ list: li }, () => {
                firebase.database().ref('Stories/').on('value', (snapshot) => {
                    snapshot.forEach((child) => {
                        if (!(this.state.list.some(elem => {
                            return JSON.stringify({ Id: child.val().StoryId }) === JSON.stringify(elem);
                        }))) {
                            li2.push({
                                Story: child.val().Story,
                                Username: child.val().Username,
                                Like: child.val().Like,
                                Id: child.val().StoryId,
                                UId: child.val().UserId
                            })
                        }
                    })
                    this.setState({ list2: li2 })
                })
            })
        });
    }


    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ height: StatusBar.currentHeight }} />
                </ScrollView>

                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={this.state.list2}
                            renderItem={renderItem}
                            keyExtractor={item => item.Id}

                        />
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    cardTitleStyle: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'justify'

    },
    searchStyle: {
        flex: 1,
        borderRadius: 15,
    },
    container: {
        flex: 1,
    },

});
