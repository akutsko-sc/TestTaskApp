import React, {useEffect, useRef} from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailsVideo = (props) => {
    const {videoSource, setVideoSource} = props;
    const videoPlayerRef = useRef();

    if(Platform.OS === 'ios'){
        useEffect(() => {
            if(videoSource){
                videoPlayerRef.current.presentFullscreenPlayer();
            }
        }, [videoSource])
    }

    const dismissFullScreen = () => setVideoSource(null);

    if(videoSource){
        if(Platform.OS === 'ios'){
            return (
                <Video
                    fullscreenOrientation={'landscape'}
                    fullscreenAutorotate={false}
                    onFullscreenPlayerWillDismiss={dismissFullScreen}
                    ref={videoPlayerRef}
                    source={{uri: videoSource.src}}
                />
            )
        } else {
            return(
                <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#000'}}>
                    <Video
                        resizeMode={'contain'}
                        ref={videoPlayerRef}
                        source={{ uri: videoSource.src }}
                        controls={true}
                        style={{
                            height: '100%',
                            width: '100%',
                        }} />
                    <TouchableOpacity style={{
                        position: 'absolute',
                        width: 40,
                        height: 40,
                        right: 0,
                        top: 30
                    }} onPress={dismissFullScreen}>
                        <Icon name="close-outline" size={40} color="#fff" />
                    </TouchableOpacity>
                </View>
            )
        }
    } else {
        return null;
    }
}

export {DetailsVideo}
