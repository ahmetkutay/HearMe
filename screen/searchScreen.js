import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import User from '../components/User';
import * as firebase from 'firebase';

const renderItem = ({ item }) => (
    <Card>
        <Text style={styles.cardTitleStyle}>
            Nick: {item.Username}
        </Text>
        <Text style={styles.cardTitleStyle}>
            Story: {item.Story}
        </Text>
        <Text style={styles.cardTitleStyle}>
            Like: {item.Like}
        </Text>
    </Card>
);

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        firebase.database().ref('Stories/').on('value', (snapshot) => {
            var li = []
            snapshot.forEach((child) => {
                if (child.val().Username == User.Username)
                    return;
                li.push({
                    Story: child.val().Story,
                    Username: child.val().Username,
                    Like: child.val().Like,
                    Id: child.val().StoryId
                })
            })
            this.setState({ list: li })
        })
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
                            data={this.state.list}
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
