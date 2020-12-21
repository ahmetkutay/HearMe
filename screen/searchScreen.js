import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class SearchScreen extends React.Component {
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ height: StatusBar.currentHeight }} />
                    <SearchBar
                        style={styles.searchStyle}
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    searchStyle: {
        flex: 1,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15,
    }
});