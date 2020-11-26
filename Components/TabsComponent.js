import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const TabComponent = (props) => {
    const {activeTab, tabType, onPressHandler} = props;
    const label = tabType === 'video' ? 'VIDEO' : 'LINK';

    return (
        <TouchableOpacity style={[styles.tab, activeTab === tabType ? styles.activeTab : {}]} onPress={onPressHandler}>
            <Text style={[styles.tabText, activeTab === tabType ? styles.activeTabText : {}]}>{label}</Text>
        </TouchableOpacity>
    )
}

const TabsComponent = (props) => {
    const {changeTabHelper} = props;
    const [activeTab, setActiveTab] = useState('video');

    useEffect(() => {
        changeTabHelper(activeTab);
    }, [activeTab]);

    const onChangeTab = (newActiveTab) => {
        if(newActiveTab !== activeTab) {
            setActiveTab(newActiveTab);
        }
    }

    const onClickVideoTab = () => onChangeTab('video');
    const onClickLinkTab = () => onChangeTab('link');

    return (
        <View style={styles.tabsWrapper}>
            <View style={styles.tabsContainer}>
                <TabComponent
                    activeTab={activeTab}
                    tabType={'video'}
                    onPressHandler={onClickVideoTab}
                />
                <TabComponent
                    activeTab={activeTab}
                    tabType={'link'}
                    onPressHandler={onClickLinkTab}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabsWrapper: {
        alignItems: 'center',
    },

    tabsContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#333',
        width: 300,
        marginVertical: 20,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    tabText: {
        color: '#000'
    },
    activeTab: {
        backgroundColor: '#333',
    },
    activeTabText: {
        color: '#fff'
    },
    inActiveTabText: {
        color: '#000'
    },
});

export {TabsComponent}
