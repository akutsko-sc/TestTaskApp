import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    BackHandler,
    Platform,
    SafeAreaView
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {RenderListComponent} from './RenderListComponents/RenderListComponent';
import {TabsComponent} from './TabsComponent';
import {FilterInput} from './FilterInputComponent';
import {DetailsVideo} from './DetailsVideoComponent';

const VIDEO_DATA_URL = 'http://assets-production.applicaster.com/applicaster-employees/israel_team/Elad/assignment/video_json.json';
const LINK_DATA_URL = 'http://assets-production.applicaster.com/applicaster-employees/israel_team/Elad/assignment/link_json.json';

const HomeScreen = (props) => {
    const {navigation} = props;
    const [data, setData] = useState(null);
    const [listData, setListData] = useState(null);
    const [isShowActivityIndicator, setStateActivityIndicator] = useState(false);
    const [videoSource, setVideoSource] = useState(null);
    const filterInputRef = useRef();

    useEffect(() => {
        const backAction = () => {
            if(videoSource){
                setVideoSource(null);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        if(!videoSource) {
            Orientation.unlockAllOrientations();
        }

        return () => backHandler.remove();
    }, [videoSource]);

    useLayoutEffect(() => {
        if (Platform.OS === 'android') {
            navigation.setOptions({headerShown: !videoSource});
        }
    }, [videoSource]);

    const fetchData = (url) => {
        return new Promise((resolve, reject) => {
            setStateActivityIndicator(true);

            fetch(url)
                .then((response) => resolve(response.json()))
                .catch((err) => reject(err))
        })
    }

    const changeTabHelper = (activeTab) => {
        filterInputRef.current.onClearText();
        const urlForFetch = activeTab === 'video' ? VIDEO_DATA_URL : LINK_DATA_URL;

        fetchData(urlForFetch)
            .then((data) => {
                setData(data);
                setListData(data.entry);
            }, (err) => {
                console.log(err);
            })
            .then(() => setStateActivityIndicator(false))
    }

    const onClickItem = (item, itemType) => {
        if(itemType === 'video'){
            setVideoSource(item.content);
            Orientation.lockToLandscapeLeft();
        } else {
            navigation.navigate('DetailsLink', {
                source: item.link,
            })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.controlContainer}>
                <TabsComponent
                    changeTabHelper={changeTabHelper}
                />

                <FilterInput
                    ref={filterInputRef}
                    defaultList={data && data.entry}
                    setListData={setListData}
                />
            </View>

            {(isShowActivityIndicator) ?
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        color={'#999999'}
                    />
                </View>
                :
                <RenderListComponent
                    listData={listData}
                    onClickItem={onClickItem}
                />
            }

            <DetailsVideo videoSource={videoSource} setVideoSource={setVideoSource} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    controlContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export {HomeScreen}
