import React, {useEffect, useState, useImperativeHandle} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FilterInput = React.forwardRef((props, ref) => {
    const {defaultList, setListData} = props;
    const [filterText, setFilterText] = useState('');

    useImperativeHandle(ref, () => ({
        onClearText
    }));

    useEffect(() => {
        if(defaultList){
            let newFilteredList = defaultList.filter(item => item.title.toLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1);
            setListData(newFilteredList);
        }
    }, [filterText])

    const onChangeFilterText = (text) => {
        setFilterText(text);
    }

    const onClearText = () => {
        setFilterText('');
        Keyboard.dismiss();
    }

    return (
        <View style={styles.textInputWrapper}>
            {filterText ?
                <TouchableOpacity style={styles.closeBtn} onPress={onClearText}>
                    <Icon name="close-outline" size={22} color="#333" />
                </TouchableOpacity>
                :
                <View>
                    <Icon name="search-outline" size={22} color="#333" />
                </View>
            }

            <TextInput
                style={{flex: 1, paddingHorizontal: 0, paddingVertical: 5, textAlign: 'right'}}
                onChangeText={onChangeFilterText}
                value={filterText}
                placeholder={'Search'}
            />
        </View>
    )
});

const styles = StyleSheet.create({
    textInputWrapper: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        paddingRight: 5,
        marginBottom: 20,
        marginHorizontal: 15,
    },
    closeBtn: {
        width: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export {FilterInput}
