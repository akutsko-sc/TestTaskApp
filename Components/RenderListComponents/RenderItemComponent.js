import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const RenderItemComponent = ({item, onClickItem}) => {
    const {title, summary, media_group: mediaGroup, type: {value: itemType}} = item;

    const findImageSourceForItem = (media_group) => {
        for(let i = 0; i < media_group.length; i++){
            const mediaItem = media_group[i].media_item;
            for(let j = 0; j < mediaItem.length; j++){
                if(mediaItem[j].key === 'image_base'){
                    return mediaItem[j].src;
                }
            }
        }

        return null;
    }
    let imageSrc = findImageSourceForItem(mediaGroup);

    return (
        <TouchableOpacity style={styles.listItemContainer} onPress={() => onClickItem(item, itemType)}>
            <View style={styles.descriptionListItemContainer}>
                <Text style={styles.listItemTitle}>{title}</Text>
                <Text style={styles.listItemSummary}>{summary}</Text>
            </View>
            {imageSrc ?
                <View style={styles.listItemImageWrapper}>
                    <Image
                        style={{position: 'absolute', width: '100%', height: '100%'}}
                        source={{
                            uri: imageSrc,
                        }}
                    />

                    {itemType === 'video' ? <Icon style={{position: 'absolute'}} name="play-circle-outline" size={40} color="#fff" /> : null}
                </View>
                : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexWrap: 'wrap'
    },
    listItemImageWrapper: {
        width: 45,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        overflow: 'hidden'
    },
    descriptionListItemContainer: {
        flex: 1,
        marginRight: 10,
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    listItemSummary: {
        fontSize: 14,
        textAlign: 'right'
    }
});

export {RenderItemComponent}
