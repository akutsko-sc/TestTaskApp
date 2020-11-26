import React from 'react';
import {
    FlatList,
    Text,
    View,
} from 'react-native';
import {RenderItemComponent} from './RenderItemComponent';

const RenderListComponent = (props) => {
    const {listData, onClickItem} = props;

    const renderItem = ({item}) => <RenderItemComponent item={item} onClickItem={onClickItem} />;
    const keyExtractor = (item) => item.id;

    if(listData && listData.length > 0){
        return (
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        )
    } else {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Empty list</Text>
            </View>
        )
    }
}

export {RenderListComponent}
