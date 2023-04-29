import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//Custom Imports
import { HomeScreenNavigationProp, ExploreJourneyRouteProp } from '../../navigation/types';

type Props = {
    navigation: HomeScreenNavigationProp;
    route: ExploreJourneyRouteProp;
}

const ExploreJourney = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text>index</Text>
        </View>
    )
}

export default ExploreJourney;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})