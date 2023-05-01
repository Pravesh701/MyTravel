import { StyleSheet, Image } from 'react-native'
import React from 'react'
import color from '../constants/color';

type Props = {
    active: string;
}

const checkedImage = require("../assets/images/Checked.webp");
const uncheckedImage = require("../assets/images/UnChecked.webp");
const Radio = ({ active }: Props) => {
    return active ? (
        <Image source={checkedImage} style={[styles.imageStyle, { tintColor: color.primary }]} />
    ) : (
        <Image source={uncheckedImage} style={styles.imageStyle} />
    );
};

export default Radio

const styles = StyleSheet.create({
    imageStyle: {
        height: 25,
        width: 25
    }
})