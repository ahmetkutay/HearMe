import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d75',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d76',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d77',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d78',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d79',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d23',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d24',
        title: 'Third Item',
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d25',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d26',
        title: 'Third Item',
    },

];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const renderItem = ({ item }) => (
    <Item title={item.title} />
);

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

                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}

                        />
                    </SafeAreaView>
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
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});
