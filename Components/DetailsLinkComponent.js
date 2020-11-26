import React, {useState} from 'react';
import { WebView } from 'react-native-webview';
import {
    ActivityIndicator,
} from 'react-native';

const DetailsLink = (props) => {
    const [visibleIndicator, setVisibleIndicator] = useState(true);
    const {route: {params}} = props;
    const {source: {href}} = params;

    return (
        <>
            <WebView
                style={{ flex: 1 }}
                useWebKit={true}
                javaScriptEnabled={true}
                originWhitelist={['*']}
                source={{ uri: href }}
                onHttpError={(syntheticEvent) => {
                    setVisibleIndicator(false);
                    const { nativeEvent } = syntheticEvent;
                    console.log(
                        'WebView received error status code: ',
                        nativeEvent.statusCode,
                    );
                }}
                onLoadEnd={() => setVisibleIndicator(false)}
            />

            {visibleIndicator && (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center' }}
                    color={'#999999'}
                />
            )}
        </>
    )
}

export {DetailsLink}
